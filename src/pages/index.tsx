import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "utils/api";
import { Sidebar } from "components/Sidebar";
import {
  Text,
  Button,
  LoadingOverlay,
  AppShell,
  SimpleGrid,
  Title,
  Stack,
  BackgroundImage,
  Box,
} from "@mantine/core";
import { Prism } from "@mantine/prism";
import Head from "next/head";
import { TopFiveChart } from "components/TopFiveChart";
import useVersusLeader from "utils/useVersusLeader";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const username = sessionData?.user?.name as string;
  const { data: groupCompetition, status: groupCompetitionFetchStatus } =
    api.wom.findGroupCompetitions.useQuery({ id: 267 });
  const {
    data: playerCompetitionDetails,
    status: playerCompetitionDetailsFetchStatus,
  } = api.wom.findPlayerCompetitionDetails.useQuery({ name: username });
  console.log(playerCompetitionDetails);

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
  const {
    data: currentCompetitionDetails,
    status: currentCompetitionDetailsFetchStatus,
  } = api.wom.findCompetitionDetails.useQuery({
    id: currentEvent?.id ? currentEvent?.id : 0,
  });
  const {
    data: lastCompetitionDetails,
    status: lastCompetitionDetailsFetchStatus,
  } = api.wom.findCompetitionDetails.useQuery({
    id: lastEvent?.id ? lastEvent?.id : 0,
  });

  //compare player versus the 1st place competitor using a custom react hook
  const versusLeader = useVersusLeader(
    (playerCompetitionDetails &&
      playerCompetitionDetails[0]?.progress?.gained) ||
      0,
    currentCompetitionDetails ?? {
      participations: [{ progress: { gained: null } }],
    }
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
              <SimpleGrid cols={1} spacing="sm" verticalSpacing="sm">
                {/* current event table */}
                {currentCompetitionDetailsFetchStatus === "loading" ? (
                  <LoadingOverlay visible />
                ) : (
                  <Stack>
                    <Title order={2}>Current Event Leaderboard:</Title>
                    <Title order={4}>{currentCompetitionDetails?.title}</Title>
                    <Title order={6}>
                      Duration:{" "}
                      {currentCompetitionDetails?.startsAt.toLocaleDateString()}{" "}
                      to{" "}
                      {currentCompetitionDetails?.endsAt.toLocaleDateString()}
                    </Title>
                    {currentCompetitionDetails && (
                      <TopFiveChart {...currentCompetitionDetails} />
                    )}
                  </Stack>
                )}
                {/* last event table */}
                {currentCompetitionDetailsFetchStatus === "loading" ? (
                  <LoadingOverlay visible />
                ) : (
                  <Stack>
                    <Title order={2}>
                      Your Total XP/KC Gained is:{" "}
                      {playerCompetitionDetails &&
                        playerCompetitionDetails[0]?.progress?.gained}
                    </Title>
                    <Title order={2}>{versusLeader()}</Title>
                  </Stack>
                )}
              </SimpleGrid>
            )}
          </AppShell>
        ) : (
          // if not signed in display sign in page
          <div>
            <Box sx={{ width: "vw", height: "vh" }}>
              <BackgroundImage src="https://cdnb.artstation.com/p/assets/images/images/040/564/429/medium/surface-digital-art-osrs-oldwiseman-1.jpg?1629229064">
                <Text
                  p={20}
                  fw={700}
                  sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                  color="blue"
                  align="right"
                >
                  <h1>Welcome To Aventus</h1>
                </Text>

                <Text>
                  <h2>
                    An OldSchool RuneScape clan focused on community events. We
                    host weekly boss/skill of the week events and semiannual
                    large events such as bingos and more! Join CC 'Aventus' to
                    chat with us and learn more.
                  </h2>
                </Text>

                <Button
                  variant="outline"
                  color="black"
                  radius="md"
                  size="xl"
                  sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  Sign In
                </Button>
              </BackgroundImage>
            </Box>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
