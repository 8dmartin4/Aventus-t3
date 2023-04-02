import { AppShell, LoadingOverlay } from '@mantine/core'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import React from 'react'
import { Sidebar } from '~/components/Sidebar'
import { api } from '~/utils/api';

const index = () => {
  const { data: groupCompetition, status: groupCompetitionFetchStatus } =
  api.wom.findGroupCompetitions.useQuery({ id: 267 });

  const calendarEvents = groupCompetition?.map((value) => {return {
    title: value.title, 
    start: value.startsAt.toISOString(), 
    end: value.endsAt.toISOString()
  }})

  return (
    <>
      <main>
        <AppShell className='flex'>
          <Sidebar />
          {groupCompetitionFetchStatus === "loading" ? (
              <LoadingOverlay visible />
          ) : (
            <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView='dayGridMonth'
              events={calendarEvents}
            />
          )}
        </AppShell>
      </main>
    </>
  )
}

export default index;