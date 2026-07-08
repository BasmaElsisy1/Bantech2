"use client";
import React, { useState, FormEvent, useEffect } from "react";
import CustomSelect, { OptionType } from "../CustomSelect";
import ButtonComp from "../button";
import Image from "next/image";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const companyOptions: OptionType[] = [
  { value: "Fintech", label: "Fintech" },
  { value: "Healthcare", label: "Healthcare"},
  { value: "Insurance", label: "Insurance" },
  { value: "Crypto", label: "Crypto"},
  { value: "Real Estate", label: "Real Estate" },
  { value: "E-Commerce", label: "E-Commerce" },
];

export const sizeOptions: OptionType[] = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "500+", label: "500+" },
];

function ContactForm() {
  const [form, setForm] = useState({
    company_name: "",
    company_email: "",
    company_phone: "", // ← will hold full international number like +973...
    company_country: "",
    company_field: "",
    company_url: "",
    company_size: "",
    company_type: "",
    message: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  );
  const [selectedCompany, setSelectedCompany] = useState<OptionType | null>(
    null
  );
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());

  // Submission states
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Submit Your Request");
  const [msg, setMsg] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [selectedCompanySize, setSelectedCompanySize] =
    useState<OptionType | null>(null);

  // Validation
  const validate = () => {
    const invalid = new Set<string>();

    if (!form.company_name.trim()) invalid.add("company_name");
    if (!form.company_email.match(/^\S+@\S+\.\S+$/))
      invalid.add("company_email");

    // Proper phone validation using the library
    if (!form.company_phone || !isValidPhoneNumber(form.company_phone)) {
      invalid.add("company_phone");
    }

    if (!selectedCountry) invalid.add("company_country");
    if (!selectedCompany) invalid.add("company_field");
    if (!form.company_url.trim() || !/^https?:\/\/\S+$/.test(form.company_url))
      invalid.add("company_url");
    if (!form.company_size) invalid.add("company_size");
    if (!form.company_type) invalid.add("company_type");
    if (!form.message.trim()) invalid.add("message");

    setInvalidFields(invalid);
    return invalid.size === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setInvalidFields((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };

  useEffect(() => {
    const option = document.querySelector('option[value="IL"]');
    option?.remove();
  }, []);

  // PhoneInput onChange gives string | undefined
  const handlePhoneChange = (value: string | undefined) => {
    const phone = value || "";
    setForm((prev) => ({ ...prev, company_phone: phone }));
    setInvalidFields((prev) => {
      const next = new Set(prev);
      if (phone && isValidPhoneNumber(phone)) next.delete("company_phone");
      return next;
    });
  };

  const handleCompanyChange = (option: OptionType | null) => {
    setSelectedCompany(option);
    setForm((prev) => ({ ...prev, company_field: option?.value || "" }));
    setInvalidFields((prev) => {
      const next = new Set(prev);
      next.delete("company_field");
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!validate()) return;

    setIsLoading(true);
    setButtonText("Sending...");

    const data = {
      company_name: form.company_name,
      business_email: form.company_email,
      phone_number: form.company_phone, // already includes country code
      country: selectedCountry?.value || "",
      company_field: selectedCompany?.value || "",
      company_url: form.company_url,
      company_size: form.company_size,
      company_type: form.company_type,
      message: form.message,
    };

    try {
      const response = await fetch("https://portal.bantech.ae/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit form.");

      setIsLoading(false);
      setButtonText("Submit Your Request");
      setShowForm(false);
    } catch (error: any) {
      setIsLoading(false);
      setButtonText("Submit Your Request");
      setMsg(error.message || "Something went wrong. Please try again.");
    }
  };


  return showForm ? (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center mx-auto md:pb-20 pb-10 gap-6 relative pt-[68px]  max-w-[800px] w-full"
    >
      {/* Company Name */}
      <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
        <label
          htmlFor="company_name"
          className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base"
        >
          Company Name
        </label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          className={`rounded-full px-6 py-[15px] text-[#212C66] md:w-[calc(100%-185px)] w-full bg-[#FCFCFC] focus:border-[#00CDFE] focus:outline-none border ${invalidFields.has("company_name")
            ? "border-red-500"
            : "border-[#FCFCFC]"
            } placeholder:text-[#D0D4DA]`}
          placeholder="Enter your Company Name"
        />
      </div>

      {/* Business Email */}
      <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
        <label
          htmlFor="company_email"
          className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base"
        >
          Business Email
        </label>
        <input
          type="email"
          id="company_email"
          name="company_email"
          value={form.company_email}
          onChange={handleChange}
          className={`rounded-full px-6 py-[15px] text-[#212C66] md:w-[calc(100%-185px)] w-full bg-[#FCFCFC] focus:border-[#00CDFE] focus:outline-none border ${invalidFields.has("company_email")
            ? "border-red-500"
            : "border-[#FCFCFC]"
            } placeholder:text-[#D0D4DA]`}
          placeholder="Enter your business email"
        />
      </div>

      {/* Phone Number – Now using react-phone-number-input */}
      <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
        <label
          htmlFor="company_phone"
          className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base"
        >
          Phone Number
        </label>

        <div className="md:w-[calc(100%-185px)] w-full">
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="BH" // Bahrain as default (you had +973 first)
            value={form.company_phone}
            onChange={handlePhoneChange}
            className={`custom-phone-input`}
            placeholder="Enter phone number"
            maxLength="17"
          />
          {/* Error message only for phone */}
          {invalidFields.has("company_phone") && (
            <p className="text-red-500 text-sm mt-2">
              {!form.company_phone
                ? "Phone number is required"
                : "Please enter a valid phone number"}
            </p>
          )}
        </div>
      </div>

      {/* Country */}
      <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
        <label className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base">
          Country
        </label>
        <div className="md:w-[calc(100%-185px)] w-full">
          <CustomSelect
            isCountry={true}
            value={selectedCountry}
            onChange={(option) => {
              setSelectedCountry(option);
              setForm((prev) => ({
                ...prev,
                company_country: option?.value || "",
              }));
              setInvalidFields((prev) => {
                const next = new Set(prev);
                next.delete("company_country");
                return next;
              });
            }}
            placeholder="Choose a country"
            className={
              invalidFields.has("company_country")
                ? "border-red-500 border-2"
                : ""
            }
          />
        </div>
      </div>

      {/* Company Field */}
      <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
        <label className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base">
          Company Field
        </label>
        <div className="md:w-[calc(100%-185px)] w-full">
          <CustomSelect
            options={companyOptions}
            value={selectedCompany}
            onChange={handleCompanyChange}
            placeholder="Select a company"
            width="w-full"
            className={
              invalidFields.has("company_field")
                ? "border-red-500 border rounded-full"
                : ""
            }
          />
        </div>
      </div>

      {/* Company URL */}
      <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
        <label
          htmlFor="company_url"
          className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base"
        >
          Company URL
        </label>
        <input
          type="url"
          id="company_url"
          name="company_url"
          value={form.company_url}
          onChange={handleChange}
          className={`rounded-full px-6 py-[15px] text-[#212C66] md:w-[calc(100%-185px)] w-full bg-[#FCFCFC] focus:border-[#00CDFE] focus:outline-none border ${invalidFields.has("company_url")
            ? "border-red-500"
            : "border-[#FCFCFC]"
            } placeholder:text-[#D0D4DA]`}
          placeholder="Enter your business URL"
        />
      </div>

      {/* Company Size */}
      <div className="flex md:flex-row gap-4 md:gap-0 flex-col items-center justify-between w-full">
        <label
          htmlFor="company_size"
          className="bg-[#F5F5F5] rounded-full px-5 py-[15px] text-[#212C66] md:w-[169px] w-full text-base"
        >
          Company Size
        </label>
        <div className="md:w-[calc(100%-185px)] w-full">
          <CustomSelect
            options={sizeOptions}
            value={selectedCompanySize} // you’ll add this state
            onChange={(option) => {
              setSelectedCompanySize(option);
              setForm((prev) => ({
                ...prev,
                company_size: option?.value || "",
              }));
              setInvalidFields((prev) => {
                const next = new Set(prev);
                next.delete("company_size");
                return next;
              });
            }}
            placeholder="Select your business users number"
            className={
              invalidFields.has("company_size") ? "border-red-500 border-2" : ""
            }
          />
        </div>
      </div>

      {/* Company Type (Radio) */}
      <div className="flex flex-col w-full gap-4">
        {/* hidden label for accessibility only */}
        <label htmlFor="company_type" className="sr-only">
          Company Type
        </label>

        <div className="flex gap-4 w-full">
          <label
            className={`flex-1 flex px-4 items-center justify-start md:h-16 h-10 bg-[#FCFCFC] rounded-full cursor-pointer border ${form.company_type === "organization"
              ? "border-[#00CDFE]"
              : invalidFields.has("company_type")
                ? "border-red-500"
                : "border-[#FCFCFC]"
              }`}
          >
            <span
              className={`w-6 h-6 shrink-0 bg-[#FCFCFC] border-2 ${form.company_type === "organization"
                ? "border-[#00CDFE]"
                : invalidFields.has("company_type")
                  ? "border-red-500"
                  : "border-gray-400"
                } rounded-full relative`}
            >
              <span
                className={`w-3 h-3 inline-block ${form.company_type === "organization"
                  ? "bg-[#00CDFE]"
                  : "bg-gray-400"
                  } rounded-full absolute top-1 left-1 ${form.company_type === "organization" ? "block" : "hidden"
                  }`}
              />
            </span>
            <span className="ml-4 grow text-[#212C66] text-center">
              Organization
            </span>
            <input
              type="radio"
              name="company_type"
              value="organization"
              className="hidden peer"
              checked={form.company_type === "organization"}
              onChange={handleChange}
            />
          </label>

          <label
            className={`flex-1 flex px-4 items-center justify-start md:h-16 h-10 bg-[#FCFCFC] rounded-full cursor-pointer border ${form.company_type === "startup"
              ? "border-[#00CDFE]"
              : invalidFields.has("company_type")
                ? "border-red-500"
                : "border-[#FCFCFC]"
              }`}
          >
            <span
              className={`w-6 h-6 shrink-0 bg-[#FCFCFC] border-2 ${form.company_type === "startup"
                ? "border-[#00CDFE]"
                : invalidFields.has("company_type")
                  ? "border-red-500"
                  : "border-gray-400"
                } rounded-full relative`}
            >
              <span
                className={`w-3 h-3 inline-block ${form.company_type === "startup"
                  ? "bg-[#00CDFE]"
                  : "bg-gray-400"
                  } rounded-full absolute top-1 left-1 ${form.company_type === "startup" ? "block" : "hidden"
                  }`}
              />
            </span>
            <span className="ml-4 grow text-[#212C66] text-center">
              Start Up
            </span>
            <input
              type="radio"
              name="company_type"
              value="startup"
              className="hidden peer"
              checked={form.company_type === "startup"}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      {/* Message */}
      <div className="flex md:flex-row gap-4 md:gap-0 flex-col  justify-between w-full">
        <label
          htmlFor="message"
          className="bg-[#F5F5F5] rounded-full px-6 md:py-[15px] py-2 text-[#212C66] md:w-[169px] w-full text-base"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={2}
          className={`rounded-full px-6 py-2 text-[#212C66] md:w-[calc(100%-185px)] w-full 
    bg-[#FCFCFC] border border-[#FCFCFC] focus:border-[#00CDFE] focus:outline-none
    resize-none placeholder:text-[#D0D4DA] text-base placeholder:text-sm placeholder:p-2
    ${invalidFields.has("message") ? "border-red-500" : ""}`}
          placeholder="Message us with your requirements and needs"
        />
      </div>

      {/* Error Message */}
      {msg && <p className="text-red-500 text-sm text-center w-full">{msg}</p>}

      {/* Submit Button */}
      <ButtonComp
        text={isLoading ? "Sending..." : "Submit Your Request"}
        white
        center
        type="submit"
      />
    </form>
  ) : (
    /* Success screen – unchanged */
    <div className="mx-auto md:p-20 px-8 py-20">
      <div className="flex flex-col justify-center items-center gap-[64px] md:px-[139px] md:py-[127px] p-8 shadow-md shadow-white bg-white/10 border border-white backdrop-blur-sm rounded-[80px]">
        <Image
          src={"/Images/success.png"}
          width={400}
          height={358}
          alt="Success"
        />
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <h3 className="text-[#212C66] md:text-[40px] text-[20px] font-semibold">
            We’ve Received Your Message
          </h3>
          <p className="text-[#212C66] md:text-[20px] text-base">
            We’ve received your request and one of our experts will contact you
            soon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
