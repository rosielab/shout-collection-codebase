import axios from 'axios';
import { pollResults, sendUserData, sendS3 } from './apis';

jest.mock('axios');

describe('api tests', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('sendS3', () => {
        const blob = new Blob([''], { type: 'audio/wav' });
        const metadata = { userID: '' };
        const expectedResponse = {
            data: { data: { signedRequest: 'reponse' } },
        };
        const setup = (postOverrides: any, putOverrides: any) => {
            axios.post = jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(postOverrides));
            axios.put = jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(putOverrides));
        };

        const action = async () => {
            await sendS3(blob, metadata);
        };

        it('has successfully sent the user data', async () => {
            setup({ status: 200, ...expectedResponse }, { status: 200 });
            await action();

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledTimes(1);
        });

        it('has failed to send the user data', async () => {
            setup({ status: 500, statusText: 'failed' }, { status: 200 });

            expect(action()).rejects.toThrow();
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.put).not.toHaveBeenCalledTimes(1);
        });
    });

    describe('sendUserData', () => {
        const data = { data: 'user_123' };
        const setup = (mockOverrides: any) => {
            axios.post = jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(mockOverrides));
        };

        it('has successfully sent the user data', async () => {
            setup({ status: 200 });
            await sendUserData(data);

            expect(axios.post).toHaveBeenCalledTimes(1);
        });

        it('has failed to send the user data', async () => {
            setup({ status: 500, statusText: 'failed' });
            const action = async () => {
                await sendUserData(data);
            };

            expect(action()).rejects.toThrow();
            expect(axios.post).toHaveBeenCalledTimes(1);
        });
    });

    describe('pollResults', () => {
        const audioID = 'user_123';
        const setup = (mockOverrides: any) => {
            axios.get = jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve(mockOverrides));
        };

        const action = async () => {
            return await pollResults(audioID);
        };

        it('has received the polling results', async () => {
            setup({
                data: { Item: 'mock data' },
                status: 200,
            });
            await action();

            expect(axios.get).toHaveBeenCalledTimes(1);
        });

        it('has not received the polling results', async () => {
            setup({
                data: {},
                status: 200,
            });
            const results = await action();

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(results).toEqual(null);
        });

        it('has failed making the api call', async () => {
            setup({
                data: { statusText: 'Internal Error' },
                status: 500,
            });

            expect(action()).rejects.toThrow();
            expect(axios.get).toHaveBeenCalledTimes(1);
        });
    });
});
