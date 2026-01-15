import * as React from "react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={className}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };