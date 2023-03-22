import { Stack, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { CompetitionDetails } from "@wise-old-man/utils";
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
                                return value.player.displayName 
                            }                
                        },
                        {
                            accessor: "gained",
                            title: "XP/KC Gained", 
                            render: (value) => { 
                                return value.progress.gained
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