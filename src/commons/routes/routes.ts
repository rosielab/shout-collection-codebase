import Activities from '../../commons/pages/HomePage';
import { DontateShouts } from '../../activities/DonateShouts/DonateShouts.component';
import { OurPurpose } from '../pages/OurPurpose';

export const routePaths = {
    ACTIVITIES: '/',
    DONATE_SHOUTS: '/donateShouts',
    OUR_PURPOSE: '/ourPurpose',
};

export const routes = [
    {
        path: routePaths.ACTIVITIES,
        component: Activities,
    },
    {
        path: routePaths.DONATE_SHOUTS,
        component: DontateShouts,
    },
    {
        path: routePaths.OUR_PURPOSE,
        component: OurPurpose,
    },
];
