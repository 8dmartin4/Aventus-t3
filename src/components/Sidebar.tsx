import { useSession } from 'next-auth/react';
import Image from 'next/image';

export const Sidebar = () => {
  const { data: sessionData } = useSession();
  
  return (
    //sidebar
    <div className='w-64 h-screen bg-neutral'>
        {/* Nav */}
        <div className='navbar'>
            {/* Title */}
            <div className='flex-1 justify-center'>
                <a className='mt-3 normal-case text-4xl'>AVENTUS</a>  
            </div>
            {/* Hamburger Icon */}
            {/* <div className="flex-none mt-3 mr-3">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div> */}
        </div>
        {/* Avatar */}
        <div className='flex justify-center items-center mt-4 mb-3'>
            <div className='avatar'>
                <div className='w-24 rounded-full'>
                    <Image src={`assets/user.png`} alt={'User Image'}/>
                </div>
            </div>
        </div>
        {/* Username */}
        <div className='text-center text-3xl font-bold'>
            {sessionData?.user?.name? `${sessionData.user.name}` : 'User'}
        </div>
        {/* Menu */}
        <div className='ml-6 mt-3'>
            <ul className='menu p-2'>
            <li className="hover-bordered">
                <a className='text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Dashboard
                </a>
            </li>
            <li className="menu-title">
                <span>Data</span>
            </li>
            <li className="hover-bordered">
                <a className='text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Team
                </a>
            </li>
            </ul>
        </div>
    </div>
  );
};