import { Alert, AppShell, LoadingOverlay, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { Sidebar } from "components/layouts/Sidebar";
import { ApplicationDataTable } from "components/admin/ApplicationDataTable";
import React from "react";
import { api } from "utils/api";
import type { NextPage } from "next";
import { useMediaQuery } from "@mantine/hooks";
import { useSession } from "next-auth/react";

const AdminPanel: NextPage = (props) => {
  const { data: applications, fetchStatus } =
    api.staffApplication.findAllStaffApplications.useQuery({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  const appData = JSON.stringify(applications, null, "\t");
  console.log(applications);

  const { data: session } = useSession();

  return (
    <>
      <main>
        <AppShell>
          <Sidebar />
          {session &&
          session.user?.role &&
          session.user.role.includes("ADMIN") ? (
            fetchStatus === "idle" ? (
              applications && applications.length > 0 ? (
                <>
                  {/* <Prism language="json">{appData}</Prism> */}
                  <ApplicationDataTable applications={applications} />
                </>
              ) : (
                <Alert title="No applications">
                  There are no applications to display.
                </Alert>
              )
            ) : (
              <LoadingOverlay visible />
            )
          ) : (
            <Text>
              You do not have the proper permissions to access this page.
            </Text>
          )}
        </AppShell>
      </main>
    </>
  );
};

export default AdminPanel;
