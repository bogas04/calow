import { Box, BoxProps, Heading } from "@chakra-ui/core";

export const Page = ({
  heading,
  children,
  ...props
}: BoxProps & { heading?: string }) => (
  <Box py={["2", "6", "12"]} px={["4", "16", "32"]} {...props}>
    {heading && <Heading my="6">{heading}</Heading>}
    {children}
  </Box>
);
