import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as SliderPrimitive from "@radix-ui/react-slider";
import React, {
  createContext,
  forwardRef,
  useState,
  useCallback,
  useContext,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { showAlert } from "./appDialogController";

type StyleValue = string | number | undefined | null | boolean;
type ResponsiveValue = StyleValue | StyleValue[];
export type ChakraProps = Record<string, any>;
export type BoxProps = ChakraProps & { children?: ReactNode };
export type IconButtonProps = ChakraProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ModalProps = { isOpen: boolean; onClose(): void } & Record<string, any>;

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => { finished: Promise<void> };
  }
}

const colorMap: Record<string, string> = {
  "gray.50": "#F7FAFC",
  "gray.100": "#EDF2F7",
  "gray.200": "#E2E8F0",
  "gray.300": "#CBD5E0",
  "gray.400": "#A0AEC0",
  "gray.500": "#718096",
  "gray.600": "#4A5568",
  "gray.700": "#2D3748",
  "gray.800": "#1A202C",
  "red.100": "#FED7D7",
  "red.400": "#F56565",
  "red.500": "#E53E3E",
  "red.600": "#C53030",
  "red.700": "#9B2C2C",
  "green.50": "#F0FFF4",
  "green.100": "#C6F6D5",
  "green.400": "#48BB78",
  "green.500": "#38A169",
  "green.600": "#2F855A",
  "blue.50": "#ebf8ff",
  "blue.100": "#bee3f8",
  "blue.400": "#4299e1",
  "blue.500": "#3182ce",
  "blue.600": "#2b6cb0",
  "purple.400": "#9F7AEA",
  "teal.300": "#4FD1C5",
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
};

const shadowMap: Record<string, string> = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
};

const radiusMap: Record<string, string> = {
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

const fontSizeMap: Record<string, string> = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
};

const stylePropMap: Record<string, string> = {
  align: "alignItems",
  alignItems: "alignItems",
  autoColumns: "gridAutoColumns",
  autoFlow: "gridAutoFlow",
  bg: "backgroundColor",
  border: "border",
  borderBottom: "borderBottom",
  borderBottomColor: "borderBottomColor",
  borderBottomWidth: "borderBottomWidth",
  borderColor: "borderColor",
  borderRadius: "borderRadius",
  borderRightColor: "borderRightColor",
  borderRightWidth: "borderRightWidth",
  borderStyle: "borderStyle",
  borderTop: "borderTop",
  borderTopColor: "borderTopColor",
  borderTopWidth: "borderTopWidth",
  borderWidth: "borderWidth",
  bottom: "bottom",
  boxShadow: "boxShadow",
  color: "color",
  cursor: "cursor",
  direction: "flexDirection",
  display: "display",
  flex: "flex",
  flexDir: "flexDirection",
  flexDirection: "flexDirection",
  flexShrink: "flexShrink",
  flexWrap: "flexWrap",
  fontSize: "fontSize",
  fontWeight: "fontWeight",
  gap: "gap",
  gridGap: "gap",
  gridTemplateColumns: "gridTemplateColumns",
  h: "height",
  height: "height",
  justify: "justifyContent",
  justifyContent: "justifyContent",
  justifySelf: "justifySelf",
  left: "left",
  lineHeight: "lineHeight",
  listStyleType: "listStyleType",
  maxH: "maxHeight",
  maxW: "maxWidth",
  minH: "minHeight",
  minW: "minWidth",
  objectFit: "objectFit",
  opacity: "opacity",
  overflow: "overflow",
  overflowX: "overflowX",
  overflowY: "overflowY",
  pos: "position",
  position: "position",
  right: "right",
  rounded: "borderRadius",
  textAlign: "textAlign",
  textDecoration: "textDecoration",
  textTransform: "textTransform",
  top: "top",
  transform: "transform",
  transformOrigin: "transformOrigin",
  userSelect: "userSelect",
  w: "width",
  whiteSpace: "whiteSpace",
  width: "width",
  zIndex: "zIndex",
};

const spacingProps: Record<string, string[]> = {
  m: ["margin"],
  mb: ["marginBottom"],
  ml: ["marginLeft"],
  mr: ["marginRight"],
  mt: ["marginTop"],
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
  p: ["padding"],
  pb: ["paddingBottom"],
  pl: ["paddingLeft"],
  pr: ["paddingRight"],
  pt: ["paddingTop"],
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
};

