import React, { useState } from 'react';
import { Mail, Phone, BookOpen, User, CheckCircle, Loader } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    interestedCourse: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.interestedCourse) {
      alert('Please fill in all fields');
      return;
    }

    setStatus('loading');

    try {
      const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
      
      const formDataToSend = new FormData();
      formDataToSend.append('entry.1234567890', formData.fullName);
      formDataToSend.append('entry.0987654321', formData.email);
      formDataToSend.append('entry.1122334455', formData.mobile);
      formDataToSend.append('entry.5566778899', formData.interestedCourse);

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      });

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        interestedCourse: ''
      });

      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const courses = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Marketing',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-black py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Enroll Now
          </h1>
          <p className="text-gray-400 text-base">
            Start your learning journey with us. Fill in your details below.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
          
          {/* Form Section */}
          <div className="p-6 md:p-8">
            <div className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-orange-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-orange-500/50 focus:border-orange-500 transition-all
                           hover:border-gray-600"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-orange-500/50 focus:border-orange-500 transition-all
                           hover:border-gray-600"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-orange-500" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-orange-500/50 focus:border-orange-500 transition-all
                           hover:border-gray-600"
                  placeholder="10-digit mobile number"
                />
              </div>

              {/* Interested Course */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-orange-500" />
                  Interested Course
                </label>
                <select
                  name="interestedCourse"
                  value={formData.interestedCourse}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 
                           focus:border-orange-500 transition-all cursor-pointer hover:border-gray-600"
                >
                  <option value="" className="bg-gray-900">Select a course</option>
                  {courses.map((course) => (
                    <option key={course} value={course} className="bg-gray-900">
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 
                         hover:from-orange-600 hover:to-orange-700 text-white font-semibold 
                         rounded-lg shadow-lg shadow-orange-500/20 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center 
                         justify-center gap-2 hover:shadow-orange-500/30 hover:scale-[1.02]
                         active:scale-[0.98]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Enrollment'
                )}
              </button>

              {/* Success/Error Messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/40 
                              rounded-lg text-green-400 text-sm animate-in fade-in slide-in-from-top-2">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <p>Thank you! Your enrollment request has been submitted successfully.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/40 
                              rounded-lg text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                  <p>Something went wrong. Please try again or contact us directly.</p>
                </div>
              )}

            </div>
          </div>

          {/* Contact Info Footer */}
          <div className="bg-black/30 px-6 py-4 border-t border-gray-800">
            <p className="text-gray-400 text-center text-xs md:text-sm">
              Need help? Contact us at{' '}
              <a href="mailto:support@yourwebsite.com" className="text-orange-500 hover:text-orange-400 transition-colors">
                support@yourwebsite.com
              </a>
              {' '}or call{' '}
              <a href="tel:+911234567890" className="text-orange-500 hover:text-orange-400 transition-colors">
                +91 12345 67890
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactPage;