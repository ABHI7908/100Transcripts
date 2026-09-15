import React from "react";

const RefundCancellation = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* BLUR */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* CARD */}
      <div className="relative z-10 w-[95%] max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/20">

        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 text-white rounded-t-3xl border-b border-white/10">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Refund & Cancellation Policy
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto max-h-[75vh] px-8 py-6 space-y-6 text-[15px] leading-7 text-gray-700">

          {/* Cancellation */}
          {/* Cancellation */}
<h3 className="text-lg font-bold text-[#2f4a6d] border-l-4 border-[#2f4a6d] pl-3">
  Cancellation policy
</h3>

<p>
  100 Transcripts LLP believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
</p>

<p>
  Cancellations will be considered only if the request is made within 24 hours of placing an order.
</p>

<p>
  However, the cancellation request will not be entertained if the orders have been communicated to the operational team and Operations team has initiated the process of assignment. Cancellation and refund of fees or charges will be strictly governed by the Company Refund Policy of the company informed and declared from time to time.
</p>

<p>
  There is no cancellation of orders placed under the Same day delivery category.
</p>

<p>
  No cancellations are entertained for those products/services that the 100 Transcripts LLP marketing team has obtained on special discounts and offers on occasions like New Year, Pongal, Diwali, Independence Day, Foundation Day etc. These are limited occasion offers and therefore cancellations are not possible.
</p>

{/* Refund */}
<h3 className="text-lg font-bold text-[#2f4a6d] border-l-4 border-[#2f4a6d] pl-3">
  Refund Policy
</h3>

<p>
  When you buy our products/services, your purchase is covered by our 24 hours money back guarantee.
</p>

<p>
  If you are, for any reason, not entirely happy with your purchase, we will cheerfully issue a full refund of service charge/processing fee, subject to deductions for legal documents or services provided.
</p>

<p>
  To request a refund of service charge/processing fee under this guarantee, you must contact us within the first 24 hours of your payment.
</p>

<p>
  Just send an email to <a href="mailto:support@100Transcripts.com" className="text-blue-600 underline">
  support@100Transcripts.com
</a>, we’ll gladly refund you 100% of your service charge/processing fee within 24-72 hours of your refund request.
</p>
        </div>
      </div>
    </div>
  );
};

export default RefundCancellation;