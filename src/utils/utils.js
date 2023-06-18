export function formatWeatherDateTime(timezone) {
  const DateOptions = {
    month: "short",
    day: "numeric",
  };

  const FormatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}.${formattedMinutes}${ampm}`;
  };

  const utcDate = new Date(Date.now()).getTime() - 19800 * 1000;
  const shiftInSeconds = timezone;
  const localDate = new Date(utcDate + shiftInSeconds * 1000);
  const formattedTime = FormatTime(localDate);
  const formattedDate = localDate.toLocaleDateString("en-IN", DateOptions);

  return `${formattedTime}, ${formattedDate}`;
}
