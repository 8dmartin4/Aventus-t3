import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Sidebar } from "~/components/Sidebar";
import {
  Center,
  Text,
  Button,
  Stack,
  LoadingOverlay,
  AppShell,
  Title,
  Divider,
} from "@mantine/core";
import Head from "next/head";
import { Prism } from "@mantine/prism";
import EventInfo from "~/components/EventInfo";
import { DataTable } from "mantine-datatable";

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
            {groupCompetitionFetchStatus === "loading" ? (
              <LoadingOverlay visible />
            ) : (
              <Stack p="md">
                <Title order={1}>Current Event</Title>
                {currentEvent ? (
                  <EventInfo event={currentEvent} order={2} />
                ) : (
                  "No event found."
                )}
                <Divider />
                <Title order={2}>Last Event</Title>
                {lastEvent ? (
                  <EventInfo event={lastEvent} order={3} />
                ) : (
                  "No event found."
                )}
                <Prism language="json" withLineNumbers>
                  {(currentEvent
                    ? JSON.stringify({ current: currentEvent }, null, `\t`)
                    : "") +
                    (lastEvent
                      ? JSON.stringify({ last: lastEvent }, null, `\t`)
                      : "")}
                </Prism>
                {groupCompetition && groupCompetition.length > 0 ? (
                  <DataTable
                    columns={[
                      {
                        accessor: "title",
                      },
                      {
                        accessor: "metric",
                      },
                      {
                        accessor: "startsAt",
                        title: "Starts",
                        render: (value) =>
                          new Date(value?.startsAt).toLocaleString(),
                      },
                      {
                        accessor: "endsAt",
                        title: "Ends",
                        render: (value) =>
                          new Date(value?.endsAt).toLocaleString(),
                      },
                    ]}
                    records={groupCompetition}
                  />
                ) : (
                  <></>
                )}
                {groupCompetition &&
                  groupCompetition.map((comp) => (
                    <EventInfo order={4} event={comp} key={comp.id} />
                  ))}
              </Stack>
            )}
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
