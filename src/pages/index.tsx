import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { api } from "utils/api";
import { Sidebar } from "components/layouts/Sidebar";
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
  Skeleton,
} from "@mantine/core";
import Head from "next/head";
import { TopFiveChart } from "components/data/TopFiveChart";
import useVersusLeader from "utils/useVersusLeader";
import { useMediaQuery } from "@mantine/hooks";
import StackOrSimpleGrid from "components/layouts/SimpleGridOrStack";
import { DataTable } from "mantine-datatable";
import { orderBy } from "lodash";

const Home: NextPage = (props) => {
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
    },
    (currentCompetitionDetails && currentCompetitionDetails?.metric) || ""
  );

  //check if currentCompetionDetails.metric is a skill, boss, ehp, or ehb
  const metricGained = (metric: string) => {
    if (metric === "ehp") {
      return "EHP";
    } else if (metric === "ehb") {
      return "EHB";
    } else {
      return metric === typeof "SKILL" ? "XP" : "KC";
    }
  };

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
            <StackOrSimpleGrid cols={2} spacing="lg" verticalSpacing="sm">
              <Card radius="lg">
                {/* current event table */}
                {
                  <>
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
                  </>
                }
                {/* last event table */}
                {currentCompetitionDetailsFetchStatus === "loading" ? (
                  <LoadingOverlay visible />
                ) : (
                  <>
                    <Title order={2}>
                      {`Your Total ${metricGained(
                        currentCompetitionDetails?.metric || ""
                      )} Gained is: `}
                      {(playerCompetitionDetails &&
                        playerCompetitionDetails[0]?.progress?.gained) ||
                        0}
                    </Title>
                    <Title order={2}>{versusLeader()}</Title>
                  </>
                )}
              </Card>
              <Card radius="lg">
                <Title order={2}>Last Event Details:</Title>
                <Title order={4}>
                  {lastCompetitionDetails?.title} - Top 10 Players
                </Title>
                <Title order={6}>
                  Duration:{" "}
                  {lastCompetitionDetails?.startsAt.toLocaleDateString()} to{" "}
                  {lastCompetitionDetails?.endsAt.toLocaleDateString()}
                </Title>
                {lastCompetitionDetailsFetchStatus === "loading" ? (
                  <LoadingOverlay visible />
                ) : (
                  <>
                    {lastCompetitionDetails && (
                      <DataTable
                        columns={[
                          {
                            accessor: "player.username",
                            sortable: true,
                          },
                          {
                            accessor: "progress.gained",
                            sortable: true,
                          },
                        ]}
                        records={orderBy(
                          lastCompetitionDetails.participations,
                          ["progress.gained"],
                          ["desc"]
                        ).splice(0, 9)}
                      />
                    )}
                  </>
                )}
              </Card>
            </StackOrSimpleGrid>
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
