import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
    formControl: {
        minWidth: 240,
        backgroundColor: '#fff'
    },
    mainContainer: {
        
        padding: 20,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - 240px)`,
            marginLeft: 240,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 80,
        },
        
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20
    },
    titleContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5
    },
    paper: {
        padding: 10
    },
    footer: {
        position: 'fixed',
        bottom: 0,
        width: `calc(100% - 240px)`,
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 10,
        color: '#fff'
    }

}))

export default styles;