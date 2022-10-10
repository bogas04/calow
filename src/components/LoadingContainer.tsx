import { Box, BoxProps } from "@chakra-ui/react";
import React, { memo } from "react";

// TODO: Figure out how to accept `as` prop while keeping TypeScript happy
export interface LoadingContainerProps extends BoxProps {
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
}

export const LoadingContainer = memo(function LoadingConatiner(props: LoadingContainerProps) {
  const { children, isLoading, loadingText = "Updating...", ...rest } = props;

  const afterStyle = {
    content: isLoading ? `"${loadingText}"` : '""',
    zIndex: isLoading ? 1 : -1,
    position: "absolute",
    inset: 0,
    paddingTop: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontSize: "xl",
    fontWeight: "bold",
  };

  return (
    <Box position="relative" _after={afterStyle} {...rest}>
      <Box opacity={isLoading ? "0.2" : "1"}>{children}</Box>
    </Box>
  );
});
