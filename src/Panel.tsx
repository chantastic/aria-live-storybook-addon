import React from "react";
import { useAddonState, useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { STORY_CHANGED } from "@storybook/core-events";

interface PanelProps {
  active: boolean;
}

const INITIAL_STATE = {
  changes: [], // TODO: add typing
};

export const Panel: React.FC<PanelProps> = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, INITIAL_STATE);

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [STORY_CHANGED]: () => setState(INITIAL_STATE),
    [EVENTS.ADD_CHANGE]: (change) => setState({ changes: [change] }),
  });

  return (
    <AddonPanel {...props}>
      <PanelContent results={results} />
    </AddonPanel>
  );
};
