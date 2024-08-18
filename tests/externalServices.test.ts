import { externalServiceClient } from '../src/shell/externalServices';
import axios from 'axios';
import * as fc from 'fast-check';

jest.mock('axios');

describe('externalServices Property-Based Tests', () => {
  it('should handle any valid endpoint', () => {
    fc.assert(
      fc.asyncProperty(fc.string(), async (endpoint) => {
        const mockedData = { data: { message: 'Success' } };
        (axios.get as jest.Mock).mockResolvedValue(mockedData);

        const response = await externalServiceClient.get(endpoint);
        expect(response.data).toEqual(mockedData.data);
      })
    );
  });

  it('should handle any error from external service', () => {
    fc.assert(
      fc.asyncProperty(fc.string(), async (endpoint) => {
        const mockedError = new Error('Service Unavailable');
        (axios.get as jest.Mock).mockRejectedValue(mockedError);

        try {
          await externalServiceClient.get(endpoint);
        } catch (error) {
          expect(error.message).toBe('Service Unavailable');
        }
      })
    );
  });
});