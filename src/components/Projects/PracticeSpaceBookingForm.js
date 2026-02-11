import React, { useState, useRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import ReCAPTCHA from "react-google-recaptcha";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "../../context/ThemeContext";

const FORMSPREE_URL = process.env.REACT_APP_FORMSPREE_URL;
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const MAX_FIRST_NAME = 20;
const MAX_LAST_NAME = 20;
const MAX_BAND_MEMBERS = 100;
const MAX_BAND_NAME = 30;
const MAX_PHONE = 15;

/** Only letters (a-z, A-Z) and dashes allowed for name fields */
const sanitizeName = (value) => value.replace(/[^a-zA-Z-]/g, "");

function PracticeSpaceBookingForm() {
  const { theme } = useTheme();
  const recaptchaRequired = !!RECAPTCHA_SITE_KEY;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bandMembers, setBandMembers] = useState("");
  const [bandName, setBandName] = useState("");
  const [requestedDateTime, setRequestedDateTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    firstName: null,
    lastName: null,
    phone: null,
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState(null);
  const recaptchaRef = useRef(null);

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
    if (digits.length < 10 || digits.length > 15)
      return "Enter a valid phone number (10–15 digits, numbers only).";
    return null;
  };

  const formValid = useMemo(() => {
    if (!firstName.trim() || !lastName.trim()) return false;
    if (validatePhone(phone) !== null) return false;
    if (!bandMembers.trim() || !bandName.trim() || !requestedDateTime)
      return false;
    return true;
  }, [firstName, lastName, phone, bandMembers, bandName, requestedDateTime]);

  const submitEnabled =
    !submitting && formValid && (!recaptchaRequired || !!recaptchaToken);

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, MAX_PHONE);
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

  const startOfToday = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const filterPastTime = (time) => {
    const t = new Date(time);
    const now = new Date();
    const isToday =
      t.getDate() === now.getDate() &&
      t.getMonth() === now.getMonth() &&
      t.getFullYear() === now.getFullYear();
    if (isToday) return t.getTime() > now.getTime();
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRecaptchaError(null);

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
      setError(
        "There was a form submission error, reach out via Insta for your request",
      );
      return;
    }

    if (recaptchaRequired && !recaptchaToken) {
      setError("Please complete the security check above");
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
      if (recaptchaRequired && recaptchaToken) {
        formData.append("g-recaptcha-response", recaptchaToken);
      }

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
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        const msg =
          data.error ||
          (Array.isArray(data.errors)
            ? data.errors.map((e) => e.message || e).join(". ")
            : null) ||
          `Submission failed (${res.status})! Please try again.`;
        setError(msg);
        console.error("Formspree error:", res.status, data);
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      }
    } catch (err) {
      setError("Network or request failed. Check the console and try again.");
      console.error("Form submit error:", err);
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const INPUT_BASE =
    "w-full rounded-lg border-2 border-black dark:border dark:border-gray-600 bg-white dark:bg-dark-charcoal px-3 py-2 text-black dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent transition-colors";
  const inputClass = (fieldKey) =>
    fieldErrors[fieldKey]
      ? `${INPUT_BASE} border-red-500 dark:border-red-500`
      : INPUT_BASE;

  if (submitted) {
    return (
      <div
        id="booking-form"
        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/5 dark:bg-dark-charcoal/50 p-6 max-w-xl mx-auto my-8"
      >
        <p className="text-lg text-gray-800 dark:text-gray-200 text-center">
          Thanks for your interest! I&apos;ll call you as soon as I am able to
          confirm!
        </p>
      </div>
    );
  }

  return (
    <section
      id="booking-form"
      className="max-w-xl mx-auto my-6 sm:my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/5 dark:bg-dark-charcoal/50 p-4 sm:p-6"
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
              maxLength={MAX_FIRST_NAME}
              onChange={(e) => {
                setFirstName(
                  sanitizeName(e.target.value).slice(0, MAX_FIRST_NAME),
                );
                if (fieldErrors.firstName)
                  setFieldErrors((prev) => ({ ...prev, firstName: null }));
              }}
              onBlur={() =>
                setFieldErrors((prev) => ({
                  ...prev,
                  firstName: validateFirstName(firstName),
                }))
              }
              className={inputClass("firstName")}
              placeholder="First name"
              required
            />
            {fieldErrors.firstName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.firstName}
              </p>
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
              maxLength={MAX_LAST_NAME}
              onChange={(e) => {
                setLastName(
                  sanitizeName(e.target.value).slice(0, MAX_LAST_NAME),
                );
                if (fieldErrors.lastName)
                  setFieldErrors((prev) => ({ ...prev, lastName: null }));
              }}
              onBlur={() =>
                setFieldErrors((prev) => ({
                  ...prev,
                  lastName: validateLastName(lastName),
                }))
              }
              className={inputClass("lastName")}
              placeholder="Last name"
              required
            />
            {fieldErrors.lastName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.lastName}
              </p>
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
            maxLength={MAX_PHONE}
            onChange={(e) => {
              handlePhoneChange(e);
              if (fieldErrors.phone)
                setFieldErrors((prev) => ({ ...prev, phone: null }));
            }}
            onBlur={() =>
              setFieldErrors((prev) => ({
                ...prev,
                phone: validatePhone(phone),
              }))
            }
            className={inputClass("phone")}
            placeholder="Digits only, e.g. 5551234567"
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.phone}
            </p>
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
            maxLength={MAX_BAND_MEMBERS}
            onChange={(e) =>
              setBandMembers(e.target.value.slice(0, MAX_BAND_MEMBERS))
            }
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
            maxLength={MAX_BAND_NAME}
            onChange={(e) =>
              setBandName(e.target.value.slice(0, MAX_BAND_NAME))
            }
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
            minDate={startOfToday}
            filterTime={filterPastTime}
          />
        </div>
        {recaptchaRequired && (
          <div className="flex flex-col items-center my-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Security check
            </p>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              theme={theme === "dark" ? "dark" : "light"}
              onChange={(token) => {
                setRecaptchaToken(token);
                setRecaptchaError(null);
              }}
              onExpired={() => setRecaptchaToken(null)}
              onErrored={() =>
                setRecaptchaError(
                  "reCAPTCHA couldn't load. Reach out via Insta for your request",
                )
              }
            />
            {recaptchaError && (
              <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 max-w-md text-center">
                {recaptchaError}
              </p>
            )}
          </div>
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={!submitEnabled}
          className="w-full rounded-lg px-4 py-2.5 bg-warm-orange hover:bg-orange-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-warm-orange focus:ring-offset-2 dark:focus:ring-offset-dark-charcoal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : "Request booking"}
        </button>
      </form>
    </section>
  );
}

export default PracticeSpaceBookingForm;
