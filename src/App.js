import React from "react";
import "./App.css";

import Layout from "./Layout/Layout";
import WorldMap from "./Components/Map/worldMap";
import Stats from "./Components/Stats/Stats";

function App() {
  return (
    <Layout>
      <WorldMap />
      <Stats />
    </Layout>
  );
}

export default App;
