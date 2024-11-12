export const formatTimeStamp = (value) => {
  const totalSeconds = Math.floor(value); // Round down to the nearest whole number
  const hours = Math.floor(totalSeconds / 3600); // 1 hour = 3600 seconds
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Remaining minutes
  const seconds = totalSeconds % 60; // Remaining seconds

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
