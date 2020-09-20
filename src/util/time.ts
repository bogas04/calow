export function getTimeDifference(from: number, to: number = Date.now()) {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  let difference = (from - to) / 1000;
  const unit =
    difference > 60
      ? difference > 60 * 60
        ? difference > 60 * 60 * 24
          ? "days"
          : "hour"
        : "minute"
      : "seconds";

  if (unit === "minute") {
    difference /= 60;
  }
  if (unit === "hour") {
    difference /= 60 * 60;
  }
  if (unit === "days") {
    difference /= 60 * 60 * 24;
  }

  return unit === "seconds" ? "now" : rtf.format(Math.floor(difference), unit);
}
