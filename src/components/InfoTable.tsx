import { Stack, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import type { CompetitionDetails } from "@wise-old-man/utils";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react"; 

const InfoTable = ( details : CompetitionDetails ) => {
    const initialRecords = details.participations;
    const [query, setQuery] = useState('');
    const [records, setRecords] = useState(initialRecords);
    const [debouncedQuery] = useDebouncedValue(query, 200);

    // search
    useEffect(() => {
        setRecords(
          initialRecords.filter(({ player }) => {
            if (
              debouncedQuery !== '' &&
              !`${player.displayName}`
                .toLowerCase()
                .includes(debouncedQuery.trim().toLowerCase())
            ) {
              return false;
            }
            return true;
          })
        );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [debouncedQuery]);

    return (
        <div>
            <Stack>
                <TextInput
                placeholder="Search RSN..."
                icon={<IconSearch size={16} />}
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                />
                <DataTable
                    sx={{ height: '75vh'}}
                    withBorder
                    borderRadius="sm"
                    withColumnBorders
                    striped
                    highlightOnHover
                    columns={[
                        {
                            accessor: "players",
                            title: "RSN",   
                            render: (value) => { 
                                return value.progress.gained > 0 ? value.player.displayName : ""
                            }                
                        },
                        {
                            accessor: "gained",
                            title: "XP/KC Gained", 
                            render: (value) => { 
                                return value.progress.gained > 0 ? value.progress.gained : ""
                            }
                        },
                    ]}
                    records={records}
                />
            </Stack>
        </div>
    )
}

export default InfoTable;