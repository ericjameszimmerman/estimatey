"use client"

import { trpc } from '@/app/_trpc/client'
import { User } from '@/app/user'
import { Ghost } from "lucide-react"

const Dashboard = () => {
  const { data: projects, isLoading } = 
    trpc.getUserProjects.useQuery()

  return <main className="mx-auto max-w-7xl md:p-10">
    <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:flow-row sm:items-center sm:gap-0">
      <h1 className="mb-3 font-bold text-5xl text-gray-900">
        Projects
      </h1>
    </div>

    {/* display all of the user-accessible projects */}
    {projects && projects?.length !== 0 ? (
      <div></div>
    ) : isLoading ? (
      <div></div>
    ) : (
      <div className="my-16 flex flex-col items-center gap-2">
        <Ghost className="h-8 w-8 text-zinc-800" />
        <h3 className="font-semibold text-xl">
          Pretty empty around here...
        </h3>
        <p>Let&apos;s create a new Project.</p>
      </div>
    )}

    <User />
  </main>
}

export default Dashboard
