import { Container as MantineContainer, Grid } from "@mantine/core";
import type { ReactNode } from "react";

const StackOrGrid = ({
  span,
  children,
  //destructure any props that are not cols or children
  ...props
}: {
  span?: number;
  children: ReactNode;
  //allow any other props to be passed through
  [x: string]: any;
}) => {
  const isTablet = typeof window !== "undefined" && window.innerWidth < 1366;
  const Container = isTablet ? MantineContainer : Grid.Col;

  return (
    <Container
      {...(!isTablet &&
        span && {
          span: span,
        })}
    >
      {children}
    </Container>
  );
};

export default StackOrGrid;
