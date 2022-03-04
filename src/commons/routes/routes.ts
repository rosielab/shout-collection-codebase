import Activities from '../../commons/pages/HomePage';
import { DontateShouts } from '../../activities/DonateShouts/DonateShouts.component';
import { OurPurpose } from '../pages/OurPurpose';

export const routePaths = {
    ACTIVITIES: '/',
    TEACHER_VOICE: '/teacherVoice',
    OUR_PURPOSE: '/ourPurpose',
};

export const routes = [
    {
        path: routePaths.ACTIVITIES,
        component: Activities,
    },
    {
        path: routePaths.TEACHER_VOICE,
        component: DontateShouts,
    },
    {
        path: routePaths.OUR_PURPOSE,
        component: OurPurpose,
    },
];
