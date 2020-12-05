import { Box, BoxProps, Heading } from "@chakra-ui/react";

export const Page = ({
  heading,
  children,
  ...props
}: BoxProps & { heading?: React.ReactNode }) => (
  <Box py={["2", "6", "12"]} px={["4", "16", "32"]} {...props}>
    {heading && typeof heading === "string" ? (
      <Heading my="6">{heading}</Heading>
    ) : (
      heading
    )}
    {children}
  </Box>
);
