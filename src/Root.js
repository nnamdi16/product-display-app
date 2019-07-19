import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import logger from "redux-logger";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import reducers from "./reducers";

const App = lazy(() => import("./App"));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, promise, logger))
);
const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback="loading...">
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
export default Root;
