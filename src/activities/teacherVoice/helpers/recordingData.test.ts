import { getRecordingData } from './recordingData';
import { Scenerio, scenerios } from './scenerios';
import { allScripts } from './scripts';

describe('getRecordingData', () => {
    it('selects two different scenerio and scripts', () => {
        const recordingMetadata = getRecordingData(scenerios, allScripts);

        expect(recordingMetadata[0].script).not.toEqual(
            recordingMetadata[1].script
        );
        expect(recordingMetadata[0].type).not.toEqual(
            recordingMetadata[1].type
        );
    });
});

describe('getScripts', () => {
    const elementaryScene: Scenerio = {
        ...scenerios[0],
        scriptLevel: 'elementary',
    };
    const generalScene: Scenerio = {
        ...scenerios[0],
        scriptLevel: 'general',
    };
    it('selects two different scripts for two scenerios with the same script level', () => {
        const recordingMetadata = getRecordingData(
            [elementaryScene, elementaryScene],
            allScripts
        );

        expect(recordingMetadata[0].script).not.toEqual(
            recordingMetadata[1].script
        );
    });
    it('selects two different scripts for two scenerios with the different script level', () => {
        const recordingMetadata = getRecordingData(
            [elementaryScene, generalScene],
            allScripts
        );

        expect(recordingMetadata[0].script).not.toEqual(
            recordingMetadata[1].script
        );
    });
});
