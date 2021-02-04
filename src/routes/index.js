import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '../pages/home';

const Router = () => {
    return(
        <React.Fragment>
            <BrowserRouter>
                <Route path="/" render={(props) => <Home {...props}/>} />
            </BrowserRouter>
        </React.Fragment>
    )
}

export default Router;