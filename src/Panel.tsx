import React from "react";
import { useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";
import StorybookCoreEvents from "@storybook/core-events";
import { ChangeOptions } from "./withRoundTrip";

const { STORY_CHANGED } = StorybookCoreEvents;

interface PanelProps {
  active: boolean;
}

type State = {
  changes: ChangeOptions[];
};

const INITIAL_STATE: State = {
  changes: [],
};

type KnownActions =
  | { type: "add_change"; payload: ChangeOptions }
  | { type: "clear" };

function liveRegionChangesReducer(state: State, action: KnownActions) {
  switch (action.type) {
    case "add_change":
      return {
        ...state,
        changes: [...state.changes, action.payload],
      };
    case "clear":
      return INITIAL_STATE;
    // @ts-expect-error
    case "unknown_type":
      return state;
    default:
      return state;
  }
}

type KnownEventTypes = keyof typeof EVENTS | typeof STORY_CHANGED;
type EventHandlers = Record<
  KnownEventTypes,
  (payload?: ChangeOptions | void) => void
>;

export const Panel: React.FC<PanelProps> = (props) => {
  const [ariaLiveRegionChanges, dispatchAriaLiveRegionCange] = React.useReducer(
    liveRegionChangesReducer,
    INITIAL_STATE
  );

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel

  const handlers: EventHandlers = {
    [STORY_CHANGED]: () => dispatchAriaLiveRegionCange({ type: "clear" }),
    [EVENTS.ADD_CHANGE]: (payload: ChangeOptions) =>
      dispatchAriaLiveRegionCange({ type: "add_change", payload }),
    // @ts-expect-error
    iWillErrorBanana: () => {},
  };

  const emit = useChannel(handlers);

  return (
    <AddonPanel {...props}>
      <PanelContent results={ariaLiveRegionChanges} />
    </AddonPanel>
  );
};
