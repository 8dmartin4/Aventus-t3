import { Stack, TextInput, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { StaffApplicationForm } from "types/staffForm";

export const InfoTable = (applications: StaffApplicationForm[]) => {
  const initialRecords = applications[0];
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState(initialRecords);
  const [debouncedQuery] = useDebouncedValue(query, 200);

  // search
  //   useEffect(() => {
  //     setRecords(
  //       initialRecords.filter(({ osrsName }) => {
  //         if (
  //           debouncedQuery !== "" &&
  //           !`${osrsName}`
  //             .toLowerCase()
  //             .includes(debouncedQuery.trim().toLowerCase())
  //         ) {
  //           return false;
  //         }
  //         return true;
  //       })
  //     );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [debouncedQuery]);

  return (
    <div>
      <Stack>
        {/* <TextInput
          placeholder="Search RSN..."
          icon={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        /> */}
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
              render: ({ osrsName }) => <Text>{osrsName}</Text>,
            },
            // {
            //   accessor: "id",
            //   title: "id",
            //   render: (value) => {
            //     return value.id;
            //   },
            // },
          ]}
          records={records}
        />
      </Stack>
    </div>
  );
};

export default InfoTable;
