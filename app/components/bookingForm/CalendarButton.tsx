import { useRef } from "react";
import { mergeProps } from "@react-aria/utils";
import { Button } from "@/components/ui/button";
import { useFocusRing } from "@react-aria/focus";
import { CalendarState } from "@react-stately/calendar";
import { AriaButtonProps, useButton } from "@react-aria/button";

export function CalendarButton(
  props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
  }
) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps } = useFocusRing();
  return (
    <Button
      variant="outline"
      size="icon"
      ref={ref}
      disabled={props.isDisabled}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </Button>
  );
}
