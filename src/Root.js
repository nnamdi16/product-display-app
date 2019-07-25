import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import logger from "redux-logger";
import reducers from "./components/Details/reducer";
import ShowDetails from "./components/Loader/Loader";

const App = lazy(() => import("./App"));
const Home = lazy(() => import("./Home"));
const Details = lazy(() => import("./components/Details/Details"));
const Form = lazy(() => import("./components/Form/Form"));
const Header = lazy(() => import("./components/Header/Header"));
const List = lazy(() => import("./components/List/List"));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, promise, logger))
);
const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<ShowDetails />}>
        <Switch>
          <App>
            <Route exact path="/products/:id" component={() => <Details />} />
            <Route path="/" component={Home} />
            <ShowDetails />
          </App>
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
export default Root;