const ignoredProps = new Set([
  "_active",
  "_focus",
  "_hover",
  "colorScheme",
  "icon",
  "isCentered",
  "isDisabled",
  "isExternal",
  "isLoading",
  "isRequired",
  "isRound",
  "loadingText",
  "motionPreset",
  "rightIcon",
  "scrollBehavior",
  "size",
  "spacing",
  "templateColumns",
  "variant",
]);

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function withViewTransition(callback: () => void) {
  if (typeof document === "undefined" || typeof document.startViewTransition !== "function") {
    callback();
    return;
  }

  try {
    document.startViewTransition(() => {
      flushSync(callback);
    });
  } catch {
    callback();
  }
}

function responsive(value: ResponsiveValue) {
  return Array.isArray(value) ? value.find((x) => x !== undefined && x !== null) : value;
}

function resolveColor(value: StyleValue) {
  return typeof value === "string" ? colorMap[value] || value : value;
}

function resolveLength(value: StyleValue) {
  if (typeof value === "number") return `${value * 0.25}rem`;
  if (typeof value !== "string") return value as any;
  if (value === "full") return "100%";
  if (value === "auto") return "auto";
  if (value in radiusMap) return radiusMap[value];
  if (/^-?\d+(\.\d+)?$/.test(value)) return `${Number(value) * 0.25}rem`;
  return value;
}

function resolveFontSize(value: StyleValue) {
  if (typeof value === "number") return `${value}px`;
  if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) return `${Number(value)}px`;
  return value;
}

function resolveStyleValue(prop: string, raw: ResponsiveValue) {
  const value = responsive(raw);
  if (value === undefined || value === null || typeof value === "boolean") return undefined;
  if (prop.toLowerCase().includes("color") || prop === "backgroundColor") return resolveColor(value);
  if (prop === "boxShadow") return typeof value === "string" ? shadowMap[value] || value : value;
  if (prop === "fontSize") return typeof value === "string" ? fontSizeMap[value] || resolveFontSize(value) : resolveFontSize(value);
  if (prop === "borderRadius") return typeof value === "string" ? radiusMap[value] || resolveLength(value) : `${value}px`;
  if (prop.toLowerCase().includes("width") || prop.toLowerCase().includes("height")) return resolveLength(value);
  if (["gap", "margin", "padding", "top", "right", "bottom", "left"].some((x) => prop.includes(x))) {
    return resolveLength(value);
  }
  if (prop.includes("border") && (typeof value === "number" || /^\d+$/.test(String(value)))) return `${value}px`;
  return value as any;
}

function responsiveClass(prop: string, raw: ResponsiveValue) {
  if (!Array.isArray(raw)) return "";
  const [, md] = raw;
  if (md === undefined || md === null) return "";
  const direction = prop === "direction" || prop === "flexDir" || prop === "flexDirection";
  if (direction && md === "row") return "md:flex-row";
  if (direction && md === "column") return "md:flex-col";
  if (prop === "borderRightWidth" && Number(md) > 0) return "md:border-r";
  return "";
}

function splitProps(props: ChakraProps) {
  const {
    as,
    className,
    style,
    templateColumns,
    isDisabled,
    isRequired,
    isExternal,
    spacing,
    children,
    ...rest
  } = props;
  const computed: CSSProperties = { ...(style || {}) };
  const pass: Record<string, any> = {};
  const classes: string[] = [];

  if (templateColumns) computed.gridTemplateColumns = resolveStyleValue("gridTemplateColumns", templateColumns);
  if (spacing !== undefined) computed.gap = resolveStyleValue("gap", spacing);

  for (const [key, value] of Object.entries(rest)) {
    const responsiveUtility = responsiveClass(key, value as ResponsiveValue);
    if (responsiveUtility) classes.push(responsiveUtility);

    if (key in spacingProps) {
      spacingProps[key].forEach((prop) => {
        (computed as any)[prop] = resolveStyleValue(prop, value as ResponsiveValue);
      });
      continue;
    }

    const styleKey = stylePropMap[key];
    if (styleKey) {
      (computed as any)[styleKey] = resolveStyleValue(styleKey, value as ResponsiveValue);
      continue;
    }

    if (!ignoredProps.has(key)) {
      pass[key === "htmlFor" ? "htmlFor" : key] = key.startsWith("data-") || key.startsWith("aria-") ? value : value;
    }
  }

  if (isDisabled !== undefined) pass.disabled = isDisabled;
  if (isRequired !== undefined) pass.required = isRequired;
  if (isExternal) {
    pass.target = "_blank";
    pass.rel = "noreferrer";
  }

  return { as, children, className: cx(className, ...classes), style: computed, pass };
}

