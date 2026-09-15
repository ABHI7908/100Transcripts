import React from "react";

const PrivacyPolicy = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      
      {/* 🔥 BLUR BACKGROUND */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 🔥 CARD */}
     <div className="relative z-10 w-[95%] max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/20">
  
  {/* HEADER */}
  <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 text-white rounded-t-3xl border-b border-white/10">
    <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white">
  Privacy Policy
</h2>
    <button
      onClick={onClose}
      className="text-white hover:text-gray-200 text-xl"
    >
      ✕
    </button>
  </div>

  {/* CONTENT SCROLL */}
  <div className="overflow-y-auto max-h-[75vh] px-8 py-6 space-y-6 text-[15px] leading-7 text-gray-700">

          <p className="text-lg font-semibold text-gray-900 border-b pb-2">
  Privacy Policy 100 Transcripts LLP
</p>

          <p>
            At 100 Transcripts LLP, we are dedicated to maintaining the privacy of your personal and monetary information. This Privacy Policy intends to give details of the types of Personally Identifiable Information or Non-Personally Identifiable Information we collect, how the info is acquired, how we use it, and the options you have concerning our use of, and your aptitude to evaluate and approve, the information.
          </p>

         <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Information we collect</h3>

          <p>
            100 Transcripts LLP collects information by an assortment of ways including information dynamically provided by its sponsors, inhabitants, and applicants, website visitors in addition to the data resulting from the completion of assessments, surveys, and common feedback forms.
          </p>

          <p>
            The kind of personal information we collect takes account of but is not restricted to name, contact info, IDs, credentials, credit information, bank information and place of citizenship. We might also record calls to or from 100 Transcripts LLP for the reason of accurateness, performance reviews, training, and all-purpose quality assertion.
          </p>

        <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Using information about you</h3>

          <p>
            100 Transcripts LLP does not sell or share client information to dealers outside of our corporation, without your permission.
          </p>

          <p>
            We might share your Personally Identifiable Information with others just in few restricted state of affairs:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Within our business group or amongst our allied entities that follow our privacy guidelines;</li>
            <li>With our service providers who consent to keep the info off the record and use it only on our behalf;</li>
            <li>If your venture is transferred to a new warden, we give your general information, tax ID number and other transfer credentials to the warden taking over the deal on your behalf;</li>
            <li>As approved by you otherwise.</li>
          </ul>

          <p>
            In a small number of cases, we may be needed to reveal specific information to act following the law, an investigation or an officially authorized process. We might disclose information when we consider that such a release is logically needed to implement or protect our rights.
          </p>

          <p>
            100 Transcripts LLP serves solely as a facilitator between applicants and universities. We have no authority to modify the procedures, data, or timelines established by the respective universities or boards.
          </p>

          <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Protecting your information</h3>

          <p>
            Our policy is to confine access to your Personally Identifiable Information to only those staff, service providers, and other third parties who have to know that info to offer products or services to you. We preserve commercially sound physical, electronic and technical protection and different appropriate standards as required by law.
          </p>

          <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Cookies</h3>

          <p>
            Cookies are files with little information, which may consist of a unique anonymous identifier. Cookies are driven to your browser from our website and stored on your PC’s hard drive. Like more than a few websites, we make use of “cookies” to collect data. You can instruct your browser to turn down all cookies or to point out when a cookie is being sent. Nevertheless, if you do not accept cookies, you might not be able to use some segments of our website.
          </p>

          <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Log Data</h3>

          <p>
            Like a lot of website operators, we collect data that your browser sends every time you visit our website (“Log Data”).
          </p>

          <p>
            This Log Data might take account of information such as your PC’s Internet Protocol (“IP”) address, type of browser, version of the browser, the pages of our website that you visit, the time as well as the date of your visit, the time used up on those WebPages and other figures.
          </p>

          <p>
            Moreover, we might use third-party services such as Google Analytics that collect, scrutinize and examine the above.
          </p>

          <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Security</h3>

          <p>
            The absolute protection of your personal info is our utmost priority. However, keep in mind that no way of data transmission over the Internet or the technique of electronic storage is 100% secure. Though we do our best to use commercially adequate ways to guard your Personal Information, we cannot promise total security.
          </p>

          <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Third-Party Websites</h3>

          <p>
            You might be able to access third-party websites right from 100 Transcripts LLP website. This Privacy Policy does not be relevant when you access such websites. We cannot be in charge of how third parties might use the personal information you make known to them, so you are supposed to cautiously assess the privacy policy of any third-party website you visit before using it or revealing your personal information to its provider.
          </p>

          <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Changes to this Privacy Policy</h3>

          <p>
            This Privacy Policy is effectual as of November 09, 2018 and will remain in effect with the exception to any modifications in its provisions in the future that would be effectual right after being posted on this web page.
          </p>

          <p>
            We keep the right to update or modify our Privacy Policy at any time, and you must check this Privacy Policy from time to time. Your constant use of the Service after we post any changes to the Privacy Policy on this web page will make up your acknowledgment of the changes and your permission to put up with and be bound by the updated Privacy Policy.
          </p>

          <h3 className="text-lg font-bold text-[#2f4a6d] mt-6 mb-2 border-l-4 border-[#2f4a6d] pl-3">Contact Us</h3>

          <p>
            If you have any further queries about this Privacy Policy, feel free to contact us.
          </p>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;