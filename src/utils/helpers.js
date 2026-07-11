export function getTodayString() {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
}

export function getYesterdayString() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

export function calculateStreak(lastActive, today, currentStreak) {
  if (!lastActive) return 1;
  if (lastActive === today) return currentStreak;

  const yesterday = getYesterdayString();
  if (lastActive === yesterday) {
    return currentStreak + 1;
  }

  return 1;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
