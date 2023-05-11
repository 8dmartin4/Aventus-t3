import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React, { type ReactNode } from "react";
import type { Category, Post } from "types/sanity";

export const BlogCard = ({ post, body }: { post: Post; body?: ReactNode }) => {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="20px">
        <Card.Section>
          <Image
            src={
              post.imageURL ??
              "https://cdnb.artstation.com/p/assets/images/images/040/564/429/medium/surface-digital-art-osrs-oldwiseman-1.jpg?1629229064"
            }
            height={160}
            alt={postMessage.name}
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <div>
            <Title order={1} weight={500}>
              {post.title}
            </Title>
            <Text size="sm" color="dimmed">
              <>Published {new Date(post.publishedAt).toLocaleString()}</>
              {post.author.womLink ? (
                <Link href={post.author.womLink}>
                  {" "}
                  by {post.author.name} / {post.author.rsn}
                </Link>
              ) : (
                <>
                  by {post.author.name} / {post.author.rsn}
                </>
              )}
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
          {body ? (
            body
          ) : (
            <>
              <Stack>
                {post.body[0]?.children && post.body[0]?.children[0]
                  ? post.body[0].children[0].text.substring(0, 200)
                  : ""}
                <Button variant="light" color="blue">
                  Read More...
                </Button>
              </Stack>
            </>
          )}
        </Text>
      </Card>
    </>
  );
};
