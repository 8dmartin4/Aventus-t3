import { AppShell } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { Sidebar } from "components/Sidebar";
import { BlogCard } from "components/BlogCard";
import React from "react";
import { api } from "utils/api";
import type { Post } from "types/sanity";

const Newsfeed = () => {
  const { data: posts } = api.sanity.getAllPosts.useQuery();

  return (
    posts &&
    posts.length > 0 && (
      <>
        <main>
          <AppShell>
            <Sidebar />
            {posts.map((post: Post) => (
              <BlogCard {...post} />
            ))}
            <Prism language="json">{JSON.stringify(posts, null, `\t`)}</Prism>
          </AppShell>
        </main>
      </>
    )
  );
};

export default Newsfeed;
