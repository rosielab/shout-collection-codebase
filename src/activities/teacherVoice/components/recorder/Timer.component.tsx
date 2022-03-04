// Code from: https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
import { Typography } from '@mui/material';
import React from 'react';

export default function Timer(props: any) {
    function calculateTimeDuration(secs: any) {
        const hr = Math.floor(secs / 3600);
        const min = Math.floor((secs - hr * 3600) / 60);
        const sec = Math.floor(secs - hr * 3600 - min * 60);

        const minStr = min < 10 ? '0' + min.toString() : min.toString();
        const secStr = sec < 10 ? '0' + sec.toString() : sec.toString();

        if (hr <= 0) {
            return minStr + ':' + secStr;
        }

        return `${hr}:${minStr}:${secStr}`;
    }

    return (
        <div
            className="timer"
            style={{ display: 'flex', alignItems: 'center' }}
        >
            <Typography variant="h4" className="digits">
                {calculateTimeDuration(props.time)}
            </Typography>
        </div>
    );
}
