import { AppShell } from '@mantine/core'
import React from 'react'
import { Sidebar } from '~/components/Sidebar'

const Profile = () => {
  return (
    <main>
        <AppShell className='flex'>
          <Sidebar />
          
        </AppShell>
    </main>
  )
}

export default Profile