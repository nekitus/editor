import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { Route, Redirect, withRouter, Switch } from "react-router-dom";

import PageWrapper from "./components/PageWrapper";

import StoriesPage from "./pages/stories/StoriesPage";

function AppRoutesComponent() {
  return (
    <PageWrapper>
      <Switch>
        <Route exact path="/stories/:id?">
          <StoriesPage />
        </Route>
        <Route path="/" exact render={() => <Redirect to="/stories" />} />
        <Redirect from="*" to="/stories" />
      </Switch>
    </PageWrapper>
  );
}

export const AppRoutes = withRouter(connect(state => ({}))(AppRoutesComponent));
