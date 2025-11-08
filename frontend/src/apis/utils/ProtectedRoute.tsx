import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGetCurrentUserQuery } from "../actions/auth.action";

const ProtectedRoute: React.FC = () => {
  const { data, isLoading } = useGetCurrentUserQuery(null, {
    skip: false,
  });

  if (isLoading) return <Loader />;

  const current = data?.data?.current;

  if (!current) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
