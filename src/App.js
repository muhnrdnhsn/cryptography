import { ThemeProvider } from '@material-ui/core/styles';
import React, {useEffect} from 'react'
import Home from './pages/home';
import theme from './theme';

const App = (props) => {
    useEffect(() => {
        document.body.style.backgroundColor = '#abdee6';
        document.body.style.backgroundImage = `url('lock.png')`;
    });
    return(
        <ThemeProvider theme={theme}>
            <Home {...props} />
        </ThemeProvider>
    )
}

export default App;