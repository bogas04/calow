# Shareable Meal Links

Calow uses a versioned system to encode meal data into URLs for sharing. This document explains the evolution and implementation of these formats.

## Current Version (V3)

The goal of V3 is to minimize the "noise" created by standard JSON encoding in URLs (like `{"":}`). It uses a custom grammar that maps naturally to URL-safe characters.

### Encoding Grammar

- **Objects**: Wrapped in `(` and `)`.
- **Arrays**: Wrapped in `!` and `*`.
- **Key-Value Separator**: `~`.
- **Item Separator**: `_`.
- **String Encoding**:
  - Spaces are replaced with `.`.
  - Emojis and non-ASCII characters are stripped for maximum URL compatibility.
  - Special characters are escaped using a dash-hex format (e.g., `&` becomes `-26`).
- **Prefix**: The query parameter `m` starts with `3` to identify the version (e.g., `?m=3(...)`).

### Comparison

For a typical comprehensive meal:

- **V1**: ~1050 chars
- **V2**: ~800 chars
- **V3**: ~350 chars (**~65% reduction from V1**)

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

### V3: Compact Serialization (Active)

- **Query Param**: `m` (prefixed with `3`)
- **Format**: Custom grammar avoiding JSON delimiters.
- **Pros**: Optimal length for URLs, minimal escaping overhead.
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
