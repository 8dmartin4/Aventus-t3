import {
  AppShell,
  Badge,
  Card,
  Group,
  Image,
  Text,
  Button,
} from "@mantine/core";
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
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://cdnb.artstation.com/p/assets/images/images/040/564/429/medium/surface-digital-art-osrs-oldwiseman-1.jpg?1629229064"
                  height={160}
                  alt="Soulwars Art"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{posts[0].title}</Text>
                <Badge color="pink" variant="light">
                  Category
                </Badge>
              </Group>
              <Text size="sm" color="dimmed">
                {posts[0].publishedAt}
              </Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                See full post
              </Button>
            </Card>
            <Prism language="json">{JSON.stringify(posts, null, `\t`)}</Prism>
          </AppShell>
        </main>
      </>
    )
  );
};

export default Newsfeed;
