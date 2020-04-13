import React from "react";
import "./App.css";

import Layout from "./Layout/Layout";
import WorldMap from "./Components/Map/worldMap";
import Stats from "./Components/Stats/Stats";
import Countries from "./Components/CountriesList/Countries";

function App() {
  return (
    <Layout>
      <WorldMap />
      <Stats />
      <Countries />
    </Layout>
  );
}

export default App;
