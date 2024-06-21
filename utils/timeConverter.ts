export default function formatTime(seconds: number | string): string {
  if (typeof seconds === "string") {
    seconds = parseInt(seconds);
  }
  let hrs: number = Math.floor(seconds / 3600);
  let mins: number = Math.floor((seconds % 3600) / 60);
  let secs: number = seconds % 60;

  return (
    (hrs > 0 ? hrs + ":" : "") +
    (hrs > 0 && mins < 10 ? "0" : "") +
    (mins > 0 ? mins : "0") +
    ":" +
    (secs < 10 ? "0" : "") +
    secs
  );
}
