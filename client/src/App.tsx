import React from "react"
import {  Route, Routes } from "react-router"



import Layout from "./pages/Layout";

import MainPage from "./pages/MainPage/MainPage";
import MoonPage from "./pages/NatalChartPage/NatalChartPage";



function App(): React.JSX.Element {

  return (
    <>
				<Routes>
        <Route element={<Layout />}>
				
          <Route path="/" element={<MainPage/>} />
          <Route path="/moon" element={<MoonPage/>} />
          </Route>
				</Routes>
    </>
  );
}

export default App;