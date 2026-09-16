import React, { useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Github, Linkedin, Instagram } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL, EMAIL_ADDRESS } from './Hero';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

interface FormState {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.from_name.trim()) errors.from_name = 'Name is required.';
  if (!form.from_email.trim()) errors.from_email = 'Email is required.';
  else if (!isValidEmail(form.from_email)) errors.from_email = 'Enter a valid email address.';
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<FormState>({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);
    setErrors({});

    try {
      // 1. Primary Direct Delivery via FormSubmit AJAX to bisworanjanpalar@gmail.com
      const res = await fetch("https://formsubmit.co/ajax/bisworanjanpalar@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `Portfolio Contact: ${form.subject}`,
          name: form.from_name,
          email: form.from_email,
          subject: form.subject,
          message: form.message
        })
      });

      const isEmailJSConfigured = Boolean(
        EMAILJS_SERVICE_ID && EMAILJS_SERVICE_ID !== 'service_xxxxxxx' &&
        EMAILJS_TEMPLATE_ID && EMAILJS_TEMPLATE_ID !== 'template_xxxxxxx' &&
        EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'xxxxxxxxxxxxxxxxxxxxxx'
      );

      // 2. Secondary EmailJS sending if credentials set
      if (isEmailJSConfigured) {
        try {
          emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY! });
          await emailjs.sendForm(
            EMAILJS_SERVICE_ID!,
            EMAILJS_TEMPLATE_ID!,
            formRef.current!,
            { publicKey: EMAILJS_PUBLIC_KEY! }
          );
        } catch (emailJsErr) {
          console.warn('[Contact] EmailJS secondary delivery fallback:', emailJsErr);
        }
      }

      setToast({
        type: 'success',
        message: 'Message processed! Note: If this is the first time using FormSubmit for your email, check bisworanjanpalar@gmail.com (Inbox/Spam) and click "Activate FormSubmit" once to start receiving entries directly.',
      });
      setForm({ from_name: '', from_email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setToast({
        type: 'error',
        message: 'Could not send message automatically. Please click "Open Email App" below to send directly.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const mailtoLink = `mailto:bisworanjanpalar@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${form.from_name}\nEmail: ${form.from_email}\n\nMessage:\n${form.message}`)}`;

  return (
    <section id="contact" className="py-10 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border max-w-md ${
            toast.type === 'success'
              ? 'bg-[#0d1f18] border-green-500/40 text-green-400'
              : 'bg-[#1f0d0d] border-red-500/40 text-red-400'
          } animate-in slide-in`}
          role="alert"
        >
          {toast.type === 'success' ? <CheckCircle size={20} className="mt-0.5" /> : <AlertCircle size={20} className="mt-0.5" />}
          <div className="flex-1">
            <p className="font-semibold text-sm">{toast.type === 'success' ? 'Message Sent!' : 'Send Error'}</p>
            <p className="text-xs opacity-90 mt-1 leading-relaxed">{toast.message}</p>
            <a
              href={`mailto:bisworanjanpalar@gmail.com?subject=Portfolio%20Contact&body=Hi%20Bisworanjan,`}
              className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-fuchsia-400 hover:underline"
            >
              <Mail size={12} /> Open Direct Email
            </a>
          </div>
          <button onClick={() => setToast(null)} className="text-lg leading-none opacity-60 hover:opacity-100">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Get In Touch</h2>
            <p className="text-sm text-gray-400">
              Have an AI project, collaboration inquiry, or job opportunity? Reach out directly!
            </p>
          </div>

          <div className="space-y-4">
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="flex items-center gap-4 p-3.5 bg-[#13141C] border border-[#1F212A] rounded-xl hover:border-fuchsia-500/40 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1A1C23] border border-[#2A2D3A] flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-500/10">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email</p>
                <p className="text-sm text-white font-medium">{EMAIL_ADDRESS}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-3.5 bg-[#13141C] border border-[#1F212A] rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1A1C23] border border-[#2A2D3A] flex items-center justify-center text-blue-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Phone</p>
                <p className="text-sm text-white font-medium">+91 784 899 1691</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3.5 bg-[#13141C] border border-[#1F212A] rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1A1C23] border border-[#2A2D3A] flex items-center justify-center text-purple-400">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Location</p>
                <p className="text-sm text-white font-medium">Bhubaneswar, Odisha, India</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#13141C] border border-[#1F212A] hover:border-fuchsia-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#13141C] border border-[#1F212A] hover:border-blue-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#13141C] border border-[#1F212A] hover:border-pink-500/40 text-gray-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <Instagram size={14} /> Instagram
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4 bg-[#13141C] border border-[#1F212A] p-6 md:p-8 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  name="from_name"
                  value={form.from_name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  disabled={isSending}
                  className={`w-full bg-[#1A1C23] border ${errors.from_name ? 'border-red-500/60' : 'border-[#2A2D3A]'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 transition-colors`}
                />
                {errors.from_name && <p className="mt-1 text-xs text-red-400">{errors.from_name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Your Email *</label>
                <input
                  type="email"
                  name="from_email"
                  value={form.from_email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  disabled={isSending}
                  className={`w-full bg-[#1A1C23] border ${errors.from_email ? 'border-red-500/60' : 'border-[#2A2D3A]'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 transition-colors`}
                />
                {errors.from_email && <p className="mt-1 text-xs text-red-400">{errors.from_email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Subject *</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. AI Project Collaboration Inquiry"
                disabled={isSending}
                className={`w-full bg-[#1A1C23] border ${errors.subject ? 'border-red-500/60' : 'border-[#2A2D3A]'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 transition-colors`}
              />
              {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={5}
                disabled={isSending}
                className={`w-full bg-[#1A1C23] border ${errors.message ? 'border-red-500/60' : 'border-[#2A2D3A]'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 transition-colors resize-none`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/20"
            >
              {isSending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending Message...
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
