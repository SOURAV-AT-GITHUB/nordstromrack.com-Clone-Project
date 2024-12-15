export function shippingDateCalculator() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 10);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return currentDate.toLocaleDateString("en-US", options);
}
