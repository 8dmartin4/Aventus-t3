import { AppShell } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { Sidebar } from "components/Sidebar";
import { InfoTable } from "components/InfoTable";
import React from "react";
import { api } from "utils/api";
import type { NextPage } from "next";
import { useMediaQuery } from "@mantine/hooks";

const AdminPanel: NextPage = (props) => {
  const { data: applications } =
    api.staffApplication.findAllStaffApplications.useQuery({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  const appData = JSON.stringify(applications, null, "\t");
  console.log(applications);

  return (
    <>
      <main>
        <AppShell>
          <Sidebar />
          <Prism language="json">
            {applications && applications.length > 0 ? appData : ""}
          </Prism>
          <InfoTable
            {...(applications && applications.length > 0
              ? applications
              : undefined)}
          />
        </AppShell>
      </main>
    </>
  );
};

export default AdminPanel;
