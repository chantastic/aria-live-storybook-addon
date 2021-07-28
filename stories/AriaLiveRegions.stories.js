import React from "react";

function Subject(props) {
  return <div />;
}

export default {
  title: "AriaLiveRegion",
  component: Subject,
};

const Template = (args) => <Subject {...args} />;

export const Simple = Template.bind({});
Simple.args = {};

export const SmallAppSetup = Template.bind({});
SmallAppSetup.args = {};

export const LargeAppSetup = Template.bind({});
LargeAppSetup.args = {};
