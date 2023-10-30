import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const App = () => {
  const pageSize = 15;
  const [text, setText] = useState("Enable Dark");
  const [navbarText, setNavbarText] = useState("dark");
  const [progress, setProgress] = useState(0);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  // const apiKey = "8ee1e4e5f9f84d798377e63cc58b0946";
  const handleBgMode = () => {
    if (text === "Enable Dark") {
      document.body.style.backgroundColor = "#021231";
      document.body.style.color = "white";

      setText("Enable Light");
      setNavbarText("secondary");
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";

      setText("Enable Dark");
      setNavbarText("dark");
    }
  };

  const setProgressBar = (progress) => {
    setProgress(progress);
  };

  return (
    <Router>
      <div>
        <Navbar
          handleBgMode={handleBgMode}
          text={text}
          navbarText={navbarText}
        />
        <LoadingBar
          color="#f11946"
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgressBar={setProgressBar}
                  apiKey={apiKey}
                  key="general"
                  pageSize={pageSize}
                  country={"in"}
                  category={"general"}
                />
              }
            />

            <Route
              exact
              path="/business"
              element={
                <News
                  setProgressBar={setProgressBar}
                  apiKey={apiKey}
                  key="business"
                  pageSize={pageSize}
                  country={"in"}
                  category={"business"}
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgressBar={setProgressBar}
                  apiKey={apiKey}
                  key="entertainment"
                  pageSize={pageSize}
                  country={"in"}
                  category={"entertainment"}
                />
              }
            />

            <Route
              exact
              path="/health"
              element={
                <News
                  setProgressBar={setProgressBar}
                  apiKey={apiKey}
                  key="health"
                  pageSize={pageSize}
                  country={"in"}
                  category={"health"}
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgressBar={setProgressBar}
                  apiKey={apiKey}
                  key="science"
                  pageSize={pageSize}
                  country={"in"}
                  category={"science"}
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgressBar={setProgressBar}
                  apiKey={apiKey}
                  key="sports"
                  pageSize={pageSize}
                  country={"in"}
                  category={"sports"}
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgressBar={setProgressBar}
                  apiKey={apiKey}
                  key="technology"
                  pageSize={pageSize}
                  country={"in"}
                  category={"technology"}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
