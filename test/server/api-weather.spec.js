import handler from '@/server/api/weather';
import { describe, expect, it } from 'vitest';

describe('Weather API Handler', () => {
  it('returns error if cityId is not provided', async () => {
    const mockEventWithoutParam = {
      context: {},
      req: { url: '/api/weather' },
    };

    const response = await handler(mockEventWithoutParam);

    expect(response).toEqual({
      data: null,
      error: 'No cityId provided',
    });
  });
});
