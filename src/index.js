import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ScoreProvider } from "./context/ScoreContent";
import { Auth0Provider } from "@auth0/auth0-react";

// i think the following credentials are ok to share
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-aonixml.us.auth0.com"
      clientId="udF8KMUWM8hmOuqYm1bZlg00EgazUIed"
      redirectUri={window.location.origin}
    >
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </Auth0Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
