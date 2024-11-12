export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  const diffInMilliseconds = now - date;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffInDays / 365);
  const months = Math.floor(diffInDays / 30);
  const days = diffInDays % 30;

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return "Today";
  }
};
