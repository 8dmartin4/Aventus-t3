import { CompetitionDetails } from "@wise-old-man/utils"
import { DataTable } from "mantine-datatable"

const InfoTable = ( data : CompetitionDetails ) => {

    return (
        <div>
            <DataTable
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
                        return (value.progress.gained > 0) ? value.player.displayName : ""
                    }                
                    },
                    {
                    accessor: "gained",
                    title: "XP/KC Gained",   
                    render: (value) => { 
                        return (value.progress.gained > 0) ? value.progress.gained : ""
                    }
                    },
                ]}
                records={data.participations}
            />
        </div>
    )
}

export default InfoTable;