## Plan: Migrate Chakra UI to Tailwind + shadcn/ui

This plan involves initial infrastructure setup followed by an incremental replacement of components, starting with layout primitives and ending with complex overlays.

### Steps

1. **Initialize shadcn/ui and Theme Infrastructure**

   - Install `lucide-react` and shadcn/ui base dependencies.
   - Update [tailwind.config.js](tailwind.config.js) with shadcn variables and Chakra-inspired color palettes (e.g., `teal.500` as primary) to maintain the current visual identity.
   - Replace `ChakraProvider` in [src/pages/_app.tsx](src/pages/_app.tsx) and `ColorModeScript` in [src/pages/_document.tsx](src/pages/_document.tsx) with a standard layout wrapper. Use Tailwind CSS variables in [src/global.css](src/global.css) for theming.

2. **Replace Layout and Typography Primitives**

   - Convert `Box`, `Flex`, `Grid`, `Center`, and `Stack` to standard `div` elements with Tailwind utility classes in core files like [src/components/layouts.tsx](src/components/layouts.tsx).
   - Map `Heading` and `Text` to semantic HTML (`h1-h6`, `p`, `span`) with corresponding Tailwind typography sizing and weights.

3. **Migrate Leaf Components and Icons**

   - Implement shadcn `Button`, `Badge`, and `Input` components.
   - Replace Chakra `Button`, `IconButton`, and `Input` across the codebase, ensuring `colorScheme="teal"` is mapped to the new primary Tailwind color.
   - Swap `@chakra-ui/icons` and `react-icons` for `lucide-react` icons to achieve a consistent design language.

4. **Migrate Overlays and Complex Form Elements**

   - Integrate shadcn `Dialog` (for Modals), `Select`, `RadioGroup`, `Slider`, and `Toast`.
   - Refactor complex components like [src/components/ShareMealModal.tsx](src/components/ShareMealModal.tsx) and [src/components/BodyMetricsForm.tsx](src/components/BodyMetricsForm.tsx) to use these new primitives while preserving existing logic.

5. **Final Cleanup and Regression Testing**
   - Scan for any remaining `@chakra-ui` imports using search tools and remove them.
   - Uninstall Chakra-related packages (`@chakra-ui/react`, `@chakra-ui/icons`, `@emotion/react`, `@emotion/styled`) and delete [src/theme.tsx](src/theme.tsx).

### Further Considerations

1. **Spacing/Sizing Mapping**: Chakra uses a numeric scale (e.g., `4` = `1rem`) that matches Tailwind's default scale, making the transition of margins and paddings relatively straightforward.
2. **Global CSS**: The height constraints for `html` and `body` currently defined in [src/theme.tsx](src/theme.tsx) must be moved to [src/global.css](src/global.css) to prevent layout shifts.
3. **Accessibility**: shadcn/ui (via Radix UI) handles accessibility well, but we should verify that custom `aria-label` attributes on `IconButton` are correctly ported.
