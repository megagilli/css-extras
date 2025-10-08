# CSS Extras Function Reference

Complete reference for all CSS custom functions in css-extras.

**Total functions:** 36

---

## `--negate()`

Negates a value (returns the negative).

### Parameters

- **`--value`** (`Number`): The value to negate.

### Returns

`Number`: The negated value.

### Example

```css
padding: --negate(1em);
```

---

## `--abs()`

Returns the absolute value of a number.

### Parameters

- **`--value`** (`Number`): The input value.

### Returns

`Number`: The absolute value.

### Example

```css
margin: --abs(-20px);
```

---

## `--lerp()`

Linear interpolation between two values.

### Parameters

- **`--from`** (`Number`): Start value.
- **`--to`** (`Number`): End value.
- **`--progress`** (`Number`): Progress between 0 and 1.

### Returns

`Number`: Interpolated value.

### Example

```css
width: --lerp(100px, 200px, 0.5);
```

---

## `--map-range()`

Maps a value from one range to another.

### Parameters

- **`--value`** (`Number`): Input value.
- **`--in-min`** (`Number`): Input range minimum.
- **`--in-max`** (`Number`): Input range maximum.
- **`--out-min`** (`Number`): Output range minimum.
- **`--out-max`** (`Number`): Output range maximum.

### Returns

`Number`: Mapped value.

### Example

```css
font-size: --map-range(50vw, 320px, 1920px, 14px, 24px);
```

---

## `--ratio()`

Return the ratio of the first value to the second value.

### Parameters

- **`--value`** (`CalcSum`): Input value.
- **`--to-value`** (`CalcSum`): Another input value.

### Returns

`Number`: The ratio between two values.

### Example

```css
scale: --ratio(16px, 1em);
```

---

## `--opacity()`

Returns a semi-transparent version of any color.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--opacity`** (`Number`): Opacity value (0-100% or 0-1).

### Returns

`Color`: Color with opacity.

### Example

```css
background: --opacity(blue, 50%);
```

---

## `--tint()`

Lightens a color by mixing with white.
Uses OKLAB color space for perceptually uniform mixing.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Amount to lighten (0-100%). Default: `10%`

### Returns

`Color`: Lightened color.

### Example

```css
background: --tint(blue, 20%);
```

---

## `--shade()`

Darkens a color by mixing with black.
Uses OKLAB color space for perceptually uniform mixing.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Amount to darken (0-100%). Default: `10%`

### Returns

`Color`: Darkened color.

### Example

```css
background: --shade(blue, 20%);
```

---

## `--saturate()`

Adjusts color saturation.
Uses OKLCH color space for perceptually uniform chroma adjustment. Chroma is clamped to 0.4 for safe display.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Chroma multiplier. Default: `1.2`

### Returns

`Color`: Adjusted color.

### Example

```css
color: --saturate(red, 1.5);
```

---

## `--lighten()`

Adjusts color lightness.
Uses OKLCH color space for perceptually uniform lightness adjustment. Maintains chroma independently.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--amount`** (`Number`): Lightness adjustment (-100% to 100%). Default: `10%`

### Returns

`Color`: Adjusted color.

### Example

```css
background: --lighten(blue, 20%);
```

---

## `--rotate-hue()`

Rotates the hue of a color.
Uses OKLCH color space for perceptually uniform hue rotation.

### Parameters

- **`--color`** (`Color`): The base color.
- **`--degrees`** (`Angle`): Degrees to rotate hue. Default: `30deg`

### Returns

`Color`: Color with rotated hue.

### Example

```css
background: --rotate-hue(blue, 180deg);
```

---

## `--complement()`

Returns the complementary color.
Uses OKLCH color space for perceptually accurate complementary colors.

### Parameters

- **`--color`** (`Color`): The base color.

### Returns

`Color`: Complementary color.

### Example

```css
border-color: --complement(blue);
```

---

## `--invert()`

Inverts a color.

### Parameters

- **`--color`** (`Color`): The color to invert.

### Returns

`Color`: Inverted color.

### Example

```css
background: --invert(white);
```

---

## `--black()`

Creates a semi-transparent black.

### Parameters

- **`--opacity`** (`Number`): Opacity value (0-100% or 0-1). Default: `50%`

### Returns

`Color`: Semi-transparent black.

### Example

```css
box-shadow: 0 2px 4px --black(20%);
```

---

## `--white()`

Creates a semi-transparent white.

### Parameters

- **`--opacity`** (`Number`): Opacity value (0-100% or 0-1). Default: `50%`

### Returns

`Color`: Semi-transparent white.

### Example

```css
background: --white(90%);
```

---

## `--fluid-type()`

