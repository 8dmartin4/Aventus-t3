import { useSession, signOut, signIn } from "next-auth/react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
  Avatar,
  Divider,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconLogin,
  IconLogout,
  IconHome,
  IconNews,
  IconForms,
  IconLock,
} from "@tabler/icons-react";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const linkData = [
    { icon: IconHome, label: "/", tooltip: "Home" },
    { icon: IconNews, label: "/newsfeed", tooltip: "Newsfeed" },
    ...(session && session.user?.role
      ? session.user.role.includes("ADMIN")
        ? [
            {
              icon: IconCalendarEvent,
              label: "/events",
              tooltip:
                session &&
                session.user?.role &&
                session.user.role.includes("ADMIN")
                  ? "Edit Events"
                  : "Events",
            },
            {
              icon: IconForms,
              label: "/staffapplication",
              tooltip: "Staff Application Form",
            },
            {
              icon: IconLock,
              label: "/admin",
              tooltip: "Admin Panel",
            },
          ]
        : [
            {
              icon: IconForms,
              label: "/staffapplication",
              tooltip: "Staff Application Form",
            },
          ]
      : []),
  ];

  const links = linkData.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={
        link.label.length === 1
          ? router.pathname === link.label
          : router.pathname.includes(link.label)
      }
      onClick={() => {
        void router.push(link.label);
      }}
    />
  ));

  return (
    <Navbar height="100vh" width={{ base: 100 }} p="xl">
      <Center>AVENTUS</Center>
      <Center mt={20}>
        <Avatar
          size="lg"
          radius="md"
          src={session?.user?.image}
          alt="user avatar"
        />
      </Center>
      <Center mt={15}>{session?.user?.name || "Guest"}</Center>
      <Divider my="lg" size="md" />
      <Navbar.Section grow mt={10}>
        <Stack justify="center" spacing={10}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={10}>
          {session ? (
            <NavbarLink
              icon={IconLogout}
              label="Logout"
              tooltip="Log Out"
              onClick={() => void signOut()}
            />
          ) : (
            <NavbarLink
              icon={IconLogin}
              label="Login"
              tooltip="Log In"
              onClick={() => void signIn()}
            />
          )}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};
