import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import ReCAPTCHA from "react-google-recaptcha";

const categories = ["Access Issue", "Feedback", "Ticketing"];
const priorities = ["High", "Medium", "Low"];

const CreateTicketForm = ({ onBack }) => {
  const [form, setForm] = useState({
    ticketNo: "",
    date: "",
    name: "",
    department: "",
    subject: "",
    category: categories[0],
    type: "",
    priority: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const recaptchaRef = React.useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaRef.current || !recaptchaRef.current.getValue()) {
      alert("Please confirm you are not a robot.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert("Ticket submitted! (Demo)");
      onBack && onBack();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="flex justify-center items-center min-h-[80vh]"
    >
      <Card className="w-full max-w-xl p-8 rounded-2xl shadow-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white font-[Poppins]">Create New Ticket</h2>
          <button
            onClick={onBack}
            className="text-sm px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition font-semibold"
            type="button"
          >
            Back
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Ticket No.</label>
              <input
                type="text"
                name="ticketNo"
                value={form.ticketNo}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Department</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Type</label>
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                required
              >
                <option value="" disabled>Select Priority</option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
              required
            />
          </div>
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY"}
              onChange={setRecaptchaValue}
              theme="light"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-lg shadow-md hover:from-teal-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 mt-2 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
      </Card>
    </motion.div>
  );
};

export default CreateTicketForm; 