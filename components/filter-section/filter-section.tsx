"use client"

import { useState, useEffect } from "react"
import { Filter, Search, ChevronDown, ChevronRight, ArrowRight, ChevronUp } from "lucide-react"
import "./filter-section.css"

interface FilterSectionProps {
  selectedCampaigns?: string[]
  onCampaignSelect?: (campaigns: string[]) => void
}

export default function FilterSection({ selectedCampaigns = [], onCampaignSelect = () => {} }: FilterSectionProps) {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [campaigns, setCampaigns] = useState<string[]>(["Grow Connection", "Real Estate", "Campaign Growth"])
  const [localSelectedCampaigns, setLocalSelectedCampaigns] = useState<string[]>(selectedCampaigns)

  useEffect(() => {
    setLocalSelectedCampaigns(selectedCampaigns)
  }, [selectedCampaigns])

  const toggleCampaign = (campaign: string) => {
    let newSelected: string[]

    if (localSelectedCampaigns.includes(campaign)) {
      newSelected = localSelectedCampaigns.filter((c) => c !== campaign)
    } else {
      newSelected = [...localSelectedCampaigns, campaign]
    }

    setLocalSelectedCampaigns(newSelected)
    onCampaignSelect(newSelected)
  }

  const toggleFilterSection = () => {
    setIsFilterExpanded(!isFilterExpanded)
  }

  const clearAllCampaigns = () => {
    setLocalSelectedCampaigns([])
    onCampaignSelect([])
  }

  return (
    <div className="filter-section">
      <div className="filter-mobile-header">
        <div className="filter-label">
          <Filter className="filter-icon" />
          <span>Filter</span>
        </div>
        <button className="filter-toggle-button" onClick={toggleFilterSection}>
          {isFilterExpanded ? (
            <ChevronUp className="filter-toggle-icon" />
          ) : (
            <ChevronDown className="filter-toggle-icon" />
          )}
        </button>
      </div>

      <div className={`filter-content ${isFilterExpanded ? "expanded" : ""}`}>
        <div className="filter-controls">
          <div className="filter-label">
            <Filter className="filter-icon" />
            <span>Filter</span>
          </div>
          <button className="clear-button" onClick={clearAllCampaigns}>
            Clear all
          </button>
        </div>

        <div className="filter-options">
          <div className="filter-group">
            <div className="filter-group-header">
              <h3 className="filter-group-title">Activity Types</h3>
              <div className="filter-group-actions">
                <span className="badge">3</span>
                <button className="clear-link">Clear all</button>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-group-header">
              <h3 className="filter-group-title">Select Campaign</h3>
              <div className="filter-group-actions">
                <span className="badge">{localSelectedCampaigns.length}</span>
                <ChevronDown className="dropdown-icon" />
              </div>
            </div>
            <div className="campaign-selector">
              <div className="campaign-search">
                <Search className="campaign-search-icon" />
                <input className="campaign-search-input" placeholder="Search campaigns..." />
                <button className="campaign-search-clear">
                  <ChevronRight className="campaign-search-clear-icon" />
                </button>
              </div>

              <div className="campaign-list">
                {campaigns.map((campaign) => (
                  <div className="campaign-item" key={campaign}>
                    <input
                      type="checkbox"
                      id={campaign.replace(/\s+/g, "-").toLowerCase()}
                      className="campaign-checkbox"
                      checked={localSelectedCampaigns.includes(campaign)}
                      onChange={() => toggleCampaign(campaign)}
                    />
                    <label htmlFor={campaign.replace(/\s+/g, "-").toLowerCase()} className="campaign-label">
                      {campaign}
                    </label>
                  </div>
                ))}
              </div>

              <div className="show-all">
                <span>Show all</span>
                <ArrowRight className="show-all-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="company-filter">
          <div className="company-filter-header">
            <h3 className="company-filter-title">Company</h3>
            <ChevronRight className="company-filter-icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

