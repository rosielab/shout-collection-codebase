import Activities from '../../commons/pages/HomePage';
import { TeacherVoiceGame } from '../../activities/teacherVoice/TeacherVoiceGame.component';
import { LearnMore } from '../pages/LearnMore';
import { OurPurpose } from '../pages/OurPurpose';

export const routePaths = {
    ACTIVITIES: '/',
    TEACHER_VOICE: '/teacherVoice',
    LEARN_MORE: '/learnMore',
    OUR_PURPOSE: '/ourPurpose',
};

export const routes = [
    {
        path: routePaths.ACTIVITIES,
        component: Activities,
    },
    {
        path: routePaths.TEACHER_VOICE,
        component: TeacherVoiceGame,
    },
    {
        path: routePaths.LEARN_MORE,
        component: LearnMore,
    },
    {
        path: routePaths.OUR_PURPOSE,
        component: OurPurpose,
    },
];
