import { AppShell, SimpleGrid } from "@mantine/core";
import { Sidebar } from "components/Sidebar";
import { BlogCard } from "components/BlogCard";
import React from "react";
import { api } from "utils/api";
import type { Post } from "types/sanity";
import type { NextPage } from "next";
import { useMediaQuery } from "@mantine/hooks";

const Newsfeed: NextPage = (props) => {
  const { data: posts } = api.sanity.getAllPosts.useQuery();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    posts &&
    posts.length > 0 && (
      <>
        <main>
          <AppShell>
            <Sidebar />
            <SimpleGrid cols={isMobile ? 1 : 2} className="w-full">
              {posts.map((post: Post) => (
                <BlogCard post={post} />
              ))}
            </SimpleGrid>
          </AppShell>
        </main>
      </>
    )
  );
};

export default Newsfeed;
