export function secondsToMinutesAndSeconds(seconds: number) {
  if (seconds < 0) return seconds.toString();
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds}`;
}
