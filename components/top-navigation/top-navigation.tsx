"use client"

import { Bell, Menu } from "lucide-react"
import "./top-navigation.css"

interface TopNavigationProps {
  toggleSidebar?: () => void
}

export default function TopNavigation({ toggleSidebar }: TopNavigationProps) {
  return (
    <div className="top-navigation">
      <div className="top-navigation-left">
        {toggleSidebar && (
          <button className="menu-button" onClick={toggleSidebar} aria-label="Toggle menu">
            <Menu className="menu-icon" />
          </button>
        )}
        <h1 className="page-title">All Replies</h1>
      </div>
      <div className="user-actions">
        <button className="notification-button">
          <Bell className="notification-icon" />
        </button>
        <div className="user-avatar">
          <img src="/placeholder.svg?height=32&width=32" alt="User" className="avatar-image" />
        </div>
      </div>
    </div>
  )
}

