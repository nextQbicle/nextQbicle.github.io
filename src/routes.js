import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./components/home_component/Home";
import Login from "./components/login_component/Login";
import Signup from "./components/signup_component/Signup";
import DocumentUpload from "./components/document_upload_dashboard_component/DocumentUpload";
import VerificationDashboard from "./components/verification_dashboard_component/VerificationDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/verification-dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <VerificationDashboard />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/document-upload-dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <DocumentUpload />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/add-user"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Signup />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
