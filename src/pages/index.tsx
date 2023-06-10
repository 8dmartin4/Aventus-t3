import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { api } from "utils/api";
import { Sidebar } from "components/Sidebar";
import {
  Button,
  LoadingOverlay,
  AppShell,
  SimpleGrid,
  Title,
  Stack,
  Center,
  Card,
  Image,
} from "@mantine/core";
import Head from "next/head";
import { TopFiveChart } from "components/TopFiveChart";
import useVersusLeader from "utils/useVersusLeader";
import { useMediaQuery } from "@mantine/hooks";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const username = (session?.user?.name as string) || "Guest";
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
        <AppShell className="flex">
          <Sidebar />
          {session ? (
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
                    to {currentCompetitionDetails?.endsAt.toLocaleDateString()}
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
          ) : (
            // if not signed in display sign in page
            <div>
              <SimpleGrid cols={isMobile ? 1 : 3} className="w-full">
                <div></div>
                <Center>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    mt="25vh"
                  >
                    <Card.Section>
                      <Image
                        src={
                          "https://cdnb.artstation.com/p/assets/images/images/040/564/429/medium/surface-digital-art-osrs-oldwiseman-1.jpg?1629229064"
                        }
                        height={160}
                        alt={"OSRS Soulwars Promotional Image"}
                      />
                    </Card.Section>
                    <Stack justify="space-between" mt="15px">
                      <Title order={4}>
                        Welcome to the Aventus OSRS Clan website! Sign in using
                        your discord account to access more features.
                      </Title>
                      <Button
                        variant="light"
                        color="blue"
                        onClick={() => void signIn()}
                      >
                        Sign In
                      </Button>
                    </Stack>
                  </Card>
                </Center>
              </SimpleGrid>
            </div>
          )}
        </AppShell>
      </main>
    </>
  );
};

export default Home;
