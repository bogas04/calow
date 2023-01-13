export function getTimeDifference(from: number, to: number = Date.now()) {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  let difference = Math.abs(from - to) / 1000;

  const unit =
    difference > 60 ? (difference > 60 * 60 ? (difference > 60 * 60 * 24 ? "days" : "hour") : "minute") : "seconds";

  if (unit === "minute") {
    difference /= 60;
  }
  if (unit === "hour") {
    difference /= 60 * 60;
  }
  if (unit === "days") {
    difference /= 60 * 60 * 24;
  }

  return unit === "seconds" ? "now" : rtf.format((from < to ? -1 : 1) * Math.floor(difference), unit);
}

export const getDateFromDateKey = (key: string) => new Date(key.split("/").reverse().join("/"));

export const getDateKey = (time: number) => {
  const d = new Date(time);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

/**
 * Returns a comparator function accepted by Array.prototype.sort based for an array of dateKey strings
 */
export const compareDate =
  (ascending = true) =>
  (dateKey1: string, dateKey2: string) => {
    const yymmdd1 = dateKey1.split("/").reverse().join("/");
    const yymmdd2 = dateKey2.split("/").reverse().join("/");

    return yymmdd1.localeCompare(yymmdd2) * (ascending ? 1 : -1);
  };

export const formatDateKey = (key: string) => {
  const [date, month, year] = key.split("/").map(Number);
  const d = new Date();
  d.setDate(date);
  d.setMonth(month - 1);
  d.setFullYear(year);

  return formatShortDate(d);
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatShortDate(date: Date) {
  return `${date.getDate()} ${months[date.getMonth()]}, '${String(date.getFullYear()).split("").slice(2).join("")}`;
}

export function formatTimeOfDay(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getShortMonth(month: number) {
  return months[month];
}
