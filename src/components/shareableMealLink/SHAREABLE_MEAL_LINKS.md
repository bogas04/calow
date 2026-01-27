# Shareable Meal Links

Calow uses a versioned system to encode meal data into URLs for sharing. This document explains the evolution and implementation of these formats.

## Current Version (V3)

The goal of V3 is to provide a **human-readable** format that is safe from third-party app formatting (like WhatsApp `_italics_` or `*bold*`).

### Encoding

- **Base Format**: Uses the same minimized keys as V2.
- **Structure**:
  - **Objects**: Wrapped in `{` and `}`.
  - **Arrays**: Wrapped in `[` and `]`.
  - **Key-Value Separator**: `:`.
  - **Item Separator**: `;`.
  - **Spaces**: Replaced with `.` for readability.
- **Safety**: 
  - Entire payload is `encodeURIComponent`'ed to ensure stability.
  - Formatting triggers like `_`, `*`, `~` are hex-escaped (e.g., `-2A`) inside strings.
  - Manual escaping for `(` and `)` is applied to prevent chat apps from breaking links prematurely.
- **Prefix**: The query parameter `m` starts with `3`.
- **Unicode**: Full support for emojis.

### Comparison

For a typical comprehensive meal:

- **V1**: ~1050 chars
- **V2**: ~800 chars
- **V3**: ~360 chars (**~65% reduction from V1**)

---

## Evolution of Formats

### V1: Plain JSON

- **Query Param**: `shared_meal`
- **Format**: `encodeURIComponent(JSON.stringify(meal))`
- **Pros**: Simple, easy to debug.
- **Cons**: Very long URLs. Browsers often truncate URLs over 2000 chars.

### V2: Key Obfuscation

- **Query Param**: `m`
- **Format**: JSON with shortened keys (e.g., `calories` -> `j`, `protein` -> `p`).
- **Pros**: Shorter than V1.
- **Cons**: Still uses JSON syntax (`{`, `"`, `:`) which gets escaped into noisy sequences like `%7B`, `%22`, `%3A`.

### V3: Human Readable & Safe (Active)

- **Query Param**: `m` (prefixed with `3`)
- **Format**: Readable grammar using `{ } [ ] : ;`.
- **Pros**: Human-readable, safe from formatting, supports emojis.
- **Cons**: Requires a custom parser.

---

## Implementation Details

The implementation is located in [src/components/shareableMealLink/shareableMealLink.ts](shareableMealLink.ts).

### Key Map

Both V2 and V3 use a shared key map to minimize field names:

| Original Field  | Short Key |
| :-------------- | :-------- |
| `calories`      | `j`       |
| `carbohydrates` | `c`       |
| `protein`       | `p`       |
| `fat`           | `f`       |
| `items`         | `i`       |
| `nutrition`     | `n`       |
| `name`          | `nm`      |

### Compression

If a meal is too large even for V3 (approaching 2000 chars), the system automatically "compresses" it by merging all items into a single summary item before encoding.
