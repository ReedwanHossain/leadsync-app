"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar/sidebar"
import MainSection from "@/components/main-section/main-section"
import "./inbox-page.css"

export default function InboxPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const handleCampaignSelect = (campaigns: string[]) => {
    setSelectedCampaigns(campaigns)
  }

  return (
    <div className="inbox-container">
      <div className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`} onClick={closeSidebar}></div>
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <MainSection
        toggleSidebar={toggleSidebar}
        selectedCampaigns={selectedCampaigns}
        onCampaignSelect={handleCampaignSelect}
      />
    </div>
  )
}

