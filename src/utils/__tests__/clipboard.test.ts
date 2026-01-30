import { describe, expect, it, vi } from 'vitest';
import { copyToClipboard } from '../clipboard';

describe('clipboard utility', () => {
  it('should copy text to clipboard using navigator.clipboard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard('test text');
    expect(writeTextMock).toHaveBeenCalledWith('test text');
    expect(result).toBe(true);
  });

  it('should return false if copy fails', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('failed'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard('test text');
    expect(result).toBe(false);
  });
});
