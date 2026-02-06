import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import LabeledInput from "@/components/LabeledInput";
import { Button } from "@/components/ui/button";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { FaTelegramPlane, FaWhatsapp, FaInstagram } from "react-icons/fa";

import hero from "@assets/contactUs.png";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useTranslation();
  const { toast } = useToast();

  const offices = [
    {
      id: 1,
      cityKey: "cities.ashgabat",
      address: "Magtymguly şaýoly, No:88, Bagtyýarlyk etraby",
      phone: "+993 (12) 123-45-67",
      email: "ashgabat@carciti.com",
    },
    {
      id: 2,
      cityKey: "cities.turkmenbashi",
      address: "Lorem ipsum dolor sit amet",
      phone: "+993 (422) 123-45-67",
      email: "turkmenabat@carciti.com",
    },
    {
      id: 3,
      cityKey: "cities.mary",
      address: "Lorem ipsum dolor sit amet",
      phone: "+993 (522) 123-45-67",
      email: "mary@carciti.com",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.errors.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.errors.emailInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.errors.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // TODO: API integration (placeholder for now)
      console.log("Contact form submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: t("contact.success.title"),
        description: t("contact.success.description"),
        variant: "success",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors({
          ...errors,
          [field]: "",
        });
      }
    };

  return (
    <div className="pt-[100px] ">
      {/* Hero Section */}
      <div className="w-[95%] mx-auto">
        <div
          style={{
            backgroundImage: `url(${hero})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-[60vh] md:h-[70vh] rounded-2xl lg:h-[80vh] w-full flex items-center w-[90%] justify-center relative"
        >
          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-4 md:px-12 lg:px-[120px] 2xl:px-[118px] py-[75px] lg:py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Contact Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8">
            <div className="relative z-10 text-textPrimary">
              <h1 className="text-[32px] lg:text-[48px] font-rale font-bold">
                {t("contact.hero.title")}
              </h1>
              <p className="mt-4 text-[15px] md:text-[18px] font-dm max-w-2xl mx-auto">
                {t("contact.hero.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div>
                <LabeledInput
                  label={t("contact.form.name")}
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  placeholder={t("contact.form.name")}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 ml-2">
                    {errors.name}
                  </span>
                )}
              </div>

              <div>
                <LabeledInput
                  label={t("contact.form.email")}
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="example@mail.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 ml-2">
                    {errors.email}
                  </span>
                )}
              </div>

              <LabeledInput
                label={t("contact.form.address")}
                value={formData.address}
                onChange={handleInputChange("address")}
                placeholder={t("contact.form.address")}
              />

              <LabeledInput
                label={t("contact.form.phone")}
                type="tel"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                placeholder="+993 (___) ___-__-__"
              />

              {/* Message textarea */}
              <div className="relative w-full min-h-[120px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white">
                <label className="text-sm font-medium text-gray-500 font-rale">
                  {t("contact.form.message")}
                </label>
                <textarea
                  value={formData.message}
                  onChange={handleInputChange("message")}
                  className="w-full mt-2 border-none outline-none resize-none font-rale"
                  rows={4}
                  placeholder={t("contact.form.message")}
                />
              </div>
              {errors.message && (
                <span className="text-red-500 text-sm mt-1 ml-2">
                  {errors.message}
                </span>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                size="none"
                className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl flex items-center justify-center gap-2.5 py-4 px-[25px] w-full md:w-fit hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {isSubmitting
                  ? t("contact.form.sending")
                  : t("contact.form.submit")}
              </Button>
            </form>
          </div>

          {/* RIGHT COLUMN: Contact Information */}
          <div className="bg-primary/5 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <h2 className="text-[24px] md:text-[32px] font-rale font-bold">
              {t("contact.info.title")}
            </h2>

            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-3 shrink-0">
                  <MdLocationOn className="text-white" size={24} />
                </div>
                <div className="font-dm">
                  <p className="font-bold text-[15px] mb-1">
                    {t("contact.info.address")}
                  </p>
                  <p className="text-textSecondary text-[15px]">
                    Magtymguly şaýoly, No:88,
                    <br />
                    Bagtyýarlyk etraby, Ashgabat
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-3 shrink-0">
                  <MdEmail className="text-white" size={24} />
                </div>
                <div className="font-dm">
                  <p className="font-bold text-[15px] mb-1">
                    {t("contact.info.email")}
                  </p>
                  <a
                    href="mailto:info@carciti.com"
                    className="text-textSecondary text-[15px] hover:text-primary transition-colors"
                  >
                    info@carciti.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-3 shrink-0">
                  <MdPhone className="text-white" size={24} />
                </div>
                <div className="font-dm">
                  <p className="font-bold text-[15px] mb-1">
                    {t("contact.info.phone")}
                  </p>
                  <a
                    href="tel:+905338884706"
                    className="text-textSecondary text-[15px] hover:text-primary transition-colors"
                  >
                    +90 (533) 888 47 06
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-4">
                <p className="font-bold text-[15px] mb-3 font-dm">
                  {t("contact.info.social")}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors group"
                  >
                    <FaTelegramPlane
                      className="text-primary group-hover:text-white"
                      size={20}
                    />
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors group"
                  >
                    <FaWhatsapp
                      className="text-primary group-hover:text-white"
                      size={20}
                    />
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors group"
                  >
                    <FaInstagram
                      className="text-primary group-hover:text-white"
                      size={20}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offices Section */}
      <div className="px-4 md:px-12 lg:px-[120px] 2xl:px-[118px] pb-[120px]">
        <h2 className="text-[28px] md:text-[40px] font-rale font-bold mb-8 md:mb-12">
          {t("contact.offices.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office) => (
            <div
              key={office.id}
              className="bg-white border border-headerBorder rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-[20px] font-rale font-bold mb-4">
                {t(office.cityKey)}
              </h3>

              <div className="flex flex-col gap-3 font-dm text-[15px]">
                <div className="flex items-start gap-2">
                  <MdLocationOn
                    className="text-primary mt-0.5 shrink-0"
                    size={18}
                  />
                  <p className="text-textSecondary">{office.address}</p>
                </div>

                <div className="flex items-start gap-2">
                  <MdPhone className="text-primary mt-0.5 shrink-0" size={18} />
                  <a
                    href={`tel:${office.phone}`}
                    className="text-textSecondary hover:text-primary transition-colors"
                  >
                    {office.phone}
                  </a>
                </div>

                <div className="flex items-start gap-2">
                  <MdEmail className="text-primary mt-0.5 shrink-0" size={18} />
                  <a
                    href={`mailto:${office.email}`}
                    className="text-textSecondary hover:text-primary transition-colors"
                  >
                    {office.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
