import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentCases } from "@/components/dashboard/recent-cases"
import { TaskSelector } from "@/components/dashboard/task-selector"
import { NotificationPanel } from "@/components/dashboard/notification-panel"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <DashboardStats />
            <TaskSelector />
            <RecentCases />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <NotificationPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
