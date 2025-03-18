"use client"

import TopNavigation from "@/components/top-navigation/top-navigation"
import FilterSection from "@/components/filter-section/filter-section"
import MessageList from "@/components/message-list/message-list"
import "./main-section.css"

interface MainSectionProps {
  toggleSidebar?: () => void
  selectedCampaigns?: string[]
  onCampaignSelect?: (campaigns: string[]) => void
}

export default function MainSection({
  toggleSidebar,
  selectedCampaigns = [],
  onCampaignSelect = () => {},
}: MainSectionProps) {
  return (
    <div className="main-section">
      <TopNavigation toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <FilterSection selectedCampaigns={selectedCampaigns} onCampaignSelect={onCampaignSelect} />
        <MessageList selectedCampaigns={selectedCampaigns} />
      </div>
    </div>
  )
}

