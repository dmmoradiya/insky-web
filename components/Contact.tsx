'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Product Inquiry',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all required fields.');
      return;
    }
    
    setStatus('Sending your inquiry...');
    try {
      const response = await fetch('https://formsubmit.co/ajax/easchemiindustries@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          'inquiry-type': formData.type,
          message: formData.message,
          _subject: `INSKY Website Inquiry - ${formData.type} from ${formData.name}`,
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setStatus('Thank you! Your inquiry has been sent successfully.');
        setFormData({
          name: '',
          email: '',
          type: 'Product Inquiry',
          message: '',
        });
      } else {
        setStatus('Failed to send inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('Failed to send inquiry. Please try again.');
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-margin-desktop bg-surface-container-low" id="contact">
      <div className="max-w-container-max mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Coordinates */}
        <div className="lg:w-1/3 space-y-12">
          <div>
            <span className="font-label-caps text-label-caps text-primary block">GET IN TOUCH</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md font-medium text-primary mt-4">
              Let's Connect
            </h2>
          </div>
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary text-2xl">call</span>
              <div>
                <p className="font-label-caps text-xs tracking-wider uppercase text-on-surface-variant font-semibold">
                  Phone
                </p>
                <p className="font-body-md text-base text-primary mt-1">+91 78629 99106</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary text-2xl">mail</span>
              <div>
                <p className="font-label-caps text-xs tracking-wider uppercase text-on-surface-variant font-semibold">
                  Email
                </p>
                <p className="font-body-md text-base text-primary mt-1">
                  <a href="mailto:easchemiindustries@gmail.com" className="hover:underline transition-all">
                    easchemiindustries@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
              <div>
                <p className="font-label-caps text-xs tracking-wider uppercase text-on-surface-variant font-semibold">
                  HQ Location
                </p>
                <p className="font-body-md text-base text-primary mt-1">Surat, Gujarat, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:w-2/3">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-10" onSubmit={handleSubmit}>
            <div className="border-b border-primary/20 pb-4">
              <label className="font-label-caps text-xs text-primary font-semibold block mb-2">FULL NAME</label>
              <input
                className="w-full bg-transparent border-none p-0 focus:ring-0 placeholder:opacity-30 text-primary text-base font-body-md focus:outline-none"
                placeholder="Johnathan Doe"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="border-b border-primary/20 pb-4">
              <label className="font-label-caps text-xs text-primary font-semibold block mb-2">EMAIL ADDRESS</label>
              <input
                className="w-full bg-transparent border-none p-0 focus:ring-0 placeholder:opacity-30 text-primary text-base font-body-md focus:outline-none"
                placeholder="john@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="border-b border-primary/20 pb-4 md:col-span-2">
              <label className="font-label-caps text-xs text-primary font-semibold block mb-2">INQUIRY TYPE</label>
              <select
                className="w-full bg-transparent border-none p-0 focus:ring-0 appearance-none text-primary text-base font-body-md focus:outline-none cursor-pointer"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option>Product Inquiry</option>
                <option>Business Partnership</option>
                <option>Hospitality Amenity</option>
                <option>Other</option>
              </select>
            </div>
            <div className="border-b border-primary/20 pb-4 md:col-span-2">
              <label className="font-label-caps text-xs text-primary font-semibold block mb-2">YOUR MESSAGE</label>
              <textarea
                className="w-full bg-transparent border-none p-0 focus:ring-0 placeholder:opacity-30 resize-none text-primary text-base font-body-md focus:outline-none"
                placeholder="How can we assist you today?"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 pt-2">
              {status && (
                <p className={`text-sm mb-4 font-body-md ${status.includes('successfully') ? 'text-green-600' : 'text-primary'}`}>
                  {status}
                </p>
              )}
              <button
                className="px-16 py-5 bg-primary text-white font-button text-button uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded shadow cursor-pointer"
                type="submit"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
