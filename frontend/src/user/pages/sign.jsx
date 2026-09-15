import React from "react";

export default function Sign() {

  const handleDigiLogin = () => {
    const url = "https://digilocker.meripehchaan.gov.in/signinv2/oauth_partner/%252Foauth2%252F1%252Fconsent%253Flogo%253D1740831724_100Transcriptslogo.jpg%2526pla%253DY%2526ui_locales%253Den%2526acr%253Daadhaar%252Bpan%252Bemail%252Bmobile%2526amr%253Dpan%252Baadhaar%2526response_type%253Dcode%2526client_id%253DAYAEC7E389%2526state%253Doidc_flow%2526redirect_uri%253Dhttps%25253A%25252F%25252F100transcripts.com%25252Fdigilocker-verification%25252F%2526code_challenge%253D1Iqcd3gv8tFGYZfaQHKDexA6I3vnStkQCYcAY11lP9s%2526code_challenge_method%253DS256%2526scope%253Dfiles.issueddocs%252Bfiles.uploadeddocs%2526orgid%253D092515%2526txn%253D69f0919435d12oauth21777373588%2526hashkey%253De3b6897759b296037819aee033911c93bc4e9d9942da1502488b75ab3a023e9e%2526requst_pdf%253DY%2526app_name%253DMTAwIFRyYW5zY3JpcHRzIGRvY3VtZW50cw%25253D%25253D%2526signup%253Dsignup";

    window.location.href = url;
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f7fb"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "20px",
        width: "400px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <h2>Verify Your Identity</h2>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>
          Securely authenticate using your DigiLocker account
        </p>

        <button
          onClick={handleDigiLogin}
          style={{
            background: "#1e3a8a",
            color: "#fff",
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold"
          }}
        >
          Sign in with DigiLocker →
        </button>
      </div>
    </div>
  );
}