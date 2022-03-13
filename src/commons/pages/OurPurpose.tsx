import { Typography, Container } from '@mui/material';

export const OurPurpose = () => {
    return (
        <Container>
            <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', marginBottom: 3 }}
            >
                Haiven's Mission
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Our mission is to provide victims and survivors of abuse with
                software services to improve their safety, well-being and
                independence. Haiven is addressing not only the crisis of
                intimate partner violence but also the aftermath by supporting
                those living with and surviving domestic violence, supporting
                agency, empowerment and security by providing guided access to
                our network of partnerships.
            </Typography>
            <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', marginBottom: 3 }}
            >
                Haiven's Vision
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Our vision is to be able to create accessible technology and
                services to help someone through the process of exiting an
                abusive relationship and ensure they have the economic power to
                leave and stay out of it.
            </Typography>
            <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', marginBottom: 3 }}
            >
                Haiven's Core Values
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <Typography sx={{ marginBottom: 2 }}>
                    <b>Privacy</b>: Our utmost priority for our users is to
                    ensure their privacy and safety. We do so by consulting
                    multiple partners including industry and research experts,
                    and consulting legal requirements.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    <b>Human-Centered</b>: The person always comes first.
                    Whether that is our user, our partners, or our team, we put
                    the needs of the person before the needs of our
                    organization.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    <b>Collaborative</b>: The best work happens when we work
                    together. We believe in collaborating with as many people as
                    we can, either through our volunteer and advisory team, or
                    through our partnerships. We want to hear different
                    perspectives, share different ideas, and work together to
                    build products with meaning.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    <b>Freedom of Choice</b>: We don’t always know what’s best
                    for our users. Human lives are more complex than we could
                    ever imagine or anticipate. Therefore, we are dedicated to
                    giving our users the freedom to make their own decisions and
                    choose what’s best for them.
                </Typography>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <Typography sx={{ marginBottom: 2 }}>
                    Our full website is coming soon! If you would like to
                    contact us please email: hello.haiven(at)gmail(dot)com
                </Typography>
            </Typography>
        </Container>
    );
};