function createPrimitive<T extends HTMLElement>(defaultAs: ElementType, baseClass = "") {
  return forwardRef<T, BoxProps>(function Primitive(props, ref) {
    const { as: Component = defaultAs, children, className, style, pass } = splitProps(props);
    return (
      <Component ref={ref} className={cx(baseClass, className)} style={style} {...pass}>
        {children}
      </Component>
    );
  });
}

export const Box = createPrimitive<HTMLDivElement>("div");
export const Flex = createPrimitive<HTMLDivElement>("div", "flex");
export const Grid = createPrimitive<HTMLDivElement>("div", "grid");
export const Text = createPrimitive<HTMLParagraphElement>("p");
export const Code = createPrimitive<HTMLElement>("code", "font-mono text-sm");
export const UnorderedList = createPrimitive<HTMLUListElement>("ul");
export const ListItem = createPrimitive<HTMLLIElement>("li");
export const Stack = createPrimitive<HTMLDivElement>("div", "flex flex-col");
export const HStack = createPrimitive<HTMLDivElement>("div", "flex flex-row items-center");
export const VStack = createPrimitive<HTMLDivElement>("div", "flex flex-col");

export const Heading = forwardRef<HTMLHeadingElement, BoxProps>(function Heading(props, ref) {
  const { size = "xl", className } = props;
  const classes =
    size === "sm" ? "text-lg font-bold" : size === "md" ? "text-xl font-bold" : "text-2xl font-bold";
  return <Box as="h2" ref={ref} {...props} className={cx(classes, className)} />;
});

export const Link = forwardRef<HTMLAnchorElement, BoxProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  function UILink(props, ref) {
    const { children, className, style, pass } = splitProps(props);
    return (
      <a ref={ref} className={cx("text-blue-600 hover:underline", className)} style={style} {...pass}>
        {children}
      </a>
    );
  }
);

function buttonClasses({ variant, colorScheme, size }: ChakraProps) {
  const scheme = colorScheme || "gray";
  const solid =
    scheme === "green"
      ? "bg-green-500 text-white hover:bg-green-600"
      : scheme === "red"
      ? "bg-red-500 text-white hover:bg-red-600"
      : scheme === "blue"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200";
  const outline =
    scheme === "red"
      ? "border border-red-300 text-red-700 hover:bg-red-50"
      : "border border-gray-300 text-gray-800 hover:bg-gray-50";
  const mode = variant === "ghost" ? "bg-transparent hover:bg-gray-100" : variant === "outline" ? outline : solid;
  const sizing = size === "sm" ? "min-h-8 px-3 py-1 text-sm" : "min-h-10 px-4 py-2";
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
    sizing,
    mode
  );
}

export const Button = forwardRef<HTMLButtonElement, ChakraProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function Button(props, ref) {
    const { children, className, icon, rightIcon, isLoading, loadingText, onClick, type = "button" } = props;
    const { style, pass } = splitProps(props);
    return (
      <button
        ref={ref}
        type={type}
        className={cx(buttonClasses(props), className)}
        style={style}
        {...pass}
        onClick={(event) => {
          if (!onClick) return;
          withViewTransition(() => onClick(event));
        }}
      >
        {isLoading ? loadingText || "Loading..." : icon || children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(props, ref) {
  const { icon, className, isRound, onClick, type = "button" } = props;
  const { style, pass } = splitProps(props);
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        "inline-flex items-center justify-center rounded-md p-2 transition hover:bg-gray-100 disabled:opacity-50",
        isRound && "rounded-full",
        className
      )}
      style={style}
      {...pass}
      onClick={(event) => {
        if (!onClick) return;
        withViewTransition(() => onClick(event));
      }}
    >
      {icon || props.children}
    </button>
  );
});

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-green-400 focus:ring-1 focus:ring-green-400 disabled:bg-gray-100 disabled:text-gray-500";

export const Input = forwardRef<HTMLInputElement, ChakraProps & React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    const { className, variant, size } = props;
    const { style, pass } = splitProps(props);
    return (
      <input
        ref={ref}
        className={cx(
          inputClass,
          variant === "flushed" && "rounded-none border-x-0 border-t-0 px-0",
          String(size) === "sm" && "py-1 text-sm",
          className
        )}
        style={style}
        {...pass}
      />
    );
  }
);

