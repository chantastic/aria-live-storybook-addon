import * as React from "react";
import { StoryFn as StoryFunction, useChannel } from "@storybook/addons";
import { EVENTS } from "./constants";

export type Assertiveness = "polite" | "assertive";
export interface ChangeOptions {
  text: string;
  assertiveness: Assertiveness; // TODO: remove duplication in withRoundTrip.js
}

function createChange(options: ChangeOptions) {
  let now = new Date();
  let time = now.toLocaleDateString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return { ...options, time };
}

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
function isElement(node: Node): node is Element {
  return node && node.nodeType === 1;
}

export const withRoundTrip = (storyFn: StoryFunction) => {
  const emit = useChannel({});

  React.useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        let assertiveness = isElement(mutation.target)
          ? (mutation.target.getAttribute("aria-live") as Assertiveness)
          : null;

        if (mutation.type !== "childList") return;

        if (mutation.addedNodes.length && assertiveness) {
          emit(
            EVENTS.ADD_CHANGE,
            createChange({ text: mutation.target.textContent, assertiveness })
          );
        }
      }
    });

    let politeAriaLiveRegion = document.querySelector("[aria-live='polite']");
    let assertiveAriaLiveRegion = document.querySelector(
      "[aria-live='assertive']"
    );

    if (politeAriaLiveRegion) {
      observer.observe(politeAriaLiveRegion, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }
    if (assertiveAriaLiveRegion) {
      observer.observe(assertiveAriaLiveRegion, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  });

  return storyFn();
};
