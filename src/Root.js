import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import logger from "redux-logger";
import reducers from "./components/Details/reducer";
import Form from "./components/Form/Form";
import Details from "./components/Details/Details";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Loading from "./components/Loader/Loader";

const App = lazy(() => import("./App"));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, promise, logger))
);
const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={Loading}>
        <Switch>
          <App>
            <Route exact path="/products/:id" component={Details} />
            <Route exact path="/" component={Header} />
            <Route exact path="/" component={List} />
            <Route path="/edit" component={Form} />
          </App>
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
export default Root;
