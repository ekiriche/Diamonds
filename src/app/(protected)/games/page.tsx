'use client'

import { useSession } from 'next-auth/react'

export default function GamesPage() {
  const { data: session } = useSession()

  return (
    <div className="p-4">
      <h1>Games Page</h1>
      {session ? (
        <p>Welcome, {session.user?.name}!</p>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  )
}