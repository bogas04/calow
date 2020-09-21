export function getMealName(date: Date) {
  const hours = date.getHours();
  const name =
    hours < 10
      ? "Breakfast"
      : hours < 12
      ? "Brunch"
      : hours < 15
      ? "Lunch"
      : hours < 18
      ? "Snacks"
      : hours < 22
      ? "Dinner"
      : "Post Dinner Snacks";

  return name;
}
