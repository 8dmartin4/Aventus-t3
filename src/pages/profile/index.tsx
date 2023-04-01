import { AppShell } from '@mantine/core'
import React from 'react'
import { Sidebar } from '~/components/Sidebar'

const index = () => {
  return (
    <main>
        <AppShell className='flex'>
          <Sidebar />
          
        </AppShell>
    </main>
  )
}

export default index