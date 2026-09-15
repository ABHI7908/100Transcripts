import React, { lazy, Suspense } from "react";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AgentProtectedRoute from "./AgentProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import LoadingSpinner from "../components/LoadingSpinner";

/* ================= USER ================= */
import MainLayout from "../user/layout/MainLayout";
const Home = lazy(() => import("../user/pages/Home"));
const About = lazy(() => import("../user/pages/About"));

const IEEevaluation = lazy(() => import("../user/pages/IEEevaluation"));
const ECE = lazy(() => import("../user/pages/ECE"));
const SpanTran = lazy(() => import("../user/pages/SpanTran"));
const WES = lazy(() => import("../user/pages/WES"));
const EducationEva = lazy(() => import("../user/pages/EducationEva"));
const EP = lazy(() => import("../user/pages/EP"));

const Contact = lazy(() => import("../user/pages/Contact"));
const FileStatus = lazy(() => import("../user/pages/FileStatus"));
const Register = lazy(() => import("../user/pages/Register"));
const Login = lazy(() => import("../user/pages/login"));
const Apply = lazy(() => import("../user/pages/Apply"));
const Logout = lazy(() => import("../user/pages/Logout"));
const Sign = lazy(() => import("../user/pages/sign"));
const ForgotPassword = lazy(() => import("../user/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../user/pages/ResetPassword"));

const Transcripts = lazy(() => import("../user/pages/Transcripts"));
const ProvisionalCertificate = lazy(() => import("../user/pages/provisionalCertificate"));
const OriginalDegree = lazy(() => import("../user/pages/OriginalDegree"));
const MOICertificate = lazy(() => import("../user/pages/MOICertificate"));
const CMM = lazy(() => import("../user/pages/CMM"));

/* ✅ NEW DYNAMIC PAGE */
const Universities = lazy(() => import("../user/pages/Universities"));
const UniversityDetail = lazy(() => import("../user/pages/universityDetail"));
const PartnerColleges = lazy(() => import("../user/pages/PartnerColleges"));
const PartnerCollege = lazy(() => import("../user/pages/partnercollege"));

/* ================= ADMIN ================= */
import Layout from "../Admin/components/layout/Layout";
const Dashboard = lazy(() => import("../Admin/pages/Dashboard"));
const StudentRequests = lazy(() => import("../Admin/pages/StudentRequests"));
const CollegeVerification = lazy(() => import("../Admin/pages/CollegeVerification"));
const DeliveryManagement = lazy(() => import("../Admin/pages/DeliveryManagement"));
const Settings = lazy(() => import("../Admin/pages/Settings"));
const CollegeRequests = lazy(() => import("../Admin/pages/CollegeRequests"));
const EmailNotificationTemplate = lazy(() => import("../Admin/pages/EmailNotificationTemplate"));
const AdminUniversities = lazy(() => import("../Admin/pages/adminUniversities"));
const AgentsManagement = lazy(() => import("../Admin/pages/AgentsManagement"));
const AdminAgentTracking = lazy(() => import("../Admin/pages/AdminAgentTracking"));

/* ================= AGENT ================= */
import AgentLayout from "../agent/layout/AgentLayout";
const AgentLogin = lazy(() => import("../agent/pages/AgentLogin"));
const DeliveryLogin = lazy(() => import("../agent/pages/DeliveryLogin"));
const AgentDashboard = lazy(() => import("../agent/pages/AgentDashboard"));
const AgentRequestDetail = lazy(() => import("../agent/pages/AgentRequestDetail"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" color="blue" />
  </div>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>

        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="mission" element={<About />} />
          <Route path="values" element={<About />} />
           <Route path="services/iee" element={<IEEevaluation />} />
           <Route path="services/ece" element={<ECE />} />
           <Route path="services/spantran" element={<SpanTran />} />
          <Route path="services/wes" element={<WES />} />
          <Route path="services/education-evaluation" element={<EducationEva />} />
          <Route path="services/ep" element={<EP />} />
          <Route path="services/provisional" element={<ProvisionalCertificate />} />
          <Route path="apply" element={<Apply />} />
          <Route path="contact" element={<Contact />} />
          <Route path="file-status" element={<FileStatus />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signin" element={<Sign />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />

          {/* Certificate Service Routes */}
          <Route path="services/transcripts" element={<Transcripts />} />
          <Route path="services/pc" element={<ProvisionalCertificate />} />
          <Route path="services/od" element={<OriginalDegree />} />
          <Route path="services/moi" element={<MOICertificate />} />
          <Route path="services/cmm" element={<CMM />} />

          {/* ✅ DYNAMIC COLLEGE ROUTE */}
          <Route path="universities" element={<Universities />} />
          <Route path="universities/:universityId" element={<UniversityDetail />} />
          <Route path="partnered-colleges" element={<PartnerColleges />} />
          <Route path="partnered-colleges/:collegeId" element={<PartnerCollege />} />

        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="student-requests" element={<StudentRequests />} />
            <Route path="college-verification" element={<CollegeVerification />} />
            <Route path="college-requests" element={<CollegeRequests />} />
            <Route path="universities" element={<AdminUniversities />} />
            <Route path="delivery" element={<DeliveryManagement />} />
            <Route path="email-notification-template" element={<EmailNotificationTemplate />} />
            <Route path="settings" element={<Settings />} />
            {/* Agent Module */}
            <Route path="agents" element={<AgentsManagement />} />
            <Route path="agent-tracking" element={<AdminAgentTracking />} />
          </Route>
        </Route>

        {/* ================= AGENT ROUTES ================= */}
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/delivery/login" element={<DeliveryLogin />} />
        <Route path="/agent" element={<AgentProtectedRoute />}>
          <Route element={<AgentLayout />}>
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="requests/:id" element={<AgentRequestDetail />} />
          </Route>
        </Route>

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-2xl font-bold text-gray-500">
              404 - Page Not Found
            </div>
          }
        />

      </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;