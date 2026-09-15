// ===============================
// API Configuration - Centralized
// ===============================

// Change this IP address to your backend server
// For development: use your local IP or localhost
// For production: use your domain name
const API_BASE_URL = "https://api.abhinayportfolio.shop";

// ===============================
// API Helper Functions
// ===============================

// Generic GET request
export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    return { ok: response.ok, data, status: response.status };
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

// Generic POST request
export const apiPost = async (endpoint, body = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return { ok: response.ok, data, status: response.status };
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
};

// Generic PUT request
export const apiPut = async (endpoint, body = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return { ok: response.ok, data, status: response.status };
  } catch (error) {
    console.error("API PUT Error:", error);
    throw error;
  }
};

// Generic DELETE request
export const apiDelete = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    return { ok: response.ok, data, status: response.status };
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
};

// ===============================
// Specific API Functions
// ===============================

// Auth API
export const forgotPassword = async (email) => {
  return apiPost("/api/forgot-password/", { email });
};

export const verifyResetToken = async (token) => {
  return apiPost("/api/verify-reset-token/", { token });
};

export const resetPassword = async (token, password, confirmPassword) => {
  return apiPost("/api/reset-password/", {
    token,
    password,
    confirm_password: confirmPassword
  });
};

export const login = async (email, password) => {
  return apiPost("/api/verify/", { email, password });
};

export const register = async (userData) => {
  return apiPost("/api/register/", userData);
};

// Applications API
export const getApplications = () => {
  return apiGet("/api/applications/");
};

