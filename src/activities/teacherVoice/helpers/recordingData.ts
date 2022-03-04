import { getRandomIndex } from './generalHelpers';
import { Scenerio } from './scenerios';
import { Script, ScriptTypes } from './scripts';

export interface RecordingData {
    image: string;
    audience: string;
    script: Script;
    type: string;
}

const getScenerios = (scenerios: Array<Scenerio>) => {
    const possibleScenerioIndexes = Array.from(Array(scenerios.length).keys());

    const scenerioIndex = getRandomIndex(possibleScenerioIndexes.length);
    const firstScene = scenerios[possibleScenerioIndexes[scenerioIndex]];
    possibleScenerioIndexes.splice(scenerioIndex, 1);
    const secondScene =
        scenerios[
            possibleScenerioIndexes[
                getRandomIndex(possibleScenerioIndexes.length)
            ]
        ];

    return [firstScene, secondScene];
};

const getAudience = (audiences: any) => {
    const audienceOptions = Object.values(audiences);
    return audienceOptions[getRandomIndex(audienceOptions.length)];
};

const getScriptOptions = (scriptLevel: any, scriptsTypes: ScriptTypes) => {
    if (scriptLevel === 'elementary') return scriptsTypes.elementary;
    return scriptsTypes.general;
};

export const getScripts = (scripts: ScriptTypes, scenes: Array<Scenerio>) => {
    // are the scenes different audience levels
    const sceneSameLevel = scenes[0].scriptLevel === scenes[1].scriptLevel;

    // if scripts level are the same, we need to make sure that they are not duplicates
    // if they are different, we can just select a random one from each type
    if (sceneSameLevel) {
        const script = getScriptOptions(scenes[0].scriptLevel, scripts);
        const possibleScripts = Array.from(Array(script.length).keys());
        const scriptIndex = getRandomIndex(possibleScripts.length);
        const firstScript = script[possibleScripts[scriptIndex]];
        possibleScripts.splice(scriptIndex, 1);
        const secondScript =
            script[possibleScripts[getRandomIndex(possibleScripts.length)]];

        return [firstScript, secondScript];
    } else {
        const firstScriptOptions = getScriptOptions(
            scenes[0].scriptLevel,
            scripts
        );
        const scriptIndex = getRandomIndex(firstScriptOptions.length);
        const firstScript = firstScriptOptions[scriptIndex];

        const secondScriptOptions = getScriptOptions(
            scenes[1].scriptLevel,
            scripts
        );
        const secondScriptIndex = getRandomIndex(secondScriptOptions.length);
        const secondScript = secondScriptOptions[secondScriptIndex];
        return [firstScript, secondScript];
    }
};

export const getRecordingData = (
    allScenerios: Array<Scenerio>,
    allScripts: ScriptTypes
): Array<RecordingData> => {
    const scenes = getScenerios(allScenerios);
    const types = [scenes[0].type, scenes[1].type];

    const audiences: Array<any> = [
        getAudience(scenes[0].audience),
        getAudience(scenes[1].audience),
    ];

    const images = [audiences[0].src, audiences[1].src];

    const scripts = getScripts(allScripts, scenes);

    return [
        {
            type: types[0],
            audience: audiences[0].string,
            image: images[0],
            script: scripts[0],
        },
        {
            type: types[1],
            audience: audiences[1].string,
            image: images[1],
            script: scripts[1],
        },
    ];
};
