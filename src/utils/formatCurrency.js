/**
 * Formats a numeric value into a standard currency string ($USD).
 * @param {number} amount - The financial value to format
 * @returns {string} Formatted string, e.g., $42,950.00 or -$84.20
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}