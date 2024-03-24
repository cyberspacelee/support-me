import { LightDarkToggle } from '@/components/light-dark-toggle'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="h-screen flex flex-col justify-center gap-2 items-center">
        {children}
        <LightDarkToggle />
    </main>
  )
}

export default layout