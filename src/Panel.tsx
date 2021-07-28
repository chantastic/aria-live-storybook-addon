import React from "react";
import { useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { STORY_CHANGED } from "@storybook/core-events";

interface PanelProps {
  active: boolean;
}

const INITIAL_STATE = {
  // @ts-ignore
  // TODO: add typing
  changes: [],
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
