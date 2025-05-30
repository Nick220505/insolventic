import { DatabaseSelector } from "@/components/auth/database-selector"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <DatabaseSelector />
    </div>
  )
}
