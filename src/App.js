import React from "react";
import "./App.css";

import Layout from "./Layout/Layout";
import WorldMap from "./Components/Map/worldMap";
import Stats from "./Components/Stats/Stats";
import Countries from "./Components/CountriesList/Countries";
import Error from "./hoc/ErrorHandler";
function App() {
  return (
    <Error>
      <Layout>
        <Stats />
        <WorldMap />
        <Countries />
      </Layout>
    </Error>
  );
}

export default App;
