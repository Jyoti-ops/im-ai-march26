/**
 * Time calculation utilities (for unit testing and use in routes).
 */

/**
 * Returns duration in seconds between two dates (rounded to integer).
 * @param {Date|string} start - Start time
 * @param {Date|string} end - End time
 * @returns {number}
 */
function getDurationSeconds(start, end) {
  const startMs = start instanceof Date ? start.getTime() : new Date(start).getTime();
  const endMs = end instanceof Date ? end.getTime() : new Date(end).getTime();
  return Math.round((endMs - startMs) / 1000);
}

/**
 * Formats total seconds as "Xh Ym" (hours and minutes only).
 * @param {number} totalSeconds
 * @returns {string}
 */
function formatDuration(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${h}h ${m}m`;
}

/**
 * Minimum duration in seconds to keep an entry (otherwise discard).
 */
const MIN_DURATION_SECONDS = 60;

/**
 * Returns whether a duration should be kept (>= 1 minute).
 * @param {number} durationSeconds
 * @returns {boolean}
 */
function shouldKeepEntry(durationSeconds) {
  return durationSeconds >= MIN_DURATION_SECONDS;
}

module.exports = {
  getDurationSeconds,
  formatDuration,
  MIN_DURATION_SECONDS,
  shouldKeepEntry,
};
