import { Badge, Card, Group, Image, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";
import type { Category, Post } from "types/sanity";

export const BlogCard = (post: Post) => {
  return (
    <>
      <Link href={`/newsfeed/${post.slug.current}`}>
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="20px">
          <Card.Section>
            <Image
              src="https://cdnb.artstation.com/p/assets/images/images/040/564/429/medium/surface-digital-art-osrs-oldwiseman-1.jpg?1629229064"
              height={160}
              alt="Soulwars Art"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <div>
              <Title order={1} weight={500}>
                {post.title}
              </Title>
              <Text size="xs" color="dimmed">
                <Link href={post.author.womLink}>
                  Author: {post.author.name} / {post.author.rsn}
                </Link>
              </Text>
            </div>
            <Group position="right" spacing="xs">
              {post.categories.map((category: Category) => (
                <Badge
                  styles={{
                    root: { backgroundColor: category.color, color: "black" },
                  }}
                  variant="light"
                >
                  {" "}
                  {category.title}{" "}
                </Badge>
              ))}
            </Group>
          </Group>
          <Text size="sm" color="dimmed">
            {post.body[0]?.children && post.body[0]?.children[0]
              ? post.body[0].children[0].text
              : ""}
          </Text>
          <Group position="right" mt="md">
            <Text size="xs" color="dimmed">
              Published {new Date(post.publishedAt).toLocaleString()}
            </Text>
          </Group>
        </Card>
      </Link>
    </>
  );
};
