import { Text } from "@mantine/core";
import { StaffApplication } from "@prisma/client";
import { DataTable } from "mantine-datatable";
import { StaffApplicationForm } from "types/staffForm";

export const InfoTable = ({
  applications,
}: {
  applications: (StaffApplication | StaffApplicationForm)[];
}) => {
  return (
    <div>
      <DataTable
        sx={{ height: "75vh" }}
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        columns={[
          {
            accessor: "osrsName",
            title: "RSN",
            render: (record) => <Text>{record.osrsName}</Text>,
          },
          // {
          //   accessor: "id",
          //   title: "id",
          //   render: (value) => {
          //     return value.id;
          //   },
          // },
        ]}
        records={applications}
      />
    </div>
  );
};

export default InfoTable;
