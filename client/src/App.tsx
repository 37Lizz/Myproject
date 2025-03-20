import React from "react"
import {  Route, Routes } from "react-router"
import '@fontsource/ibm-plex-mono';


import Layout from "./pages/Layout";
import AstroForm from "./pages/NatalChartPage/NatalChartPage";


function App(): React.JSX.Element {

  return (
    <>
				<Routes>
        <Route element={<Layout />}>
				
          <Route path="/" element={<AstroForm />} />
          </Route>
				</Routes>
    </>
  );
}

export default App;