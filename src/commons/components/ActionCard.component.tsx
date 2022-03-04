import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface ActionCardProps {
    imageUrl?: string;
    imageAlt?: string;
    header: string;
    body: string;
    onClick: () => void;
}

export default function ActionCard({
    imageUrl,
    imageAlt,
    header,
    body,
    onClick,
}: ActionCardProps) {
    return (
        <Card sx={{ maxWidth: 345, minWidth: 300, minHeight: 200, margin: 1 }}>
            <CardActionArea sx={{ height: '100%' }} onClick={onClick}>
                {imageUrl && (
                    <CardMedia
                        component="img"
                        height="140"
                        image={imageUrl}
                        alt={imageAlt}
                    />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {header}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {body}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
