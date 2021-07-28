import * as React from "react";
import { StoryFn as StoryFunction, useChannel } from "@storybook/addons";
import { EVENTS } from "./constants";

interface ChangeOptions {
  text: string;
  assertiveness: "polite" | "assertive"; // TODO: remove duplication in withRoundTrip.js
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

export const withRoundTrip = (storyFn: StoryFunction) => {
  const emit = useChannel({});

  React.useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        let assertiveness = mutation.target?.getAttribute("aria-live"); // use TS appropriate way to gather attribute

        if (mutation.type !== "childList") return;

        if (mutation.addedNodes.length) {
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
