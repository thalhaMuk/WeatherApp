import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Auth0Provider
        domain="dev-f4vqnv42mt0hczze.us.auth0.com"
        clientId="dNk42AGmNfSjrl6PDgjCWASpfISb4JQ0"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>,
);
