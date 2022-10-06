import { Box, BoxProps } from "@chakra-ui/react";
import React, { memo } from "react";

// TODO: Figure out how to accept `as` prop while keeping TypeScript happy
export interface LoadingContainerProps extends BoxProps {
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
}

export const LoadingContainer = memo((props: LoadingContainerProps) => {
  const { children, isLoading, loadingText = "Updating...", ...rest } = props;

  const afterStyle = {
    position: "absolute",
    inset: 0,
    content: isLoading ? `"${loadingText}"` : '""',
    paddingTop: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontSize: "xl",
    fontWeight: "bold",
  };

  return (
    <Box position="relative" _after={afterStyle} {...rest}>
      <Box
        opacity={isLoading ? "0.2" : "1"}
        style={{
          contentVisibility: "auto",
          // @ts-expect-error
          containIntrinsicSize: "1000px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
});
