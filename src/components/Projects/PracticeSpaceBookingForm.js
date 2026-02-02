import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FORMSPREE_URL = process.env.REACT_APP_FORMSPREE_URL;

function PracticeSpaceBookingForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bandMembers, setBandMembers] = useState("");
  const [bandName, setBandName] = useState("");
  const [requestedDateTime, setRequestedDateTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ firstName: null, lastName: null, phone: null });

  const validateFirstName = (value) => {
    const t = (value || "").trim();
    return t ? null : "First name is required.";
  };
  const validateLastName = (value) => {
    const t = (value || "").trim();
    return t ? null : "Last name is required.";
  };
  const validatePhone = (value) => {
    const digits = (value || "").replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) return "Enter a valid phone number (10–15 digits, numbers only).";
    return null;
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setPhone(digitsOnly);
  };

  const formatDateTime = (date) => {
    if (!date) return "";
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const firstNameErr = validateFirstName(firstName);
    const lastNameErr = validateLastName(lastName);
    const phoneErr = validatePhone(phone);
    setFieldErrors({
      firstName: firstNameErr,
      lastName: lastNameErr,
      phone: phoneErr,
    });

    if (firstNameErr || lastNameErr || phoneErr) return;
    if (!bandMembers.trim() || !bandName.trim() || !requestedDateTime) {
      setError("Please fill in all required fields.");
      return;
    }

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    if (!FORMSPREE_URL || FORMSPREE_URL.includes("xxxxxxxx")) {
      setError("Form is not configured. Add REACT_APP_FORMSPREE_URL to your .env file.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("contact_name", `${trimmedFirst} ${trimmedLast}`);
      formData.append("phone", phone);
      formData.append("band_members", bandMembers.trim());
      formData.append("band_name", bandName.trim());
      formData.append("requested_datetime", formatDateTime(requestedDateTime));

      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setFirstName("");
        setLastName("");
        setPhone("");
        setBandMembers("");
        setBandName("");
        setRequestedDateTime(null);
      } else {
        setError(data.error || "Something went wrong, please try again.");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const INPUT_BASE =
    "w-full rounded-lg border-2 border-black dark:border dark:border-gray-600 bg-white dark:bg-dark-charcoal px-3 py-2 text-black dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent transition-colors";
  const inputClass = (fieldKey) =>
    fieldErrors[fieldKey] ? `${INPUT_BASE} border-red-500 dark:border-red-500` : INPUT_BASE;

  if (submitted) {
    return (
      <div
        id="booking-form"
        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/5 dark:bg-dark-charcoal/50 p-6 max-w-xl mx-auto my-8"
      >
        <p className="text-lg text-gray-800 dark:text-gray-200 text-center">
          Thanks, we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <section
      id="booking-form"
      className="max-w-xl mx-auto my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/5 dark:bg-dark-charcoal/50 p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Request a session time
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              First name <span className="text-red-500">*</span>
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (fieldErrors.firstName) setFieldErrors((prev) => ({ ...prev, firstName: null }));
              }}
              onBlur={() => setFieldErrors((prev) => ({ ...prev, firstName: validateFirstName(firstName) }))}
              className={inputClass("firstName")}
              placeholder="First name"
              required
            />
            {fieldErrors.firstName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (fieldErrors.lastName) setFieldErrors((prev) => ({ ...prev, lastName: null }));
              }}
              onBlur={() => setFieldErrors((prev) => ({ ...prev, lastName: validateLastName(lastName) }))}
              className={inputClass("lastName")}
              placeholder="Last name"
              required
            />
            {fieldErrors.lastName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              handlePhoneChange(e);
              if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: null }));
            }}
            onBlur={() => setFieldErrors((prev) => ({ ...prev, phone: validatePhone(phone) }))}
            className={inputClass("phone")}
            placeholder="Digits only, e.g. 5551234567"
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.phone}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="band_members"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Band members&apos; names <span className="text-red-500">*</span>
          </label>
          <textarea
            id="band_members"
            name="band_members"
            value={bandMembers}
            onChange={(e) => setBandMembers(e.target.value)}
            className={`${INPUT_BASE} min-h-[80px] resize-y`}
            placeholder="Names of band members"
            rows={3}
            required
          />
        </div>
        <div>
          <label
            htmlFor="band_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Band name <span className="text-red-500">*</span>
          </label>
          <input
            id="band_name"
            name="band_name"
            type="text"
            value={bandName}
            onChange={(e) => setBandName(e.target.value)}
            className={INPUT_BASE}
            placeholder="Band name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="requested_datetime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Date and time request <span className="text-red-500">*</span>
          </label>
          <DatePicker
            id="requested_datetime"
            selected={requestedDateTime}
            onChange={(date) => setRequestedDateTime(date)}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={30}
            dateFormat="MM/dd/yyyy h:mm aa"
            placeholderText="Select date and time"
            className={INPUT_BASE}
            calendarClassName="react-datepicker-tailwind"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg px-4 py-2.5 bg-warm-orange hover:bg-orange-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-warm-orange focus:ring-offset-2 dark:focus:ring-offset-dark-charcoal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : "Request booking"}
        </button>
      </form>
    </section>
  );
}

export default PracticeSpaceBookingForm;
