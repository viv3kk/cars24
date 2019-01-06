import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './Components/Homepage';
import ChatPage from './Components/Chat';

const Router = () => (
    <Switch>
        <Route exact path="/" component={ChatPage}></Route>
        <Route exact path="/chat" component={ChatPage}></Route>
    </Switch>
)

export default Router;