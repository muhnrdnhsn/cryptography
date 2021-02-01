import React from 'react'
import styles from './styles'
import { Divider, Drawer as MaterialUIDrawer, List, ListItem, ListItemText, Typography } from '@material-ui/core'

const Drawer = (props) => {
    const classes = styles()
    
    return(
        <MaterialUIDrawer
            classes={{
                paper: classes.drawerPaper
            }}
            variant="permanent"
            open
        >
            <div className={classes.toolbar}>
                <Typography className={classes.titleText}>CRYPTOONS</Typography>
            </div>
            <Divider />
            <List>
                {props.menu.map((value, index) => (
                    <ListItem button onClick={()=>props.changeAlgorithm(`${index}`)} selected={value===props.currentAlgorithm} key={index}>
                        <ListItemText primary={value} />
                    </ListItem>
                ))}
            </List>
        </MaterialUIDrawer>
    )
}

export default Drawer;