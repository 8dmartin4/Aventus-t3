import { SimpleGrid, Stack } from "@mantine/core";
import type { ReactNode } from "react";

const StackOrSimpleGrid = ({
  cols,
  children,
  //destructure any props that are not cols or children
  ...props
}: {
  cols?: number;
  children: ReactNode;
  //allow any other props to be passed through
  [x: string]: any;
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const Layout = isMobile ? Stack : SimpleGrid;

  return (
    <Layout
      {...(!isMobile &&
        cols && {
          cols,
        })}
      {...props}
    >
      {children}
    </Layout>
  );
};

export default StackOrSimpleGrid;
