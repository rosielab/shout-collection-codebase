import A_1 from '../assets/images/scenerios/A-1.jpg';
import A_g from '../assets/images/scenerios/A-g.jpg';
import A_m from '../assets/images/scenerios/A-m.jpg';
import E_1 from '../assets/images/scenerios/E-1.jpg';
import E_g from '../assets/images/scenerios/E-g.jpg';
import E_m from '../assets/images/scenerios/E-m.jpg';
import HS_1 from '../assets/images/scenerios/HS-1.jpg';
import HS_g from '../assets/images/scenerios/HS-g.jpg';
import HS_m from '../assets/images/scenerios/HS-m.jpg';
import S_a from '../assets/images/scenerios/S-a.jpg';
import S_u from '../assets/images/scenerios/S-u.jpg';
import U_1 from '../assets/images/scenerios/U-1.jpg';
import U_g from '../assets/images/scenerios/U-g.jpg';
import U_m from '../assets/images/scenerios/U-m.jpg';
import { ScriptLevel } from './scripts';

const ENVIRONMENT_OPTIONS = {
    story: 'story',
    science: 'science',
    socialStudies: 'social studies',
    math: 'math',
    english: 'english',
};

type valueof<ENVIRONMENT_OPTIONS> =
    ENVIRONMENT_OPTIONS[keyof ENVIRONMENT_OPTIONS];
type Environment = valueof<typeof ENVIRONMENT_OPTIONS>;

const ALL_SUBJECTS: Array<Environment> = [
    ENVIRONMENT_OPTIONS.science,
    ENVIRONMENT_OPTIONS.socialStudies,
    ENVIRONMENT_OPTIONS.math,
    ENVIRONMENT_OPTIONS.english,
];

export const AUDIENCE_OPTIONS: AudienceOptions = {
    highSchool: {
        singleStudent: { src: HS_1, string: 'one high school student' },
        groupStudent: { src: HS_g, string: '3-4 high school students' },
        manyStudents: { src: HS_m, string: '30 high school students' },
    },
    university: {
        singleStudent: { src: U_1, string: 'one university student' },
        groupStudent: { src: U_g, string: '3-4 university students' },
        manyStudents: { src: U_m, string: '30 university students' },
    },
    elementary: {
        singleStudent: { src: E_1, string: 'one elementary student' },
        groupStudent: { src: E_g, string: '3-4 elementary students' },
        manyStudents: { src: E_m, string: '30 elementary students' },
    },
    adult: {
        singleStudent: { src: A_1, string: 'one adult student' },
        groupStudent: { src: A_g, string: 'a group of adult students' },
        manyStudents: { src: A_m, string: 'many adult students' },
    },
    stage: {
        stageUni: { src: S_u, string: 'more than 300 university students' },
        stageHS: { src: HS_m, string: 'more than 200 high school students' },
        stageAdults: { src: S_a, string: '200 adults' },
    },
};

export interface Audience {
    src: string;
    string: string;
}

interface AudienceStageGroup {
    stageUni: Audience;
    stageHS: Audience;
    stageAdults: Audience;
}

export type AudienceStageGroupKey = keyof AudienceStageGroup;

interface AudienceGroup {
    singleStudent: Audience;
    groupStudent: Audience;
    manyStudents: Audience;
}

export type AudienceGroupKey = keyof AudienceGroup | keyof AudienceStageGroup;

interface AudienceOptions {
    highSchool: AudienceGroup;
    university: AudienceGroup;
    elementary: AudienceGroup;
    adult: AudienceGroup;
    stage: AudienceStageGroup;
}

export interface Scenerio {
    type: string;
    audience: AudienceGroup | AudienceStageGroup;
    environment: Array<Environment>;
    scriptLevel: ScriptLevel;
}

export const scenerios: Array<Scenerio> = [
    {
        type: 'Elementary School Teacher',
        audience: AUDIENCE_OPTIONS.elementary,
        environment: [...ALL_SUBJECTS, ENVIRONMENT_OPTIONS.story],
        scriptLevel: 'elementary',
    },
    {
        type: 'Daycare Instructor',
        audience: AUDIENCE_OPTIONS.elementary,
        environment: [ENVIRONMENT_OPTIONS.story],
        scriptLevel: 'elementary',
    },
    {
        type: 'High School Tutor',
        audience: AUDIENCE_OPTIONS.highSchool,
        environment: [...ALL_SUBJECTS],
        scriptLevel: 'general',
    },
    {
        type: 'Elementary School Tutor',
        audience: AUDIENCE_OPTIONS.elementary,
        environment: [...ALL_SUBJECTS, ENVIRONMENT_OPTIONS.story],
        scriptLevel: 'elementary',
    },
    {
        type: 'Guest Speaker',
        audience: AUDIENCE_OPTIONS.stage,
        environment: [...ALL_SUBJECTS, ENVIRONMENT_OPTIONS.story],
        scriptLevel: 'general',
    },
    {
        type: 'Adult Education Teacher',
        audience: AUDIENCE_OPTIONS.adult,
        environment: [...ALL_SUBJECTS],
        scriptLevel: 'general',
    },
];
