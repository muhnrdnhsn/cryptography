import {createMuiTheme} from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#A2E1DB',
            light: '#ECAE4',
            dark: '#55CBCD',
            contrastText: '#fff'
        },
        secondary: {
            main: '#CCE2CB',
            light: '#B6CFB6',
            dark: '#97C1A9',
            contrastText: '#fff'
        },
        text: {
            primary: '#333F50'
        }
    },
    typography:{
        fontFamily:[
            '-apple-system',
            'Gecade',
            'Roboto'
        ],
        h6:{
            fontSize: '1.25rem'
        },
        body1:{
            fontSize: '1rem'
        },
        body2:{
            fontSize: '1rem'
        }
    }
});

export default theme;