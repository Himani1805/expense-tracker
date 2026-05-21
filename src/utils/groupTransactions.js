/**
 * Groups an array of transactions by their date context (Today, Yesterday, or formatted date).
 * @param {Array} transactions - List of raw transaction items
 * @returns {Object} Grouped transactions keyed by timeline labels
 */
export function groupTransactions(transactions) {
  if (!transactions || transactions.length === 0) return {};

  const todayStr = new Date().toISOString().split("T")[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  return transactions.reduce((groups, transaction) => {
    const { date } = transaction;
    let groupKey = date;

    // Determine the user-friendly date label
    if (date === todayStr) {
      groupKey = "Today";
    } else if (date === yesterdayStr) {
      groupKey = "Yesterday";
    } else {
      // Format standard date to a readable form (e.g., "Oct 24, 2023")
      const options = { year: "numeric", month: "short", day: "numeric" };
      groupKey = new Date(date).toLocaleDateString("en-US", options);
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(transaction);
    return groups;
  }, {});
}
