import { Prism } from "@mantine/prism";
import React from "react";
import { api } from "utils/api";
import { useRouter } from "next/router";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import {
  Paper,
  Group,
  Divider,
  Title,
  AppShell,
  Box,
  Button,
} from "@mantine/core";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import { IconArrowBack, IconQuote } from "@tabler/icons-react";
import Link from "next/link";
import sanity from "utils/sanity";
import Image from "next/image";
import { Sidebar } from "components/layouts/Sidebar";
import type { NextPage } from "next";
import { BlogCard } from "components/content/BlogCard";

const myPortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    blockquote: ({ children }: any) => (
      <Paper>
        <Group>
          <IconQuote
            size={18}
            className="mb-4"
            style={{ transform: "scaleX(-1)" }}
          />
          <p className="blockquote">{children}</p>
          <IconQuote size={18} className="mb-4" />
        </Group>
      </Paper>
    ),
    h1: ({ children }: any) => (
      <>
        <Title className="my-4" order={1}>
          {children}
        </Title>
        <Divider className="mb-4" />
      </>
    ),
    h2: ({ children }: any) => (
      <Title className="my-4" order={2}>
        {children}
      </Title>
    ),
    h3: ({ children }: any) => (
      <Title className="my-4" order={3}>
        {children}
      </Title>
    ),
    h4: ({ children }: any) => (
      <Title className="my-4" order={4}>
        {children}
      </Title>
    ),
    h5: ({ children }: any) => <Title order={5}>{children}</Title>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => <ul className="mt-xl mx-6">{children}</ul>,
    number: ({ children }: any) => <ol className="mt-lg mx-6">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }: any) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => (
      <li style={{ listStyleType: "disc" }}>{children}</li>
    ),

    // Ex. 2: rendering custom list items
    checkmarks: ({ children }: any) => <li>✅ {children}</li>,
  },
  types: {
    image: ({ value, isInline }: any) => {
      const { width, height } = getImageDimensions(value);
      return (
        <Image
          src={urlBuilder(sanity)
            .image(value)
            .width(isInline ? 100 : 800)
            .fit("max")
            .auto("format")
            .url()}
          alt={value.alt || " "}
          width={width}
          height={height}
          loading="lazy"
          style={{
            // Display alongside text if image appears inside a block text span
            display: isInline ? "inline-block" : "block",

            // Avoid jumping around with aspect-ratio CSS property
            aspectRatio: width / height,
          }}
        />
      );
    },
    callToAction: ({ value, isInline }: any) =>
      isInline ? (
        <Link href={value.url || ""}>{value.text}</Link>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link href={value.href || ""} rel={rel}>
          {children}
        </Link>
      );
    },
  },
};

const Newsfeed: NextPage = (props) => {
  const router = useRouter();
  const { data: post } = api.sanity.getOnePost.useQuery({
    slug: (router.query?.slug as string) || "",
  });

  return (
    <>
      <main>
        <AppShell>
          <Sidebar />
          <Link href="/newsfeed">
            <Button variant="outline" leftIcon={<IconArrowBack />}>
              Back to Newsfeed
            </Button>
          </Link>
          {post && post.length > 0 && (
            <>
              <Box mt={"20px"}>
                <BlogCard
                  post={post[0]}
                  body={
                    <PortableText
                      components={myPortableTextComponents}
                      value={post[0].body as PortableTextBlock}
                    />
                  }
                />
              </Box>
            </>
          )}
        </AppShell>
      </main>
    </>
  );
};

export default Newsfeed;
