import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Sidebar } from "~/components/Sidebar";
import {
  Center,
  Text,
  Button,
  LoadingOverlay,
  AppShell,
  SimpleGrid,
  Title,
  Stack,
} from "@mantine/core";
import Head from "next/head";
import InfoTable from "~/components/InfoTable";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: groupCompetition, status: groupCompetitionFetchStatus } =
    api.wom.findGroupCompetitions.useQuery({ id: 267 });

  const today = new Date();
  // find the most recent friday
  const lastFriday =
    new Date().getDay() >= 1
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

  // find the current and previous event
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

  // find the details of the current and previous events
  const { data: currentCompetitionDetails, status: currentCompetitionDetailsFetchStatus } =
    api.wom.findCompetitionDetails.useQuery({ id: (currentEvent?.id ? currentEvent?.id : 0) });
  const { data: lastCompetitionDetails, status: lastCompetitionDetailsFetchStatus } =
    api.wom.findCompetitionDetails.useQuery({ id: ( lastEvent?.id ? lastEvent?.id : 0 ) });

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
              <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
                {/* current event table */}
                {currentCompetitionDetailsFetchStatus === "loading" ? (
                  <LoadingOverlay visible />
                ) : (
                  <Stack>
                    <Title order={2}>Current Event:</Title>
                    <Title order={4}>{currentCompetitionDetails?.title}</Title>
                    <Title order={6}>Duration: {currentCompetitionDetails?.startsAt.toLocaleDateString()} to {currentCompetitionDetails?.endsAt.toLocaleDateString()}</Title>
                    {currentCompetitionDetails && <InfoTable {...currentCompetitionDetails} />}
                  </Stack>
                )}
                {/* last event table */}
                {lastCompetitionDetailsFetchStatus === "loading" ? (
                  <LoadingOverlay visible />
                ) : (
                  <Stack>
                    <Title order={2}>Last Event:</Title>
                    <Title order={4}>{lastCompetitionDetails?.title}</Title>
                    <Title order={6}>Duration: {lastCompetitionDetails?.startsAt.toLocaleDateString()} to {lastCompetitionDetails?.endsAt.toLocaleDateString()}</Title>
                    {lastCompetitionDetails && <InfoTable {...lastCompetitionDetails} />}
                  </Stack>
                )}
              </SimpleGrid>
            )}
          </AppShell>
        ) : (
          // if not signed in display sign in page
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
