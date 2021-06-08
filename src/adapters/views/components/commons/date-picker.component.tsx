import React, { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import moment, { Moment } from "moment";

interface Props {
  updateStartDate: Function;
  updateEndDate: Function;
  startDate: Date;
  endDate: Date;
}

export default function ResponsiveDateRangePicker(props: Props) {
  const [focus, setFocus] = useState<"startDate" | "endDate" | null>(null);

  return (
    <div className={"w-full flex justify-end box-border"}>
      <DateRangePicker
        startDate={moment(props.startDate)} // momentPropTypes.momentObj or null,
        startDateId="sDate" // PropTypes.string.isRequired,
        endDate={moment(props.endDate)} // momentPropTypes.momentObj or null,
        endDateId="eDate" // PropTypes.string.isRequired,
        disabled={false}
        startDateAriaLabel="Start date"
        endDateAriaLabel="End date"
        isOutsideRange={() => false}
        noBorder={true}
        onDatesChange={({ startDate, endDate }: { startDate: Moment | null, endDate : Moment | null}) => {
          startDate && props.updateStartDate(startDate?.toDate());
          endDate && props.updateEndDate(endDate?.toDate());
        }} // PropTypes.func.isRequired,
        focusedInput={focus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={setFocus} // PropTypes.func.isRequired,
        regular={true}
      ></DateRangePicker>
    </div>
  );
}
