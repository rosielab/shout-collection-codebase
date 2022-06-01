import Activities from '../../commons/pages/HomePage';
import { DontateShouts } from '../../activities/DonateShouts/DonateShouts.component';
import { OurPurpose } from '../pages/OurPurpose';

export const routePaths = {
    ACTIVITIES: '/shoutcollection/',
    DONATE_SHOUTS: '/shoutcollection/donateShouts',
    OUR_PURPOSE: '/shoutcollection/ourPurpose',
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
