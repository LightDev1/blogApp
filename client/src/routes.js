import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthBlock from './components/AuthBlock';
import CreateBlock from './components/CreateBlock';
import Feed from './components/Feed';
import Post from './components/Post';
import Profile from './components/Profile';
import RegisterBlock from './components/RegisterBlock';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/feed" exact>
                    <Feed />
                </Route>
                <Route path="/profile/:id">
                    <Profile />
                </Route>
                <Route path="/create" exact>
                    <CreateBlock />
                </Route>
                <Route path="/posts/:id">
                    <Post />
                </Route>
                <Route path="/profile/posts/:id">
                    <Post />
                </Route>
                <Redirect to="/feed" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthBlock />
            </Route>
            <Route path="/register" exact>
                <RegisterBlock />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}