export const Textarea = forwardRef<HTMLTextAreaElement, ChakraProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea(props, ref) {
    const { className } = props;
    const { style, pass } = splitProps(props);
    return <textarea ref={ref} className={cx(inputClass, className)} style={style} {...pass} />;
  }
);

export const Select = forwardRef<HTMLSelectElement, ChakraProps & React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select(props, ref) {
    const { className, children, variant, size } = props;
    const { style, pass } = splitProps(props);
    return (
      <select
        ref={ref}
        className={cx(
          inputClass,
          variant === "flushed" && "rounded-none border-x-0 border-t-0 px-0",
          String(size) === "sm" && "py-1 text-sm",
          className
        )}
        style={style}
        {...pass}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {children}
      </select>
    );
  }
);

export const FormControl = createPrimitive<HTMLDivElement>("div");
export const FormLabel = createPrimitive<HTMLLabelElement>("label", "mb-2 block font-medium text-gray-800");
export const FormHelperText = createPrimitive<HTMLParagraphElement>("p", "text-sm text-gray-600");

export function RadioGroup({ children, defaultValue, value, name, onChange, ...props }: ChakraProps) {
  const groupValue = value ?? defaultValue;
  return (
    <Box role="radiogroup" {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as ReactElement<any>, { groupValue, name, onGroupChange: onChange })
          : child
      )}
    </Box>
  );
}

export function Radio({ children, value, groupValue, onGroupChange, name, ...props }: ChakraProps) {
  return (
    <label className="inline-flex items-center gap-2">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={groupValue === value}
        checked={props.checked}
        onChange={(event) => onGroupChange?.(event.currentTarget.value)}
        className="text-green-500 focus:ring-green-400"
      />
      <span>{children}</span>
    </label>
  );
}

export function Collapse({ in: isOpen, children, startingHeight }: ChakraProps) {
  const shouldKeepPreview = !isOpen && startingHeight !== undefined;
  return (
    <CollapsiblePrimitive.Root open={Boolean(isOpen)}>
      <CollapsiblePrimitive.Content
        forceMount={shouldKeepPreview || undefined}
        className={cx(
          "overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
          !shouldKeepPreview && "data-[state=closed]:hidden"
        )}
        style={shouldKeepPreview ? { maxHeight: resolveLength(startingHeight), overflow: "hidden" } : undefined}
      >
        {children}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}

export function Menu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenuPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        withViewTransition(() => setOpen(nextOpen));
      }}
    >
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuPrimitive.Root>
  );
}

export function MenuButton({ as: Component = Button, children, ...props }: ChakraProps) {
  const trigger = <Component {...props}>{children}</Component>;
  return (
    <DropdownMenuPrimitive.Trigger asChild>
      {trigger}
    </DropdownMenuPrimitive.Trigger>
  );
}

export function MenuList({ children, className, ...props }: ChakraProps) {
  const { style, pass, className: propClassName } = splitProps(props);
  return (
    <DropdownMenuPrimitive.Content
      align="end"
      sideOffset={8}
      {...pass}
      style={style}
      className={cx(
        "view-transition-menu absolute right-0 z-50 mt-2 min-w-40 origin-top-right overflow-hidden rounded-md border border-gray-200 bg-white py-1 text-gray-800 shadow-lg",
        "data-[state=open]:animate-menu-in data-[state=closed]:animate-menu-out",
        className,
        propClassName
      )}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  );
}

export const MenuItem = forwardRef<HTMLDivElement, ChakraProps>(function MenuItem(
  { children, onClick, className, ...props },
  ref
) {
  const { style, pass, className: propClassName } = splitProps(props);
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cx(
        "relative flex cursor-default select-none items-center gap-2 px-3 py-2 text-sm outline-none transition-colors",
        "focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
        propClassName
      )}
      style={style}
      onSelect={(event) => {
        onClick?.(event);
      }}
      {...pass}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
});

const ModalContext = createContext<{ onClose(): void } | null>(null);

export function Modal({ isOpen, onClose, children }: ModalProps & { children: ReactNode }) {
  if (!isOpen) return null;
  return (
    <ModalContext.Provider value={{ onClose }}>
      <div className="fixed inset-0 z-50">{children}</div>
    </ModalContext.Provider>
  );
}

export const ModalOverlay = forwardRef<HTMLDivElement, BoxProps>(function ModalOverlay(props, ref) {
  const modal = useContext(ModalContext);
  return (
    <Box
      ref={ref}
      {...props}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) withViewTransition(() => modal?.onClose());
      }}
      className={cx("view-transition-overlay fixed inset-0 animate-overlay-in bg-black/40", props.className)}
    />
  );
});

