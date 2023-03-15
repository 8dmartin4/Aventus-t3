import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Sidebar } from '~/components/Sidebar';
import { api } from '~/utils/api';

const Dashboard: NextPage = () => {
    const { data: sessionData } = useSession();

    return (
        <div>
            {sessionData? 
            <Sidebar /> : 
            <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
                Sign In
            </button>}
        </div>
    )
};

export default Dashboard;