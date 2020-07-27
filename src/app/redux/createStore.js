import { createStore, applyMiddleware, compose } from "redux";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

// Middlewares
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { rootSaga } from "./sagas";
import createRootReducer from "./createRootReducer";

const { NODE_ENV } = process.env;

const isDevelopment = NODE_ENV === "development";
const isTest = NODE_ENV === "test";

const logger = createLogger({ level: "info", collapsed: true });
const sagaMiddleware = createSagaMiddleware({
  onError: function(error) {
    console.log(error);
  },
});

export const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (!isTest) {
  middlewares.push(logger);
}

const composeEnhancers =
  isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export default function(initialState = {}) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export { createRootReducer };