export const ModalContent = forwardRef<HTMLDivElement, BoxProps>(function ModalContent(props, ref) {
  return (
    <Box
      ref={ref}
      {...props}
      className={cx(
        "view-transition-sheet relative z-10 mx-auto max-h-screen max-w-lg animate-sheet-in overflow-auto bg-white shadow-xl",
        props.className
      )}
    />
  );
});

export const ModalHeader = createPrimitive<HTMLDivElement>("header", "px-6 pt-6 pb-3 text-lg font-bold");
export const ModalBody = createPrimitive<HTMLDivElement>("div", "px-6 py-3");
export const ModalFooter = createPrimitive<HTMLDivElement>("footer", "flex justify-end gap-2 px-6 py-4");

export function CloseButton(props: ChakraProps) {
  return (
    <IconButton
      {...props}
      aria-label={props["aria-label"] || "Close"}
      icon={<span aria-hidden="true" className="text-xl leading-none">×</span>}
    />
  );
}

export function ModalCloseButton(props: ChakraProps) {
  const modal = useContext(ModalContext);
  return (
    <CloseButton
      {...props}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(event);
        withViewTransition(() => modal?.onClose());
      }}
      className={cx("absolute right-4 top-4", props.className)}
    />
  );
}

export function InputGroup({ children, ...props }: ChakraProps) {
  return (
    <Box {...props} className={cx("flex", props.className)}>
      {children}
    </Box>
  );
}

export function InputRightAddon({ children, ...props }: ChakraProps) {
  return (
    <Box {...props} className={cx("flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50", props.className)}>
      {children}
    </Box>
  );
}

export function Alert({ children, status = "info", className, ...props }: ChakraProps) {
  return (
    <Box
      {...props}
      className={cx(
        "flex gap-3 rounded-md border p-3 text-sm",
        status === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-blue-200 bg-blue-50 text-blue-800",
        className
      )}
    >
      {children}
    </Box>
  );
}

export function AlertIcon() {
  return <span aria-hidden="true">!</span>;
}

export function Skeleton(props: ChakraProps) {
  return <Box {...props} className={cx("animate-pulse rounded bg-gray-200", props.className)} />;
}

export function Tag(props: ChakraProps) {
  return <Box as="span" {...props} className={cx("inline-flex rounded bg-gray-100 px-2 py-1 text-xs font-semibold", props.className)} />;
}

export function Icon({ as: Component, ...props }: ChakraProps) {
  return Component ? <Box as={Component} {...props} /> : null;
}

export function Slider({ children, min = 0, max = 100, value, defaultValue, onChange, isDisabled, step = 1, ...props }: ChakraProps) {
  const current = Number(value ?? defaultValue ?? min);
  const { style, pass, className } = splitProps(props);
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      step={step}
      value={[current]}
      disabled={isDisabled}
      onValueChange={(values) => onChange?.(values[0])}
      className={cx("relative flex w-full touch-none select-none items-center py-3", className)}
      style={style}
      {...pass}
    >
      {children}
    </SliderPrimitive.Root>
  );
}

export function SliderTrack({ children, ...props }: ChakraProps) {
  const { style, pass, className } = splitProps(props);
  return (
    <SliderPrimitive.Track
      className={cx("relative h-2 grow overflow-hidden rounded-full bg-gray-200", className)}
      style={style}
      {...pass}
    >
      {children}
    </SliderPrimitive.Track>
  );
}

export function SliderFilledTrack(props: ChakraProps) {
  const { style, pass, className } = splitProps(props);
  return <SliderPrimitive.Range className={cx("absolute h-full rounded-full bg-green-500", className)} style={style} {...pass} />;
}

export function SliderThumb({ children, boxSize, ...props }: ChakraProps) {
  const { style, pass, className } = splitProps(props);
  return (
    <SliderPrimitive.Thumb
      className={cx(
        "flex items-center justify-center rounded-full bg-white shadow transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={{ width: resolveLength(boxSize) || "1.5rem", height: resolveLength(boxSize) || "1.5rem", ...style }}
      {...pass}
    >
      {children}
    </SliderPrimitive.Thumb>
  );
}

export function ChakraProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ColorModeScript() {
  return null;
}

export function useToast() {
  return useCallback((options: { title?: string; description?: string; [key: string]: any }) => {
    const message = [options.title, options.description].filter(Boolean).join("\n");
    if (message) window.setTimeout(() => showAlert(message), 0);
  }, []);
}
