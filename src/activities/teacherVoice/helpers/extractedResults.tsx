export interface AudioFeatureResults {
    pitchMean: number;
    pitchRange: number;
    disconnect: number;
    speechRate: number;
}

export type AudioFeatureResultsKeys = keyof AudioFeatureResults;

export const emptyUserResultData = {
    pitchMean: 0,
    pitchRange: 0,
    disconnect: 0,
    speechRate: 0,
};

export const featureStringMap: {
    [key: string]: string;
} = {
    pitchMean: 'Pitch Mean',
    pitchRange: 'Pitch Range',
    disconnect: 'Pauses',
    speechRate: 'Speech Rate',
};

export type AudioFeatureKey = keyof AudioFeatureResults;

export const graphFeatureDescription: {
    [key: string]: {
        name: string;
        graphType: string;
        description: string;
        units: string;
    };
} = {
    pitchMean: {
        name: 'Pitch Mean',
        graphType: 'bar',
        units: 'Hz',
        description:
            'This measures the average vibratory rates of the vocal folds. The average pitch for males is 100 Hz-150 Hz and for females is 180 Hz-250 Hz',
    },
    pitchRange: {
        name: 'Pitch Range',
        graphType: 'bar',
        units: 'Hz',
        description:
            'This measures the difference between highest and lowest point of your voice. The values below are measured in hertz (Hz).',
    },
    disconnect: {
        name: 'Pauses',
        graphType: 'bar',
        units: '',
        description:
            'This measures the pause rate which is calculated by dividing the duration by the total number of pauses.',
    },
    speechRate: {
        name: 'Speech Rate',
        graphType: 'bar',
        units: 'Words Per Second',
        description:
            'This measures the words per second in your recording. This chart compares how fast you speak compared to others',
    },
};

export const formatResponseResults = (results: any) => {
    return {
        pitchMean: parseFloat(parseFloat(results?.pitchMean ?? '0').toFixed(2)),
        pitchRange: parseFloat(
            parseFloat(results?.pitchRange ?? '0').toFixed(2)
        ),
        disconnect: parseFloat(
            parseFloat(results?.disconnect ?? '0').toFixed(2)
        ),
        speechRate: parseFloat(
            parseFloat(results?.speechRate ?? '0').toFixed(2)
        ),
    };
};
