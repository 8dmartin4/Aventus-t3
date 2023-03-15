import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Sidebar } from "~/components/Sidebar";
import { Center, Text, Button } from "@mantine/core";

const Home: NextPage = () => {
const { data: sessionData } = useSession();

    return (
        <div className="justify-center">
            {sessionData? 
                <Sidebar /> : 
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