export const submitApplication = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/submit/`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    return { ok: response.ok, data, status: response.status };
  } catch (error) {
    console.error("Submit Application Error:", error);
    throw error;
  }
};

export const getApplicationStatus = async (trackingId, email) => {
  const params = new URLSearchParams();
  if (trackingId) params.append("tracking_id", trackingId);
  if (email) params.append("email", email);
  return apiGet(`/api/application-status/?${params.toString()}`);
};

// Payment API
export const createOrder = async (amount, applicationId) => {
  return apiPost("/api/create-order/", { amount, application_id: applicationId });
};

export const verifyPayment = async (orderId) => {
  return apiGet(`/api/verify-payment/${orderId}/`);
};

export const refundPayment = async (applicationId) => {
  return apiPost("/api/refund/", { application_id: applicationId });
};

// Colleges API
export const getAllColleges = () => {
  return apiGet("/api/allcolleges/");
};

export const addCollege = async (collegeData) => {
  return apiPost("/api/add_college/", collegeData);
};

// Certificate API
export const getCollegeCertificates = (collegeId) => {
  return apiGet(`/api/colleges/${collegeId}/certificates/`);
};

// Document API
export const downloadDocument = (documentId) => {
  return `${API_BASE_URL}/api/download/${documentId}/`;
};

// Notifications
export const sendNotification = async (email, subject, message) => {
  return apiPost("/api/send-notification/", { email, subject, message });
};

export const updateApplicationStatus = async (id, status, adminMessage, agent, rejectionReason, serviceFee) => {
  return apiPost(`/api/application/${id}/update-status/`, {
    status,
    admin_message: adminMessage,
    agent,
    rejection_reason: rejectionReason || null,
    service_fee: serviceFee || null
  });
};

// Certificate API
export const addCertificate = async (collegeId, certificateName, price) => {
  return apiPost("/api/add_certificate/", {
    college: collegeId,
    name: certificateName,
    price: price
  });
};

export const updateCertificate = async (certId, collegeId, certificateName, price) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/certificates/${certId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        college: collegeId,
        name: certificateName,
        price: price
      })
    });

    const data = await response.json();
    return { ok: response.ok, data, status: response.status };
  } catch (error) {
    console.error("Update Certificate Error:", error);
    throw error;
  }
};

export const deleteCertificate = async (certId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/certificates/${certId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    return { ok: response.ok, data, status: response.status };
  } catch (error) {
    console.error("Delete Certificate Error:", error);
    throw error;
  }
};

// Reviews API
export const getReviews = () => {
  return apiGet("/api/reviews/");
};

export const submitReview = (reviewData) => {
  return apiPost("/api/reviews/", reviewData);
};

// Verifications API
export const getVerifications = () => {
  return apiGet("/api/verifications/");
};

// Delivery API
export const getDeliveryRequests = () => {
  return apiGet("/api/delivery-requests/");
};

export const sendCourierEmailAPI = (email, trackingId, courierPartner) => {
  return apiPost("/api/send-courier-email/", {
    email,
    tracking_id: trackingId,
    courier_partner: courierPartner
  });
};

// Contact API
export const submitContact = (contactData) => {
  return apiPost("/api/contact/", contactData);
};

// ===============================
// AGENT PROCESSING MODULE APIs
// ===============================

export const agentLogin = (email, password) =>
  apiPost("/api/agent/login/", { email, password });

// Admin — Agent CRUD
export const getAgents = () => apiGet("/api/admin/agents/");
export const createAgent = (data) => apiPost("/api/admin/agents/", data);
export const updateAgent = (id, data) => apiPut(`/api/admin/agents/${id}/`, data);
export const deleteAgent = (id) => apiDelete(`/api/admin/agents/${id}/`);
export const toggleAgent = (id) => apiPost(`/api/admin/agents/${id}/toggle/`, {});

// Admin — Assignment
export const getEligibleAgents = (appId) =>
  apiGet(`/api/admin/applications/${appId}/eligible-agents/`);
export const assignAgent = (appId, agentId) =>
  apiPost(`/api/admin/applications/${appId}/assign-agent/`, { agent_id: agentId });
export const autoAssignAgent = (appId) =>
  apiPost(`/api/admin/applications/${appId}/auto-assign/`, {});
export const getApplicationAssignment = (appId) =>
  apiGet(`/api/admin/applications/${appId}/assignment/`);
export const getAllAssignments = () => apiGet("/api/admin/agent-assignments/");

// Agent — Their Assignments
export const getMyAssignments = (agentId) =>
  apiGet(`/api/agent/${agentId}/assignments/`);
export const getAssignmentDetail = (agentId, assignmentId) =>
  apiGet(`/api/agent/${agentId}/assignments/${assignmentId}/`);
export const acceptAssignment = (agentId, assignmentId) =>
  apiPost(`/api/agent/${agentId}/assignments/${assignmentId}/accept/`, {});
export const rejectAssignment = (agentId, assignmentId, reason) =>
  apiPost(`/api/agent/${agentId}/assignments/${assignmentId}/reject/`, { reason });
export const updateAssignmentStatus = (agentId, assignmentId, status, note) =>
  apiPost(`/api/agent/${agentId}/assignments/${assignmentId}/update-status/`, { status, note });

export const uploadCollectedDocument = (agentId, assignmentId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`${API_BASE_URL}/api/agent/${agentId}/assignments/${assignmentId}/upload-document/`, {
    method: "POST",
    body: formData,
  }).then(async (res) => ({ ok: res.ok, data: await res.json(), status: res.status }));
};

export const addLogistics = (agentId, assignmentId, courier_partner, tracking_id) =>
  apiPost(`/api/agent/${agentId}/assignments/${assignmentId}/add-logistics/`, { courier_partner, tracking_id });

export const saveVisitDetails = (agentId, assignmentId, data) =>
  apiPost(`/api/agent/${agentId}/assignments/${assignmentId}/visit/`, data);

export const getVisitDetails = (agentId, assignmentId) =>
  apiGet(`/api/agent/${agentId}/assignments/${assignmentId}/visit/get/`);

export const uploadVisitPhoto = (agentId, assignmentId, photoFile) => {
  const formData = new FormData();
  formData.append("photo", photoFile);
  return fetch(`${API_BASE_URL}/api/agent/${agentId}/assignments/${assignmentId}/visit/photos/`, {
    method: "POST",
    body: formData,
  }).then(async (res) => ({ ok: res.ok, data: await res.json(), status: res.status }));
};

export const submitUniversityDecision = (agentId, assignmentId, formData) => {
  return fetch(`${API_BASE_URL}/api/agent/${agentId}/assignments/${assignmentId}/decision/`, {
    method: "POST",
    body: formData,
  }).then(async (res) => ({ ok: res.ok, data: await res.json(), status: res.status }));
};

// ===============================
// Export Base URL for direct use
// ===============================
export { API_BASE_URL };

export default {
  API_BASE_URL,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  login,
  register,
  getApplications,
  submitApplication,
  getApplicationStatus,
  createOrder,
  verifyPayment,
  refundPayment,
  getAllColleges,
  addCollege,
  getCollegeCertificates,
  downloadDocument,
  sendNotification,
  updateApplicationStatus,
  addCertificate,
  deleteCertificate,
  getReviews,
  submitReview,
  getVerifications,
  getDeliveryRequests,
  sendCourierEmailAPI,
  submitContact,
  // Agent Module
  agentLogin,
  getAgents,
  createAgent,
  updateAgent,
  deleteAgent,
  toggleAgent,
  getEligibleAgents,
  assignAgent,
  autoAssignAgent,
  getApplicationAssignment,
  getAllAssignments,
  getMyAssignments,
  getAssignmentDetail,
  acceptAssignment,
  rejectAssignment,
  updateAssignmentStatus,
  uploadCollectedDocument,
  addLogistics,
  saveVisitDetails,
  getVisitDetails,
  uploadVisitPhoto,
  submitUniversityDecision,
};
