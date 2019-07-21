import React from "react";
import "./App.css";
// import Form from "./components/Form/Form";
// import Details from "./components/Details/Details";

function App({ children }) {
  console.log(children);
  return (
    <div className="App">
      {children}
      {/* <Form />
      <Details /> */}
    </div>
  );
}

export default App;
