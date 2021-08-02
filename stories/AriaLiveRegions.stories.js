import React from "react";
import { useAriaLive, PoliteAriaLive, AssertiveAriaLive } from "use-aria-live";

function Subject(props) {
  let [politeAnnouncement, announcePolitely] = useAriaLive();
  let [assertiveAnnouncement, announceAssertively] = useAriaLive();
  return (
    <>
      <p>
        The buttons below create messages that are only visible to users of
        assitive technologies like screen readers.
      </p>
      <p>
        Open the <strong>Aria Live Regions</strong> Panel tab to see announced
        text.
      </p>

      <button
        type="button"
        onClick={() => announcePolitely("Item added, politely")}
      >
        Announce "Item added, politely".
      </button>
      <br />
      <button
        type="button"
        onClick={() => announceAssertively("Item added, assertively")}
      >
        Announce "Item added, assertively".
      </button>

      <div
        style={{
          marginTop: "2rem",
          backgroundColor: "#eee",
          padding: "1rem",
          borderRadius: ".25rem",
        }}
      >
        See the current state of the announced value for debugging:
        <pre>Polite: {politeAnnouncement}</pre>
        <pre>Assertive: {assertiveAnnouncement}</pre>
      </div>

      <PoliteAriaLive>{politeAnnouncement}</PoliteAriaLive>
      <AssertiveAriaLive>{assertiveAnnouncement}</AssertiveAriaLive>
    </>
  );
}

export default {
  title: "AriaLiveRegion",
  component: Subject,
};
export const Simple = {
  args: {},
};
export const SmallAppSetup = {
  args: {},
};