Creates fluid typography that scales with viewport.
NOTE: This function is mathematically equivalent to `--responsive-value()` but optimized for typography. Use this for `font-size`, `--responsive-value()` for other properties.

### Parameters

- **`--min`** (`Length`): Minimum font size.
- **`--max`** (`Length`): Maximum font size.
- **`--min-viewport`** (`Length`): Minimum viewport width. Default: `320px`
- **`--max-viewport`** (`Length`): Maximum viewport width. Default: `1280px`

### Returns

`Length`: Fluid font size.

### Example

```css
font-size: --fluid-type(16px, 24px, 320px, 1280px);
```

---

## `--modular-scale()`

Creates a modular scale value.

### Parameters

- **`--base`** (`Number`): Base size. Default: `1rem`
- **`--ratio`** (`Number`): Scale ratio (default: 1.25). Default: `1.25`
- **`--step`** (`Number`): Step in the scale. Default: `0`

### Returns

`Length`: Scaled value.

### Example

```css
font-size: --modular-scale(1rem, 1.25, 3);
```

---

## `--line-height-length()`

Calculates line height as a length value based on font size.
Returns a length (e.g., 24px) rather than a unitless ratio. Use this when you need an absolute line height value.

### Parameters

- **`--font-size`** (`Length`): The font size.
- **`--multiplier`** (`Number`): Line height multiplier. Default: `1.5`

### Returns

`Length`: Line height as a length.

### Example

```css
line-height: --line-height-length(16px, 1.6);
```

---

## `--line-height-ratio()`

Calculates line height as a unitless ratio.
Returns a number (e.g., 1.5) which is recommended for better inheritance in CSS.

### Parameters

- **`--line-height`** (`Length`): The desired line height as a length.
- **`--font-size`** (`Length`): The font size.

### Returns

`Number`: Unitless line height ratio.

### Example

```css
line-height: --line-height-ratio(24px, 16px);
```

---

## `--line-height-unitless()`

Creates unitless line height from font size (recommended for better inheritance).
NOTE: Only works correctly with pixel font sizes. For rem/em values, use `--line-height()` instead.

### Parameters

- **`--font-size`** (`Length`): Font size in pixels. Default: `16px`
- **`--multiplier`** (`Number`): Line height multiplier. Default: `1.5`

### Returns

`Number`: Unitless line height.

### Example

```css
line-height: --line-height-unitless(16px, 1.5);
```

---

## `--sidebar-layout()`

Creates responsive sidebar layout columns.

### Parameters

- **`--sidebar-width`** (`Length`): Width of sidebar. Default: `20ch`
- **`--content-min`** (`Length`): Minimum width of content area. Default: `20ch`

### Returns

`Length`: Grid template columns value.

### Example

```css
grid-template-columns: --sidebar-layout(250px, 20ch);
```

---

## `--conditional-radius()`

Conditional border radius that removes at viewport edges.

### Parameters

- **`--radius`** (`Length`): Border radius value.
- **`--edge-dist`** (`Length`): Distance from viewport edge. Default: `4px`

### Returns

`Length`: Computed border radius.

### Example

```css
border-radius: --conditional-radius(1rem, 8px);
```

---

## `--responsive-value()`

Creates a responsive value that scales between two sizes.
NOTE: This function is mathematically equivalent to `--fluid-type()` but uses a simpler lerp-based approach. Use this for spacing/sizing, `--fluid-type()`for typography.

### Parameters

- **`--small`** (`Length`): Minimum value.
- **`--large`** (`Length`): Maximum value.
- **`--viewport-min`** (`Length`): Minimum viewport width. Default: `320px`
- **`--viewport-max`** (`Length`): Maximum viewport width. Default: `1200px`

### Returns

`Length`: Responsive value.

### Example

```css
padding: --responsive-value(1rem, 2rem, 320px, 1200px);
```

---

## `--aspect-height()`

Calculates height from aspect ratio and maximum constraints.

### Parameters

- **`--ratio`** (`Number`): Aspect ratio (e.g., 16/9). Default: `1`
- **`--max-width`** (`Length`): Maximum width. Default: `100%`
- **`--max-height`** (`Length`): Maximum height. Default: `100%`

### Returns

`Length`: Computed height.

### Example

```css
height: --aspect-height(16/9, 100vw, 100vh);
```

---

## `--spacing()`

Creates consistent spacing based on a scale.
Recommended range: 0-10. Higher values create exponentially larger spacing.

### Parameters

- **`--level`** (`Number`): Spacing level (0-10). Default: `1`
- **`--base`** (`Length`): Base spacing unit. Default: `0.25rem`

### Returns

