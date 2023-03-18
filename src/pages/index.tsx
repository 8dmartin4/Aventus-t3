import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Sidebar } from "~/components/Sidebar";
import { Center, Text, Button, Group, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";

const Home: NextPage = () => {
    const { data: sessionData } = useSession();
    const { data: groupCompetition, status: groupCompetitionFetchStatus } =
       api.wom.findGroupCompetitions.useQuery({ id: 267 })

    const [fromDate, setFromDate] = useState<Date | null>(new Date());
    const [toDate, setToDate] = useState<Date | null>(new Date());

    return (
        <div>
            {sessionData? 
                <div className="flex">
                    <Sidebar /> 
                    <Stack>
                        <Group>
                            <DateInput 
                                label="From: "
                                value={fromDate}
                                onChange={setFromDate}
                            />
                            <DateInput 
                                label="To: "
                                value={toDate}
                                onChange={setToDate}
                            />
                        </Group>
                        <div className='flex flex-col justify-center'>
                            {groupCompetition &&
                                groupCompetition.map((comp) => (  
                                    <div key={comp.id}>
                                        <h1>{comp.title}</h1>
                                        <h2>{comp.group?.name}</h2>
                                        <h2>Event ID: {comp.id}</h2>
                                        <h2>Starts At: {comp.startsAt.toLocaleDateString()}</h2>
                                    </div>
                            ))}
                        </div>
                    </Stack>
                </div>: 
                <div>
                    <Center>
                        <Text p={20} fw={700} sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                            <h1>Welcome To Aventus</h1>
                        </Text>
                        <Button
                            variant="outline"
                            color="gray"
                            radius="md"
                            size="xl"
                            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                            onClick={sessionData ? () => void signOut() : () => void signIn()}
                        >
                            Sign In
                        </Button>
                    </Center>
                </div>
            }
        </div>
    )
};

export default Home;
