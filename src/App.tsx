import { Container } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './commons/components/NavBar.component';
import { routes } from './commons/routes/routes';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Container
                sx={{
                    padding: { xs: 2, md: 5 },
                    minHeight: '85vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                className="App"
            >
                <Switch>
                    {routes.map(({ path, component }) => {
                        return (
                            <Route
                                exact
                                key={path}
                                path={path}
                                component={component}
                            />
                        );
                    })}
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
