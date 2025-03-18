"use client"

import type React from "react"

import { useState } from "react"
import {
  BarChart3,
  ChevronDown,
  Home,
  LifeBuoy,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  UserPlus,
  FileText,
  X,
} from "lucide-react"
import "./sidebar.css"
import Image from "next/image"

interface SidebarProps {
  isOpen?: boolean
  closeSidebar?: () => void
}

export default function Sidebar({ isOpen = true, closeSidebar }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        {closeSidebar && (
          <button className="close-sidebar-button" onClick={closeSidebar} aria-label="Close menu">
            <X className="close-icon" />
          </button>
        )}
        <div className="logo-container">
          <div className="logo">
            <Image src="/logo.svg" alt="Leadsync" width={24} height={24} />
          </div>
          <span className="logo-text">Leadsync</span>
        </div>

        <div className="account-selector">
          <p className="account-label">Choose your Account</p>
          <div className="dropdown">
            <button className="account-button">
              <span>Project name</span>
              <ChevronDown className="icon-small" />
            </button>
            <div className="dropdown-content account-dropdown">
              <a href="#" className="dropdown-item">
                Project 1
              </a>
              <a href="#" className="dropdown-item">
                Project 2
              </a>
              <a href="#" className="dropdown-item">
                Project 3
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          <NavItem
            icon={<Home size={18} />}
            label="Analytics"
            hasSubmenu
            isOpen={openMenus["Analytics"]}
            onClick={() => toggleMenu("Analytics")}
          >
            <ul className="submenu">
              <li>
                <a href="#" className="submenu-link">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="submenu-link">
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="submenu-link">
                  Metrics
                </a>
              </li>
            </ul>
          </NavItem>

          <NavItem
            icon={<BarChart3 size={18} />}
            label="Dashboard"
            isActive
            hasSubmenu
            isOpen={openMenus["Dashboard"]}
            onClick={() => toggleMenu("Dashboard")}
          >
            <ul className="submenu">
              <NavItem icon={<PieChart size={18} />} label="Activity" indent />
              <NavItem icon={<BarChart3 size={18} />} label="Team Stats" indent />
            </ul>
          </NavItem>

          <NavItem
            icon={<BarChart3 size={18} />}
            label="Campaign"
            hasSubmenu
            isOpen={openMenus["Campaign"]}
            onClick={() => toggleMenu("Campaign")}
          >
            <ul className="submenu">
              <li>
                <a href="#" className="submenu-link">
                  All Campaigns
                </a>
              </li>
              <li>
                <a href="#" className="submenu-link">
                  Create New
                </a>
              </li>
            </ul>
          </NavItem>

          <NavItem
            icon={<FileText size={18} />}
            label="CRM"
            hasSubmenu
            isOpen={openMenus["CRM"]}
            onClick={() => toggleMenu("CRM")}
          >
            <ul className="submenu">
              <li>
                <a href="#" className="submenu-link">
                  Contacts
                </a>
              </li>
              <li>
                <a href="#" className="submenu-link">
                  Deals
                </a>
              </li>
            </ul>
          </NavItem>

          <NavItem
            icon={<MessageSquare size={18} />}
            label="Replies"
            hasSubmenu
            isOpen={openMenus["Replies"]}
            onClick={() => toggleMenu("Replies")}
          >
            <ul className="submenu">
              <li>
                <a href="#" className="submenu-link">
                  All Replies
                </a>
              </li>
              <li>
                <a href="#" className="submenu-link">
                  Archived
                </a>
              </li>
            </ul>
          </NavItem>

          <NavItem
            icon={<Users size={18} />}
            label="Accounts"
            hasSubmenu
            isOpen={openMenus["Accounts"]}
            onClick={() => toggleMenu("Accounts")}
          >
            <ul className="submenu">
              <li>
                <a href="#" className="submenu-link">
                  Manage Accounts
                </a>
              </li>
              <li>
                <a href="#" className="submenu-link">
                  Permissions
                </a>
              </li>
            </ul>
          </NavItem>

          <NavItem
            icon={<UserPlus size={18} />}
            label="Extract Leads"
            hasSubmenu
            isOpen={openMenus["Extract Leads"]}
            onClick={() => toggleMenu("Extract Leads")}
          >
            <ul className="submenu">
              <li>
                <a href="#" className="submenu-link">
                  New Extraction
                </a>
              </li>
              <li>
                <a href="#" className="submenu-link">
                  History
                </a>
              </li>
            </ul>
          </NavItem>

          <NavItem
            icon={<Settings size={18} />}
            label="Settings"
            hasSubmenu
            isOpen={openMenus["Settings"]}
            onClick={() => toggleMenu("Settings")}
          >
            <ul className="submenu">
              <NavItem icon={<BarChart3 size={18} />} label="Integration" indent />
              <NavItem icon={<BarChart3 size={18} />} label="Team Stats" indent />
            </ul>
          </NavItem>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="support-button">
          <LifeBuoy size={18} />
          <span>Support</span>
        </button>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  hasSubmenu?: boolean
  isActive?: boolean
  indent?: boolean
  isOpen?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

function NavItem({
  icon,
  label,
  hasSubmenu = false,
  isActive = false,
  indent = false,
  isOpen = false,
  onClick,
  children,
}: NavItemProps) {
  return (
    <li className={`nav-item ${isActive ? "active" : ""} ${indent ? "indented" : ""}`}>
      <a
        href="#"
        className="nav-link"
        onClick={(e) => {
          if (hasSubmenu && onClick) {
            e.preventDefault()
            onClick()
          }
        }}
      >
        {!indent && <span className="nav-icon">{icon}</span>}
        <span className="nav-label">{label}</span>
        {hasSubmenu && !indent && <ChevronDown className={`submenu-icon ${isOpen ? "rotate" : ""}`} />}
      </a>
      {hasSubmenu && children && <div className={`submenu-container ${isOpen ? "open" : ""}`}>{children}</div>}
    </li>
  )
}

