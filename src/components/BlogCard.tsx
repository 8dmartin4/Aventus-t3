import { Badge, Card, Group, Image, Text, Title } from "@mantine/core";
import React from "react";
import type { Category, Post } from "types/sanity";

export const BlogCard = (post: Post) => {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="20px">
        <Card.Section>
          <Image
            src="https://cdnb.artstation.com/p/assets/images/images/040/564/429/medium/surface-digital-art-osrs-oldwiseman-1.jpg?1629229064"
            height={160}
            alt="Soulwars Art"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Title order={1} weight={500}>
            {post.title}
          </Title>
          <Group position="right" spacing="xs">
            {post.categories.map((cats: Category) => (
              <Badge color="pink" variant="light">
                {" "}
                {cats.title}{" "}
              </Badge>
            ))}
          </Group>
        </Group>
        <Text size="sm" color="dimmed">
          {post.body[0]?.children && post.body[0]?.children[0]
            ? post.body[0].children[0].text
            : ""}
        </Text>
        <Group position="apart" mt="md">
          <Text size="xs" color="dimmed">
            Author: {post.author.name}
          </Text>
          <Text size="xs" color="dimmed">
            Published {new Date(post.publishedAt).toLocaleString()}
          </Text>
        </Group>
      </Card>
    </>
  );
};
