import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./GlobalState/Reducers/index";
import Routes from "./Router";

//그리드 css
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const store = createStore(rootReducer);
const App =()=> {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  
}

export default App;

