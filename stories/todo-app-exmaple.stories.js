import TodoAppExample from "./todo-app-example";

// import userEvent from "@testing-library/user-event";
// import { screen } from "@testing-library/dom";

export default {
  title: "ARIA live regions/Todo App Example",
  component: TodoAppExample,
};

function clickAction(assertiveness = "polite") {
  return userEvent.click(
    screen.getByText(
      `Announce "Item added, ${
        assertiveness === "assertive" ? "assertively" : "politely"
      }".`
    )
  );
}

export const Default = {};
