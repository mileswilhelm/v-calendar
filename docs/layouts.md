---
title: 'Layouts'
sidebarDepth: 2
---

<!-- ## Layouts -->

## Full Width

To expand the component to the full width of its container, set the `is-expanded` prop.

<guide-readme-cal-expanded />

```html
<v-calendar is-expanded />
```

## Title Positioning

To make the title header left or right aligned, use the `title-position` prop.

### Left Aligned

<guide-readme-cal-title-position title-position="left" />

```html
<v-calendar title-position="left" />
```

### Right Aligned

<guide-readme-cal-title-position title-position="right" />

```html
<v-calendar title-position="right" />
```

## Multiple Rows & Columns

Use the `rows` and `columns` props to create multi-row and multi-column static layouts.

<guide-readme-cal-rows-columns />

```html
<v-calendar :rows="2" />
```

## Responsive Layouts

V-Calendar allows you build responsive designs for multiple screen sizes.

The basic approach can be described in two steps:

1. Specify a few screen sizes to monitor by providing a set of breakpoints (`sm`, `md`, `lg` and `xl`). [The screen size names and dimensions are configurable](#screen-sizes).

2. Call the `$screens` function to assign props or create computed properties based on the current screen size. This function automatically re-evaluates behind the scenes any time the window crosses a breakpoint border.

V-Calendar takes a mobile-first approach, where each screen represents a minimum viewport width. Any values you assign at smaller screen sizes are also applied to larger sizes, unless explicity overridden.

For example, suppose we wish to display a single column on mobile. Then, at the large size, we wish to expand the calendar to two columns.

<guide-readme-cal-responsive />

```html
<v-calendar :columns="$screens({ default: 1, lg: 2 })" />
```

When calling the `$screens` function to target multiple screens, pass an object to specify the screen-to-value relationships with target screen sizes as the key. Use the `default` key to target the default mobile layout.

Alternatively, we can pass the default value as a second parameter to the `$screens` function.

```html
<!--Same as before, just passing default value as second parameter-->
<v-calendar :columns="$screens({ lg: 2 }, 1)" />
```

Let's add to the previous example so that a new row is added for large screens. Also, we would also like to expand the pane width to fill its container on mobile when only one column and row is displayed.

<guide-readme-cal-responsive-expanded />

```html
<v-calendar
  :columns="$screens({ default: 1, lg: 2 })"
  :rows="$screens({ default: 1, lg: 2 })"
  :is-expanded="$screens({ default: true, lg: false })"
  />
```

We could rework the previous example to make it a bit more intuitive by creating a comprehensive `layout` computed property that just calls the `$screens` function once.

```html
<v-calendar
  :columns="layout.columns"
  :rows="layout.rows"
  :is-expanded="layout.isExpanded"
  />
```

```js
export default {
  computed: {
    layout() {
      return this.$screens(
        {
          // Default layout for mobile
          default: {
            columns: 1,
            rows: 1,
            isExpanded: true,
          },
          // Override for large screens
          lg: {
            columns: 2,
            rows: 2,
            isExpanded: false,
          },
        },
      );
    }
  }
}
```

:::tip
The `$screens` function is included as a lightweight mixin for all components when using V-Calendar. You can use it to make any of your props or computed properties responsive in any of your own components.
:::

### Screen Sizes

There are 4 screen sizes provided by default:
```js
{
  "sm": "640px",  // (min-width: 640px)
  "md": "768px",  // (min-width: 768px)
  "lg": "1024px", // (min-width: 1024px)
  "xl": "1280px"  // (min-width: 1280px)
}
```

You may use any number of custom named screens. Just pass the your own custom `screens` object as part of the defaults when using VCalendar.

```js
import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
  // ...some defaults
  screens: {
    tablet: '576px',
    laptop: '992px',
    desktop: '1200px',
  },
  // ...other defaults
})
```

Then, reference your custom screens when calling the `$screens` function.

```html
<v-calendar
  :columns="$screens({ default: 1, laptop: 2 })"
  />
```