import React, { useState } from 'react';
import { Mail, AlertCircle, Send, Copy, Check } from 'lucide-react';

const EmailTemplateManager = () => {
  const [userName, setUserName] = useState('Abhi');
  const [userEmail, setUserEmail] = useState('user@example.com'); 
  const [issueType, setIssueType] = useState('Document Issue');
  const [exactProblem, setExactProblem] = useState('The uploaded ID proof is blurred and unreadable.');
  const [copied, setCopied] = useState(false);

  const companyName = "100 transcripts";

  const emailBody = `Dear ${userName},

We have reviewed your request, and there is an issue that requires your attention.

Issue Details:
• Type: ${issueType}
• Details: ${exactProblem}

What You Need to Do:
• Please review the issue and take the necessary action.
• Upload correct documents / complete payment / provide required information.
• Ensure all details are accurate and up to date.

Next Steps:
Once the issue is resolved, your request will be processed without delay.

If you have already completed the required action, please ignore this message.
For any assistance, feel free to contact our support team.

Best regards,
${companyName} Support Team`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ NEW: FUNCTION TO OPEN EMAIL CLIENT
  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Action Required: ${issueType} for your Request`);
    const body = encodeURIComponent(emailBody);
    window.location.href = `mailto:${userEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Mail className="text-blue-600" /> Issue Notification Generator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Configuration Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <h2 className="font-semibold text-gray-700 mb-2">Issue Configuration</h2>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">User Name</label>
              <input 
                type="text" 
                className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">User Email Address</label>
              <input 
                type="email" 
                className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="enter recipient email..."
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Issue Category</label>
              <select 
                className="w-full border rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
              >
                <option>Document Issue</option>
                <option>Payment Issue</option>
                <option>Missing Information</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Exact Problem Description</label>
              <textarea 
                rows="4"
                className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Explain the problem clearly..."
                value={exactProblem}
                onChange={(e) => setExactProblem(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side: Live Preview */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 relative">
            <div className="flex justify-between items-center mb-4 border-b pb-2 text-slate-900">
              <h2 className="font-semibold text-blue-800">Email Preview</h2>
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-1 text-xs px-3 py-1 rounded transition ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {copied ? <Check size={14}/> : <Copy size={14}/>}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
            
            <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans italic bg-gray-50 p-4 rounded-lg">
              {emailBody}
            </pre>

            {/* ✅ UPDATED BUTTON TO CALL handleSendEmail */}
            <button 
              onClick={handleSendEmail}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
            >
              <Send size={18} /> Send Notification
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
          <AlertCircle className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-800">
            <strong>Note:</strong> Clicking "Send" will open your default mail app with the recipient, subject, and body pre-filled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateManager;