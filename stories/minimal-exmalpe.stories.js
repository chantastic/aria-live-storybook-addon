import MinimalExample from "./minimal-example";

import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

export default {
  title: "ARIA live regions/Minimal Example",
  component: MinimalExample,
};

function clickAction(assertiveness = "polite") {
  return userEvent.click(
    screen.getByText(
      `Announce "Item added, ${
        assertiveness === "assertive" ? "assertively" : "politely"
      }".`
    )
  );
}

export const Default = {};

export const SinglePoliteAnnouncement = {
  ...Default,
  play: () => clickAction(),
};

export const SingleAssertiveAnnouncement = {
  ...Default,
  play: () => clickAction("assertive"),
};

export const MixedAnnouncements = {
  ...Default,
  play: () => {
    clickAction();
    clickAction("assertive");
  },
};
