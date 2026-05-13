import { useState } from "react";

export function useContactForm() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleTextChange = function (e) {
    const { name, value } = e.target;

    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = function (data) {
    const newErrors = { name: "", email: "", phone: "" };

    if (!data.name.trim()) newErrors.name = "Name is required.";
    if (!data.email.trim()) newErrors.email = "Email is required.";
    else if (!data.email.includes("@"))
      newErrors.email = "Email must be valid.";

    if (!data.phone.trim()) newErrors.phone = "Phone is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm(contactForm);

    const hasErrors = Object.values(newErrors).some((msg) => msg);
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    console.log("✅ Submit data:", contactForm);
  };

  return {
    contactForm,
    errors,
    handleTextChange,
    handleSubmit,
  };
}