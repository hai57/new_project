import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import App from './App'
import ProviderTheme from "HOC/providerTheme";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProviderTheme>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ProviderTheme>
    </Provider>
  </React.StrictMode>
);
