"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const nameRegex = /^[a-zA-Z\s'.-]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const messageRegex = /\S+/;

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "danger";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const isNameValid = nameRegex.test(formData.name.trim());
  const isEmailValid = emailRegex.test(formData.email.trim());
  const isMessageValid = messageRegex.test(formData.message.trim());

  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  const showToast = (message: string, type: "success" | "danger" = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isFormValid) return;

    setLoading(true);

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          message: formData.message.trim(),
          to_name: "Abhijeet",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      showToast("Email sent successfully", "success");
      setFormData({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch {
      showToast("Failed to send email", "danger");
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (isValid: boolean, isTouched: boolean) => {
    if (!isTouched) {
      return "focus-visible:border-[#ffdb70] focus-visible:ring-[#ffdb70]";
    }
    return isValid
      ? "border-[#bca358] focus-visible:ring-[#bca358] focus-visible:border-[#bca358]"
      : "border-[#b84c4c] focus-visible:ring-[#b84c4c] focus-visible:border-[#b84c4c]";
  };

  return (
    <section id="contact" className="portfolio-container relative">
      <h2 className="text-2xl sm:text-[28px] font-bold text-[#fafafa] mb-6 pb-2 border-b border-[#383838]">
        Contact
      </h2>

      <form id="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <Input
              type="text"
              name="name"
              id="fullname"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              placeholder="Full name"
              required
              aria-invalid={touched.name && !isNameValid}
              className={getInputClass(isNameValid, touched.name)}
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              placeholder="Email address"
              required
              aria-invalid={touched.email && !isEmailValid}
              className={getInputClass(isEmailValid, touched.email)}
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={() => handleBlur("message")}
              placeholder="Your Message"
              rows={4}
              required
              aria-invalid={touched.message && !isMessageValid}
              className={getInputClass(isMessageValid, touched.message)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            id="message-btn"
            type="submit"
            disabled={loading || (touched.name && !isFormValid)}
            className="gold-btn !py-3.5 !px-6 text-[15px] flex items-center gap-2 cursor-pointer disabled:grayscale disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
          >
            <div className="w-5 h-5 flex-shrink-0">
              <Image
                src="/assets/icons/paper-plane.svg"
                alt="paper plane icon"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            <span>Send Message</span>
          </button>
        </div>
      </form>

      {/* Floating Alert Toast */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-[1500] flex items-center px-5 py-3 rounded-lg text-sm shadow-xl toast-bounce border ${
            toast.type === "success"
              ? "bg-[hsl(128,28%,11%)] border-[hsl(128,28%,20%)] text-[#5dab61]"
              : "bg-[hsl(0,28%,11%)] border-[hsl(0,28%,20%)] text-[#de3d32]"
          }`}
        >
          <span className="mr-2">
            {toast.type === "success" ? "✓" : "⚠"}
          </span>
          {toast.message}
        </div>
      )}

      {/* Pulsing Loading Dots */}
      {loading && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1.5 bg-[#1e1e1f] px-4 py-2 rounded-full border border-[#383838] shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-[#fafafa] dot-pulse" style={{ animationDelay: "0s" }} />
          <div className="w-2.5 h-2.5 rounded-full bg-[#fafafa] dot-pulse" style={{ animationDelay: "0.25s" }} />
          <div className="w-2.5 h-2.5 rounded-full bg-[#fafafa] dot-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
      )}
    </section>
  );
}
