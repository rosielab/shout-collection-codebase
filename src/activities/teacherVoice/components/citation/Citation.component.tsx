import { Typography } from '@mui/material';

interface CitationProps {
    title: string;
    titleLink: string;
    author: string;
    license: string;
    licenseLink: string;
}
export const Citation = ({
    title,
    titleLink,
    author,
    license,
    licenseLink,
}: CitationProps) => {
    return (
        <Typography sx={{ fontSize: 10 }}>
            Citation:{''}
            <a target="_blank" href={titleLink} rel="noopener noreferrer">
                {title} {''}
            </a>
            {author}/{''}
            <a href={licenseLink} target="_blank" rel="noopener noreferrer">
                {license}
            </a>
        </Typography>
    );
};
