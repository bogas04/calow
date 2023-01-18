import { memo } from "react";
import { DAY, TODAY } from "../constants/date";

import { formatShortDate } from "../util/time";

function DateBar({ date, onChange }: { date: number; onChange: (newDate: number) => void }) {
  const commonStyles = "rounded-lg py-1 px-4 text-sm flex-1 ";
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-1 gap-3" key={date}>
        <button className={commonStyles + "bg-slate-50"} onClick={() => onChange(date - DAY)}>
          {formatShortDate(new Date(date - DAY))}
        </button>
        <button className={commonStyles + "z-10 bg-slate-200"}>{formatShortDate(new Date(date))}</button>
        <button
          className={commonStyles + `bg-slate-50 ${date + DAY > TODAY ? "invisible" : "visible"}`}
          onClick={() => onChange(Math.min(date + DAY, TODAY))}
        >
          {formatShortDate(new Date(date + DAY))}
        </button>
      </div>
    </>
  );
}
export default memo(DateBar);
