import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React, { type ReactNode } from "react";
import type { Category, Post } from "types/sanity";

export const BlogCard = (props: { post: Post; body: ReactNode }) => {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="20px">
        <Card.Section>
          <Image
            src={
              props.post.imageURL ??
              "https://cdnb.artstation.com/p/assets/images/images/040/564/429/medium/surface-digital-art-osrs-oldwiseman-1.jpg?1629229064"
            }
            height={160}
            alt={postMessage.name}
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <div>
            <Title order={1} weight={500}>
              {props.post.title}
            </Title>
            <Text size="xs" color="dimmed">
              <Text size="xs" color="dimmed">
                Published {new Date(props.post.publishedAt).toLocaleString()}
              </Text>
              {props.post.author.womLink ? (
                <Link href={props.post.author.womLink}>
                  by {props.post.author.name} / {props.post.author.rsn}
                </Link>
              ) : (
                <>
                  by {props.post.author.name} / {props.post.author.rsn}
                </>
              )}
            </Text>
          </div>
          <Group position="right" spacing="xs">
            {props.post.categories.map((category: Category) => (
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
          {props.body ? (
            props.body
          ) : (
            <Stack>
              {props.post.body[0]?.children && props.post.body[0]?.children[0]
                ? props.post.body[0].children[0].text
                : ""}
              <Button variant="light" color="blue" size="xs">
                Read More...
              </Button>
            </Stack>
          )}
        </Text>
      </Card>
    </>
  );
};
