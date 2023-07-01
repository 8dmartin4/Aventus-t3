import { Stack, TextInput, Text, Badge, Menu } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { StaffApplication } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { StaffApplicationForm } from "types/staffForm";

export const ApplicationDataTable = ({
  applications,
}: {
  applications: (StaffApplication | StaffApplicationForm)[];
}) => {
  const initialRecords = applications;
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<typeof applications>();
  const [debouncedQuery] = useDebouncedValue(query, 200);

  // search
  useEffect(() => {
    setRecords(
      initialRecords.filter(({ osrsName }) => {
        if (
          debouncedQuery !== "" &&
          !`${osrsName}`
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
            {
              accessor: "desiredRoles",
              title: "Desired Roles",
              render: ({ desiredRoles }) =>
                desiredRoles.map((role) => <Badge>{role}</Badge>),
            },
            {
              accessor: "status",
              title: "Application Status",
              render: ({ status }) => <Text>{status}</Text>,
            },
          ]}
          records={records}
          rowContextMenu={{
            trigger: "click",
            items: (record) => [
              {
                key: "view",
                title: `View application for ${record.osrsName}`,
                onClick: () => {
                  // modal with application information
                },
              },
              {
                key: "approve",
                color: "green",
                title: `Approve application for ${record.osrsName}`,
                onClick: () => {
                  //update status to approved
                  //update approving user id
                },
              },
              {
                key: "decline",
                color: "red",
                title: `Decline application for ${record.osrsName}`,
                onClick: () => {
                  //update status to declined
                  //update approving user id
                },
              },
            ],
          }}
        />
      </Stack>
    </div>
  );
};

export default ApplicationDataTable;
