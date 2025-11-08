import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./screens/main/Home";
import ProtectedRoute from "./apis/utils/ProtectedRoute";

const Login = lazy(() => import("./screens/login/Login"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
