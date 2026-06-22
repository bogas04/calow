import React from "react";
import {
  BiCheck,
  BiChevronDown,
  BiChevronUp,
  BiCopy,
  BiEdit,
  BiInfoCircle,
  BiLink,
  BiPlus,
  BiRepeat,
  BiTrash,
  BiX,
} from "react-icons/bi";
import { Box, type BoxProps } from "./ui";

function wrap(Icon: React.ComponentType<any>) {
  return function WrappedIcon(props: BoxProps) {
    return (
      <Box as="span" {...props} display="inline-flex" alignItems="center">
        <Icon />
      </Box>
    );
  };
}

export const AddIcon = wrap(BiPlus);
export const CheckIcon = wrap(BiCheck);
export const ChevronDownIcon = wrap(BiChevronDown);
export const ChevronUpIcon = wrap(BiChevronUp);
export const CloseIcon = wrap(BiX);
export const CopyIcon = wrap(BiCopy);
export const DeleteIcon = wrap(BiTrash);
export const EditIcon = wrap(BiEdit);
export const InfoIcon = wrap(BiInfoCircle);
export const LinkIcon = wrap(BiLink);
export const RepeatClockIcon = wrap(BiRepeat);
