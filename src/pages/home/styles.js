import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 70,
        bottom: 0,
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: '66.7%'
        },
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
        
    },
    formControl: {
        minWidth: '100%',
    },
    p20: {
        padding: 20
    }

}))
export default styles;