`Length`: Computed spacing.

### Example

```css
margin: --spacing(3);
```

---

## `--container-padding()`

Creates inset spacing for containers.

### Parameters

- **`--padding`** (`Length`): Base padding. Default: `1rem`
- **`--max-width`** (`Length`): Maximum container width. Default: `1200px`

### Returns

`Length`: Responsive padding.

### Example

```css
padding: --container-padding(2rem, 1200px);
```

---

## `--ease-out()`

Creates a simple easing curve value.

### Parameters

- **`--progress`** (`Number`): Animation progress (0-1).

### Returns

`Number`: Eased value.

### Example

```css
transform: translateY(--ease-out(var(--progress)));
```

---

## `--elastic-ease()`

Creates elastic easing.

### Parameters

- **`--progress`** (`Number`): Animation progress (0-1).
- **`--amplitude`** (`Number`): Amplitude of elasticity. Default: `1`

### Returns

`Number`: Eased value.

### Example

```css
transform: scale(--elastic-ease(var(--progress), 1.2));
```

---

## `--px-to-rem()`

Converts pixels to rem.

### Parameters

- **`--pixels`** (`Length`): Pixel value.
- **`--base`** (`Length`): Base font size. Default: `16px`

### Returns

`Length`: Rem value.

### Example

```css
font-size: --px-to-rem(24px);
```

---

## `--rem-to-px()`

Converts rem to pixels.

### Parameters

- **`--rems`** (`Length`): Rem value.
- **`--base`** (`Length`): Base font size. Default: `16px`

### Returns

`Length`: Pixel value.

### Example

```css
width: --rem-to-px(2rem);
```

---

## `--auto-grid()`

Creates responsive grid columns.

### Parameters

- **`--min-width`** (`Number`): Minimum column width. Default: `250px`
- **`--max-cols`** (`Number`): Maximum number of columns. Default: `4`

### Returns

`Grid`: Grid template columns value.

### Example

```css
grid-template-columns: --auto-grid(250px, 4);
```

---

## `--grid-span()`

Creates a CSS grid span value.
Ensures the span is an integer value.

### Parameters

- **`--columns`** (`Number`): Number of columns to span. Default: `1`
- **`--total`** (`Number`): Total columns in grid. Default: `12`

### Returns

`Span`: Grid column span (rounded to integer).

### Example

```css
grid-column: --grid-span(3, 12);
```

---

## `--smooth-shadow()`

Creates a smooth shadow.
Generates 3 shadow layers. The spread-factor controls how distributed the shadows are.

### Parameters

- **`--color`** (`Color`): Shadow color. Default: `rgb(0 0 0 / 0.2`
- **`--size`** (`Length`): Shadow size.
- **`--spread-factor`** (`Number`): Controls shadow distribution (higher = tighter shadows).

### Returns

`Shadow`: Layered box shadow.

### Example

```css
box-shadow: --smooth-shadow(black, 20px, 3);
```

---

## `--glow()`

Creates a glow effect.

### Parameters

- **`--color`** (`Color`): Glow color. Default: `white`
- **`--size`** (`Length`): Glow size. Default: `10px`
- **`--intensity`** (`Number`): Glow intensity (0-1). Default: `0.5`

### Returns

`Shadow`: Glow shadow.

### Example

```css
box-shadow: --glow(cyan, 10px, 0.5);
```

---

## `--light-dark()`

Theme-aware value switcher for light/dark mode.
Uses CSS `if()` with color-scheme query. Requires `color-scheme: light dark` on `:root`.
Works with ANY value type (colors, lengths, etc.), not just colors.
> [!NOTE]
> CSS has a native [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) function for colors. The custom `--light-dark()` function is more powerful as it works with any value type, not just colors.

### Parameters

- **`--light`** (`Any`): Value for light mode.
- **`--dark`** (`Any`): Value for dark mode.

### Returns

`Any`: Theme-appropriate value.

### Example

```css
padding: --light-dark(0.75rem, 1rem);
```

---

## `--theme-color()`

Creates a theme-aware color with automatic adjustment.
Uses CSS `if()` with color-scheme query. Requires `color-scheme: light dark` on `:root`.
In light mode, mixes the base color with white (default 85% white).
In dark mode, mixes the base color with black (default 15% black).

### Parameters

- **`--base`** (`Color`): Base color.
- **`--light-mix`** (`Number`): Percentage of white to mix in light mode. Default: `85%`
- **`--dark-mix`** (`Number`): Percentage of black to mix in dark mode. Default: `15%`

### Returns

`Color`: Theme-adjusted color.

### Example

```css
background: --theme-color(blue, 80%, 20%);
```

---

