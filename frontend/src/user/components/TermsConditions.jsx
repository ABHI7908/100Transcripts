import React from "react";

const TermsConditions = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* BLUR */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* CARD */}
     <div className="relative z-10 w-[95%] max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-gray-200">

        {/* HEADER */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 text-white rounded-t-3xl border-b border-white/10">
          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white">
            Terms & Conditions
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>
        <div className="h-[1px] bg-gray-200 w-full"></div>

        {/* CONTENT */}
        <div className="overflow-y-auto max-h-[75vh] px-8 py-6 space-y-6 text-[15px] leading-7 text-gray-700">

          <h3 className="text-lg font-bold text-[#2f4a6d] border-l-4 border-[#2f4a6d] pl-3">
            Terms and Conditions
          </h3>

          <p>
            This Terms of Use Agreement was last updated: October 31st, 2018. This Terms of Use agreement is effective as of October 1, 2018.
          </p>

          <p>
            100 Transcripts LLP primarily operates controls and manages the Services provided by it from its office at New Avantika’s Orchid, Plot no. 801, Mathrusree Nagar, Hyderabad, Telangana 500049.
          </p>

          <p>
            We are NOT an agent of any Govt. Office/ Department/ Authority.
          </p>

          <p>
            We act as the only Representative / Authorized Company to expedite your document from the concerned University/ College/ Authority by proper channel and save you Time & Energy.
          </p>

          <p>
            We process & provide a professional review of your document’s application to assure the fastest possible processing.
          </p>

          <p>
            The final decision regarding the procurement of documents/verifications/timelines is solely determined by your educational institution and the receiving organization. 100 Transcripts LLP does not have any authority to intervene in the verification process.
          </p>

          <p>
            We manage the entire application process i.e. Document Preparation/ Review, and assist you if the application gets stuck.
          </p>

          <p>
            Visit the Website of the concerned University/ Department/Authority for precise and latest information.
          </p>

          {/* NOTE */}
<div className="space-y-6 text-gray-700 text-[15px] leading-7">

  {/* A Section */}
  <div>
    <h3 className="text-xl font-bold text-[#2f4a6d] mb-3">
      A. Acceptance of Terms
    </h3>

    <ul className="list-disc pl-6 space-y-3">
      <li>
        These Terms of Use define your rights, obligations, and limits while using
        100 Transcripts LLP website and services.
      </li>

      <li>
        The Website is owned and operated by 100 Transcripts LLP.
      </li>

      <li>
        By using this Website, you agree that:
        <ul className="list-decimal pl-6 mt-2 space-y-2">
          <li>You are a Professional or potential Service User.</li>
          <li>You agree to follow all Terms & Conditions.</li>
          <li>You authorize payments for requested services.</li>
          <li>You agree to all policies and legal conditions.</li>
        </ul>
      </li>
    </ul>
  </div>

  {/* Modifications */}
  <div>
    <h3 className="text-lg font-bold text-[#2f4a6d] mb-3">
      1. Modifications
    </h3>

    <ul className="list-disc pl-6 space-y-2">
      <li>
        100 Transcripts LLP can update or modify Terms & Conditions anytime.
      </li>

      <li>
        Updated terms will be posted on the official website.
      </li>
    </ul>
  </div>

  {/* Membership */}
  <div>
    <h3 className="text-xl font-bold text-[#2f4a6d] mb-3">
      B. Membership and Accessibility
    </h3>

    <div className="space-y-4">

      {/* License */}
      <div>
        <h4 className="font-semibold text-[#2f4a6d]">
          1. License to Access
        </h4>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            Users receive a non-exclusive and revocable license to use the Website.
          </li>

          <li>
            Users must not copy or distribute Website content without permission.
          </li>

          <li>
            Users must follow all applicable laws and policies.
          </li>
        </ul>
      </div>

      {/* Eligibility */}
      <div>
        <h4 className="font-semibold text-[#2f4a6d]">
          2. Membership Eligibility Criteria
        </h4>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            Users must be at least 18 years old.
          </li>

          <li>
            Registration information must be accurate and updated.
          </li>

          <li>
            Users can create password-protected accounts.
          </li>

          <li>
            Users are responsible for unauthorized use of their account.
          </li>
        </ul>
      </div>

      {/* Account Policies */}
      <div>
        <h4 className="font-semibold text-[#2f4a6d]">
          Account Policies
        </h4>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>No copying or distribution of Website content.</li>
          <li>No modification of Website functionality.</li>
          <li>Provide accurate and updated information.</li>
          <li>No bots, scrapers, or automated systems allowed.</li>
          <li>No spam or server overload activities.</li>
          <li>No unauthorized business solicitation.</li>
          <li>No harvesting personal user data.</li>
        </ul>
      </div>

      {/* Additional Policies */}
      <div>
        <h4 className="font-semibold text-[#2f4a6d]">
          3. Additional Policies
        </h4>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            Usage of the Website is subject to additional rules and policies.
          </li>

          <li>
            Copyright and content restrictions may apply.
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* Member Conduct */}
  <div>
    <h3 className="text-xl font-bold text-[#2f4a6d] mb-3">
      C. Member Conduct
    </h3>

    <div className="space-y-4">

      <div>
        <h4 className="font-semibold text-[#2f4a6d]">
          1. Prohibited Content
        </h4>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>No fake or misleading information.</li>
          <li>No abusive, hateful, illegal, or explicit content.</li>
          <li>No copyrighted or pirated content.</li>
          <li>No spam, phishing, or harmful software.</li>
          <li>No impersonation of others.</li>
          <li>No collection of private user information.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-[#2f4a6d]">
          2. Message Restrictions
        </h4>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>No scam payment offers.</li>
          <li>No unsolicited advertisements.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-[#2f4a6d]">
          3. No Discrimination
        </h4>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>
            Discrimination based on race, religion, gender, or disability is prohibited.
          </li>

          <li>
            Violating posts may be removed without notice.
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-[#2f4a6d]">
          4. Feedback Rules
        </h4>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Feedback must be fair and genuine.</li>
          <li>No threatening or fake reviews allowed.</li>
          <li>Violations may lead to account suspension.</li>
        </ul>
      </div>
    </div>
  </div>

</div>

        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
