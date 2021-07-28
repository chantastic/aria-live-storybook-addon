# Aria Live Storybook Addon

Debugging [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) is cumbersome. Validating that live regions are connected should be easy, automatic, and available right in the story.

## Getting started

First, install the addon.

```bash
$ yarn add aria-live-storybook-addon
```

Add this line to your main.js file (create this file inside your Storybook config directory if needed).

```bash
module.exports = {
  addons: ['aria-live-storybook-addon'],
};
```

Once installed, you'll have a new Panel: `Aria Live Regions`.

This panel will observe changes to `aria-live=polite` and `aria-live=assertive` elements in your story.

## Examples

Implementation examples can be found in [Storybook](https://www.w3.org/TR/WCAG20-TECHS/ARIA19.html) on [Chromatic](https://www.chromatic.com/library?appId=6101739561d37e00498163d5).

## Limitations

This addon only acklowedges the first `aria-live` element of types `polite` and `assertive` in a story.

In practice, an application should only have one `aria-live` announcer per type.

## FAQ

### Why aren't subsequent events showing?

When using UI libraries like React, browsers like Chrome and Firefox might not observe text changes, only additions. This is true of this addon as well as the screen reader experience.

To ensure that users of assistive technologies are able to observe changes, be sure to clear the content of `aria-live` elements.

If you are looking for implementation strategies, consider [this implementation using React Hooks](https://github.com/chantastic/use-aria-live/blob/main/src/index.js).

## Additional resources

- [Storybook](https://chan.dev/aria-live-storybook-addon)
- [Chromatic](https://www.chromatic.com/library?appId=6101739561d37e00498163d5)
- [use-aria-live](https://www.npmjs.com/package/use-aria-live)
- [ARIA live regions documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [WCAG ARIA role=alert guidance](https://www.w3.org/TR/WCAG20-TECHS/ARIA19.html)
