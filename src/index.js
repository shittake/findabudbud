import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router, Route, NavLink, Redirect, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';
import LeaderboardPage from "./Pages/LeaderboardPage";
import VideoPage from "./Pages/VideoPage";
import ChatPage from "./Pages/ChatPage";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>

    <App />

  </StrictMode>
);


