import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem, Avatar, Divider } from '@mantine/core';
import { IconUser, IconCalendarEvent, IconLogout, IconHome } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  tooltip: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, tooltip, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={tooltip} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton 
        onClick={onClick} 
        className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome, label: '/', tooltip: 'Home' },
  { icon: IconUser, label: 'profile', tooltip: 'Profile' },
  { icon: IconCalendarEvent, label: 'eventcalendar', tooltip: 'Event Calendar' },
]


export const Sidebar = () => {
  const [active, setActive] = useState(2);
  const { data: session } = useSession();
  const router = useRouter();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        void
        router.push(link.label)
        setActive(index)
      }}
    />
  ));
  
  return (
    <Navbar height="100vh" width={{ base: 100 }} p="xl">
      <Center>
        AVENTUS
      </Center>
      <Center mt={20}> 
        <Avatar size="lg" radius="md" src={ session?.user?.image } alt="user avatar"/>
      </Center>
      <Center mt={15}>
        { session?.user?.name }
      </Center>
      <Divider my="lg" size="md" />
      <Navbar.Section grow mt={10}>
        <Stack justify="center" spacing={10}>
          { links }
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={10}>
          <NavbarLink icon={ IconLogout } label="Logout" tooltip="Log Out" onClick={() => void signOut()} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};