import { createMocks } from 'node-mocks-http';
import depositHandler from '@/pages/api/deposit'; // Adjust path as necessary

describe('POST /api/deposit', () => {
  test('returns success response when deposit is valid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { iban: 'test-iban', amount: 100 },
    });

    await depositHandler(req, res);  // Call your API handler

    expect(res._statusCode).toBe(200);  // Check for status 200
    expect(res._getData()).toEqual({ message: 'Deposit successful' });  // Check for correct response body
  });

  test('returns error when amount is invalid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { iban: 'test-iban', amount: -100 },
    });

    await depositHandler(req, res);

    expect(res._statusCode).toBe(400);  // Check for status 400
    expect(res._getData()).toEqual({ error: 'Invalid amount' });  // Check for error response
  });
});
