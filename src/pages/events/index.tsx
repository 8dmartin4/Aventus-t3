import { AppShell, LoadingOverlay } from '@mantine/core'
import { DataTable } from 'mantine-datatable';
import React from 'react'
import { Sidebar } from '~/components/Sidebar'
import { api } from '~/utils/api';

const index = () => {
  const { data: groupCompetition, status: groupCompetitionFetchStatus } =
  api.wom.findGroupCompetitions.useQuery({ id: 267 });

  return (
    <>
      <main>
        <AppShell className='flex'>
          <Sidebar />
          {groupCompetitionFetchStatus === "loading" ? (
              <LoadingOverlay visible />
          ) : (
            <DataTable 
              sx={{ height: '75vh'}}
              withBorder
              borderRadius="sm"
              withColumnBorders
              striped
              highlightOnHover
              columns={[{accessor: "title"}, {accessor: "metric"}, {accessor: "id"}, ]}
              records={groupCompetition}
              rowContextMenu={{
                trigger: 'click',
                items: (record) => [
                  {
                    key: 'delete',
                    color: 'red',
                    title: `Delete Event: "${record.title}"`,
                    //put wom delete action in the onclick function
                    onClick: () => {undefined}
                  },
                ],
              }}
            />
          )}
        </AppShell>
      </main>
    </>
  )
}

export default index