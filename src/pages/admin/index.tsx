import { Alert, AppShell, LoadingOverlay, Stack, Tabs } from "@mantine/core";
import { Sidebar } from "components/layouts/Sidebar";
import { ApplicationDataTable } from "components/admin/ApplicationDataTable";
import React from "react";
import { api } from "utils/api";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const AdminPanel: NextPage = (props) => {
  const { data: applications, fetchStatus } =
    api.staffApplication.findAllStaffApplications.useQuery({});

  const appData = JSON.stringify(applications, null, "\t");
  console.log(applications);

  const { data: session } = useSession();

  return (
    <>
      <main>
        <AppShell>
          <Sidebar />
          <Tabs defaultValue="apps">
            <Tabs.List>
              <Tabs.Tab value="apps">Applications</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="apps">
              <Stack>
                {session &&
                session.user?.role &&
                session.user.role.includes("ADMIN") ? (
                  fetchStatus === "idle" ? (
                    applications && applications.length > 0 ? (
                      <div className="mt-4">
                        {/* <Prism language="json">{appData}</Prism> */}
                        <ApplicationDataTable applications={applications} />
                      </div>
                    ) : (
                      <Alert title="No applications">
                        There are no applications to display.
                      </Alert>
                    )
                  ) : (
                    <LoadingOverlay visible />
                  )
                ) : (
                  <Alert title="Unauthorized" color="red">
                    You must be an admin to access this page.
                  </Alert>
                )}
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </AppShell>
      </main>
    </>
  );
};

export default AdminPanel;
