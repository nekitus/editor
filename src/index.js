import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

import { connect, Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { Normalize } from "styled-normalize";
import { GlobalStyles } from "./components/GlobalStyles";

import createStore, { history } from "./app/redux/createStore";
import { AppRoutes } from "./routes";

import Helmet from "react-helmet";

const { DEBUG } = process.env;

class AppComponent extends React.Component {
  static propTypes = {
    isDebug: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <Helmet titleTemplate="Test task" defaultTitle="Test task" />
        <Normalize />
        <GlobalStyles />
        <ConnectedRouter history={history}>{<AppRoutes />}</ConnectedRouter>
      </React.Fragment>
    );
  }
}

const App = connect(state => ({
  isDebug: DEBUG,
}))(AppComponent);

export const rootEl =
  document.getElementById("app-container") || document.createElement("div");

const store = createStore({});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
