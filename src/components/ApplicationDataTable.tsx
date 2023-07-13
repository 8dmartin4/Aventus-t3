import { Stack, TextInput, Text, Badge, Modal } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { StaffApplication } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import StaffApplicaton from "pages/staffapplication";
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
  const [openModal, setOpenModal] = useState(false);
  const [currentModalRecord, setCurrentModalRecord] =
    useState<typeof applications>();

  const closeAllModals = () => {
    setOpenModal(false);
  };

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
                  setOpenModal(true);
                  setCurrentModalRecord(record);
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
      <Modal
        opened={openModal}
        onClose={closeAllModals}
        title={`${currentModalRecord?.osrsName || ""}'s Application`}
      >
        <Stack>
          <Text>OSRS Name: {currentModalRecord?.osrsName || ""}</Text>
          <Text>Discord Name: {currentModalRecord?.discordName || ""}</Text>
          <Text>
            Staff Reference?{" "}
            {currentModalRecord?.staffReference
              ? currentModalRecord?.staffReferenceName
              : "none"}
          </Text>{" "}
          Desired Roles:
          {currentModalRecord?.desiredRoles.map((role: string) => (
            <Text>{role}</Text>
          ))}
          <Text>
            When and how did you find/join the Aventus community?{" "}
            {currentModalRecord?.joinedAventusInput || ""}
          </Text>
          <Text>
            Why do you want to be a part of the Staff team?{" "}
            {currentModalRecord?.reasonForApplicationInput || ""}
          </Text>
          <Text>
            Why do you think you are a good fit for the subrole(s) you selected?{" "}
            {currentModalRecord?.reasonForGoodFitInput || ""}
          </Text>
        </Stack>
      </Modal>
    </div>
  );
};

export default ApplicationDataTable;
