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

interface State {
  changes: any[]; // TODO: add shared Change type
}

interface Action {
  type: string; // TODO: enumerate possible actions
  payload?: unknown; // TODO: use shared Change type
}

function liveRegionChangesReducer(state: State, action: Action) {
  switch (action.type) {
    case "add_change":
      return {
        ...state,
        changes: [...state.changes, action.payload],
      };
    case "clear":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const Panel: React.FC<PanelProps> = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  // const [results, setState] = useAddonState(ADDON_ID, INITIAL_STATE);

  const [ariaLiveRegionChanges, dispatchAriaLiveRegionCange] = React.useReducer(
    liveRegionChangesReducer,
    INITIAL_STATE
  );

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [STORY_CHANGED]: () => dispatchAriaLiveRegionCange({ type: "clear" }),
    [EVENTS.ADD_CHANGE]: (change) =>
      dispatchAriaLiveRegionCange({ type: "add_change", payload: change }),
  });

  return (
    <AddonPanel {...props}>
      <PanelContent results={ariaLiveRegionChanges} />
    </AddonPanel>
  );
};
