import React from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Button } from "@storybook/components";
import { List } from "./List";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

type Results = {
  changes: any[];
};

interface PanelContentProps {
  results: Results;
}

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent: React.FC<PanelContentProps> = ({ results }) => {
  const politeChanges = results.changes.filter(
    (change) => change.assertiveness === "polite"
  );

  const assertiveChanges = results.changes.filter(
    (change) => change.assertiveness === "assertive"
  );

  return (
    <TabsState
      initial="polite"
      backgroundColor={convert(themes.normal).background.hoverable}
    >
      <div
        id="polite"
        title={`${politeChanges.length} Polite`}
        color={convert(themes.normal).color.warning}
      >
        <List items={politeChanges} />
      </div>
      <div
        id="assertive"
        title={`${assertiveChanges.length} Assertive`}
        color={convert(themes.normal).color.negative}
      >
        <List items={assertiveChanges} />
      </div>
    </TabsState>
  );
};
