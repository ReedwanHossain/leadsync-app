"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, CalendarIcon, MoreVertical, Search } from "lucide-react"
import "./message-list.css"

interface Message {
  _id: string
  leadName: string
  campaignName: string
  reply: string
  joinedAt: string
  createdAt: string
  updatedAt: string
}

interface MessageListProps {
  selectedCampaigns?: string[]
}

export default function MessageList({ selectedCampaigns = [] }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("")

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)

        let url = "http://localhost:4000/messages"
        if (selectedCampaigns.length === 1) {
          url += `?campaign=${encodeURIComponent(selectedCampaigns[0])}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setMessages(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch messages:", err)
        setError("Failed to load messages. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [selectedCampaigns]) 
  const filteredMessages = messages.filter((message) => {
    const matchesSearch = message.leadName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCampaign = selectedCampaigns.length > 1 ? selectedCampaigns.includes(message.campaignName) : true
    return matchesSearch && matchesCampaign
  })

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const truncateReply = (text: string, maxLength = 30) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  return (
    <div className="message-list">
      <div className="message-list-content">
        <div className="search-row">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              className="search-input"
              placeholder="Search Lead"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="period-container">
            <input
              className="period-input"
              placeholder="Select period"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            />
            <div className="calendar-icon-container">
              <CalendarIcon className="calendar-icon" />
            </div>
          </div>
          <div className="leads-count">{filteredMessages.length} Leads found</div>
        </div>

        {isLoading ? (
          <div className="loading-state">Loading messages...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <table className="messages-table">
            <thead>
              <tr>
                <th className="name-column">Name</th>
                <th className="campaign-column">Campaign name</th>
                <th className="reply-column">Reply</th>
                <th className="actions-column">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <tr key={message._id}>
                    <td className="name-column">
                      <div className="user-info">
                        <div className="user-avatar message-avatar">
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=${message.leadName.charAt(0)}`}
                            alt={message.leadName}
                            className="avatar-image"
                          />
                        </div>
                        <div className="user-details">
                          <div className="user-name">{message.leadName}</div>
                          <div className="user-joined">Joined in {formatJoinDate(message.joinedAt)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="campaign-column">
                      <div className="campaign-info">
                        <ArrowRight className="campaign-icon" />
                        <span>{message.campaignName}</span>
                      </div>
                    </td>
                    <td className="reply-column">{truncateReply(message.reply)}</td>
                    <td className="actions-column">
                      <button className="message-action-button">
                        <MoreVertical className="message-action-icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="no-results">
                    No messages found. Try adjusting your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}



