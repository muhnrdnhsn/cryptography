import {createMuiTheme} from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#333F50',
            light: '#5D6A7C',
            dark: '#0C1928',
            contrastText: '#fff'
        },
        secondary: {
            main: '#45546B',
            light: '#718099',
            dark: '#1B2B40',
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