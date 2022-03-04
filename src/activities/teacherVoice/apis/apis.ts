import axios from 'axios';
import * as uuid from 'uuid';
import { formatResponseResults } from '../helpers/extractedResults';

const BASE_URL = process.env.REACT_APP_BASE_URL; //Change to env var

export async function sendS3(blob: Blob, metaData: any) {
    // TODO: Come up with a better naming schema
    let id: string = uuid.v4();
    let fileName = `citizen_audio_${id}`;
    let fileType = 'audio/wav';
    metaData['audioID'] = fileName;

    try {
        // Get the s3 location on where to put the audio file
        const response: any = await axios.post(`${BASE_URL}/uploadS3`, {
            fileName: fileName,
            fileType: fileType,
            metaData: metaData,
        });
        var signedRequest = response.data.data.signedRequest;
        var options = {
            headers: {
                'Content-Type': fileType,
            },
        };

        // Put audio file into s3 bucket
        await axios.put(signedRequest, blob, options);
        return fileName;
    } catch (error) {
        throw new Error(`Audio Failed to update: ${error}`);
    }
}

export async function sendUserData(data: any) {
    const URL = process.env.REACT_APP_USER_DATA_LAMBDA;
    if (!URL) throw new Error(`No USER DATA ENDPOINT`);
    try {
        const response = await axios.post(URL, data, {
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        throw new Error(`Failed to upload User Data: ${error}`);
    }
}

export async function pollResults(audioID: string) {
    const URL = process.env.REACT_APP_POLL_RESULTS;
    if (!URL) throw new Error(`No POLL RESULTS DATA ENDPOINT`);

    try {
        const response = await axios.get<any>(URL, {
            params: {
                audioID: audioID,
            },
        });

        // incase anything besides a 200 doesn't thrown an error
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data?.Item
            ? formatResponseResults(response.data?.Item)
            : null;
    } catch (error) {
        // 404 will be caught here and we don't want it to throw an error
        if (axios.isAxiosError(error)) {
            if (error?.response?.status === 404) return null;
        }

        throw new Error(`Failed to upload User Data: ${error}`);
    }
}
