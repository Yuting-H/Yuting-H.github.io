import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Calculator from "./pages/Calculator.jsx";
import Etch from "./pages/Etch.jsx";
import SortVisualizer from "./pages/SortVisualizer.jsx";
import Restaurant from "./pages/Restaurant.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<Home />}
        />
        <Route
          path="calculator"
          element={<Calculator />}
        />
        <Route
          path="etch"
          element={<Etch />}
        />
        <Route
          path="sort-visualizer"
          element={<SortVisualizer />}
        />
        <Route
          path="restaurant"
          element={<Restaurant />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
}
