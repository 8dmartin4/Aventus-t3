import { Stack, TextInput, Text, Badge, Modal, Paper } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { StaffApplication } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { StaffApplicationForm } from "types/staffForm";
import { useSession } from "next-auth/react";
import { api } from "utils/api";

export const ApplicationDataTable = ({
  applications,
}: {
  applications: (StaffApplication | StaffApplicationForm)[];
}) => {
  const { data: session } = useSession();
  const initialRecords = applications;
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<typeof applications>();
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [openModal, setOpenModal] = useState(false);
  const [currentModalRecord, setCurrentModalRecord] = useState<
    StaffApplication | StaffApplicationForm
  >();
  const utils = api.useContext();

  const closeAllModals = () => {
    setOpenModal(false);
  };

  const upsertStaffApplication =
    api.staffApplication.upsertOneStaffApplication.useMutation({
      async onSuccess() {
        await utils.staffApplication.invalidate();
      },
    });

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
                  session &&
                  session.user?.role &&
                  session.user.role.includes("ADMIN")
                    ? upsertStaffApplication.mutate({
                        ...record,
                        status: "Approved",
                        approvingUserId: session.user.id,
                        approvingUserName: session.user.name || "",
                      })
                    : {};
                  //update status to approved
                  //update approving user id
                },
              },
              {
                key: "decline",
                color: "red",
                title: `Decline application for ${record.osrsName}`,
                onClick: () => {
                  session &&
                  session.user?.role &&
                  session.user.role.includes("ADMIN")
                    ? upsertStaffApplication.mutate({
                        ...record,
                        status: "Rejected",
                        approvingUserId: session.user.id,
                        approvingUserName: session.user.name || "",
                      })
                    : {};
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
          OSRS Name:
          <Paper p="xs">{currentModalRecord?.osrsName || ""}</Paper>
          Discord Name
          <Paper p="xs">{currentModalRecord?.discordName || ""}</Paper>
          Staff Reference?{" "}
          <Paper p="xs">
            {currentModalRecord?.staffReference
              ? currentModalRecord?.staffReferenceName
              : "none"}
          </Paper>
          Desired Roles:
          {currentModalRecord?.desiredRoles.map((role: string) => (
            <Paper p="xs">{role}</Paper>
          ))}
          When and how did you find/join the Aventus community?
          <Paper p="xs">{currentModalRecord?.joinedAventusInput || ""}</Paper>
          Why do you want to be a part of the Staff team?
          <Paper p="xs">
            {currentModalRecord?.reasonForApplicationInput || ""}
          </Paper>
          Why do you think you are a good fit for the subrole(s) you selected?
          <Paper p="xs">
            {currentModalRecord?.reasonForGoodFitInput || ""}
          </Paper>
        </Stack>
      </Modal>
    </div>
  );
};

export default ApplicationDataTable;
