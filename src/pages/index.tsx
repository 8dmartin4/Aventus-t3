import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Sidebar } from "~/components/Sidebar";
import {
  Center,
  Text,
  Button,
  Group,
  Stack,
  LoadingOverlay,
  AppShell,
  Title,
  Divider,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import Head from "next/head";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: groupCompetition, status: groupCompetitionFetchStatus } =
    api.wom.findGroupCompetitions.useQuery({ id: 267 });

  const today = new Date();
  const lastFriday =
    new Date().getDay() >= 5
      ? new Date(
          new Date().setDate(
            new Date().getDate() - ((new Date().getDay() + 2) % 7) - 7
          )
        )
      : new Date(
          new Date().setDate(
            new Date().getDate() - ((new Date().getDay() + 2) % 7)
          )
        );

  const currentEvent = groupCompetition?.find(
    (comp) =>
      comp.startsAt.getTime() <= today.getTime() &&
      comp.endsAt.getTime() >= today.getTime()
  );
  const lastEvent = groupCompetition?.find(
    (comp) =>
      comp.startsAt.getTime() <= lastFriday.getTime() &&
      comp.endsAt.getTime() >= lastFriday.getTime()
  );

  return (
    <>
      <Head>
        <title>Aventus</title>
        <meta name="description" content="Aventus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {sessionData ? (
          <AppShell className="flex">
            <Sidebar />
            <Stack p="md">
              <Title order={1}>Current Event</Title>
              {currentEvent && (
                <div>
                  <h1>{currentEvent.title}</h1>
                  <h2>{currentEvent.group?.name}</h2>
                  <h2>Event ID: {currentEvent.id}</h2>
                </div>
              )}
              <Divider />
              <Title order={1}>Last Event</Title>
              {lastEvent && (
                <div>
                  <h1>{lastEvent.title}</h1>
                  <h2>{lastEvent.group?.name}</h2>
                  <h2>Event ID: {lastEvent.id}</h2>
                </div>
              )}
              {/* {currentEvent && JSON.stringify(currentEvent, null, `\t`)}
              {lastEvent && JSON.stringify(lastEvent, null, `\t`)} */}
              {/* {groupCompetitionFetchStatus === "loading" ? (
                  <LoadingOverlay visible />
                ) : (
                  groupCompetition &&
                  groupCompetition.map((comp) => (
                    <div key={comp.id}>
                      <h1>{comp.title}</h1>
                      <h2>{comp.group?.name}</h2>
                      <h2>Event ID: {comp.id}</h2>
                      <h2>Starts At: {comp.startsAt.toLocaleString()}</h2>
                      <h2>Ends At: {comp.endsAt.toLocaleString()}</h2>
                    </div>
                  ))
                )} */}
            </Stack>
          </AppShell>
        ) : (
          <div>
            <Center>
              <Text
                p={20}
                fw={700}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              >
                <h1>Welcome To Aventus</h1>
              </Text>
              <Button
                variant="outline"
                color="gray"
                radius="md"
                size="xl"
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                onClick={
                  sessionData ? () => void signOut() : () => void signIn()
                }
              >
                Sign In
              </Button>
            </Center>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
