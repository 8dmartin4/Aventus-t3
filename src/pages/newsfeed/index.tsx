import { AppShell } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { Sidebar } from "components/Sidebar";
import React from "react";
import { api } from "utils/api";

const Newsfeed = () => {
  const { data: posts } = api.sanity.getAllPosts.useQuery();

  return (
    posts &&
    posts.length > 0 && (
      <>
        <main>
          <AppShell>
            <Sidebar />
            <Prism language="json">{JSON.stringify(posts, null, `\t`)}</Prism>
          </AppShell>
        </main>
      </>
    )
  );
};

export default Newsfeed;
