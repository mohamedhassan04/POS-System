import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./screens/main/Home";

const Login = lazy(() => import("./screens/login/Login"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/main" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default App;
