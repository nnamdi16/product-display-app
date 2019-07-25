import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import ShowDetails from "./components/Loader/Loader";

const Form = lazy(() => import("./components/Form/Form"));
const Header = lazy(() => import("./components/Header/Header"));
const List = lazy(() => import("./components/List/List"));

const App = () => (
  <div>
    <Header />
    <Suspense fallback={<ShowDetails />}>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/edit" component={Form} />
      </Switch>
    </Suspense>
  </div>
);
export default App;
