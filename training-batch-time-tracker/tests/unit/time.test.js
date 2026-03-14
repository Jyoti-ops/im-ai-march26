const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  getDurationSeconds,
  formatDuration,
  MIN_DURATION_SECONDS,
  shouldKeepEntry,
} = require('../../src/lib/time');

describe('time.getDurationSeconds', () => {
  it('returns seconds between two Date objects', () => {
    const start = new Date('2025-01-15T10:00:00.000Z');
    const end = new Date('2025-01-15T10:00:05.000Z');
    assert.strictEqual(getDurationSeconds(start, end), 5);
  });

  it('returns seconds between ISO strings', () => {
    const start = '2025-01-15T10:00:00.000Z';
    const end = '2025-01-15T10:01:30.000Z';
    assert.strictEqual(getDurationSeconds(start, end), 90);
  });

  it('rounds fractional seconds', () => {
    const start = new Date(0);
    const end = new Date(1250);
    assert.strictEqual(getDurationSeconds(start, end), 1);
  });

  it('returns 0 when start equals end', () => {
    const d = new Date();
    assert.strictEqual(getDurationSeconds(d, d), 0);
  });
});

describe('time.formatDuration', () => {
  it('formats zero as 0h 0m', () => {
    assert.strictEqual(formatDuration(0), '0h 0m');
  });

  it('formats minutes only', () => {
    assert.strictEqual(formatDuration(90), '0h 1m');
    assert.strictEqual(formatDuration(3600 - 1), '0h 59m');
  });

  it('formats hours and minutes', () => {
    assert.strictEqual(formatDuration(3600), '1h 0m');
    assert.strictEqual(formatDuration(3661), '1h 1m');
    assert.strictEqual(formatDuration(7325), '2h 2m');
  });
});

describe('time.shouldKeepEntry', () => {
  it('returns false for duration under 60 seconds', () => {
    assert.strictEqual(shouldKeepEntry(0), false);
    assert.strictEqual(shouldKeepEntry(59), false);
  });

  it('returns true for duration >= 60 seconds', () => {
    assert.strictEqual(shouldKeepEntry(60), true);
    assert.strictEqual(shouldKeepEntry(61), true);
  });
});

describe('time.MIN_DURATION_SECONDS', () => {
  it('is 60', () => {
    assert.strictEqual(MIN_DURATION_SECONDS, 60);
  });
});
