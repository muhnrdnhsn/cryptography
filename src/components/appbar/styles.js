import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
    appBar:{
        boxShadow: `0px 1px 0.5px ${theme.palette.primary.main}`,
        WebkitBoxShadow: `0px 1px 0.5px ${theme.palette.primary.main}`
    },
    titleText: {
        fontFamily: 'Carlinson',
        fontWeight: 'bold',
        fontSize: '40px',
        padding: 5,
        cursor: 'pointer',
        textAlign: 'center'
    },
}))

export default styles;