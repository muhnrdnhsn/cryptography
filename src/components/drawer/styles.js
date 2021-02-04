import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
    drawerPaper: {
        width: 240,
    },
    toolbar: {
        ...theme.mixins.toolbar,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    titleText: {
        fontFamily: 'Roseland',
        fontWeight: 'bold',
        fontSize: '40px',
        padding: 5,
        cursor: 'default',
        textAlign: 'center',
    },
}))

export default styles;