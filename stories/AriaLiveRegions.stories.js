import React from "react";
import { useAriaLive, PoliteAriaLive } from "use-aria-live";

function Subject(props) {
  let [politeAnnouncement, announcePolitely] = useAriaLive();

  return (
    <>
      <button type="button" onClick={() => announcePolitely("Item added")}>
        Announce "Item added", politely.
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
        <pre>debug: {JSON.stringify(politeAnnouncement)}</pre>
      </div>

      <PoliteAriaLive>{politeAnnouncement}</PoliteAriaLive>
    </>
  );
}

export default {
  title: "AriaLiveRegion",
  component: Subject,
};

const Template = (args) => <Subject {...args} />;

export const Simple = Template.bind({});
Simple.args = {};

// export const SmallAppSetup = Template.bind({});
// SmallAppSetup.args = {};

// export const LargeAppSetup = Template.bind({});
// LargeAppSetup.args = {};
