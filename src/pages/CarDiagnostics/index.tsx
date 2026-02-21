import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoCarSportOutline,
  IoEyeOutline,
  IoCheckboxOutline,
  IoTrendingUpOutline,
  IoDocumentTextOutline,
  IoDocumentOutline,
  IoCallOutline,
  IoClipboardOutline,
  IoShieldCheckmarkOutline,
  IoScaleOutline,
  IoLockClosedOutline,
  IoCloseCircle,
} from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { BsArrowUpRight } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSearchableSelect,
  MultiSearchableSelectContent,
  MultiSearchableSelectGroup,
  MultiSearchableSelectItem,
  MultiSearchableSelectTrigger,
  MultiSearchableSelectValue,
} from "@/components/ui/multi-searchable-select";
import LabeledInput from "@/components/LabeledInput";
import { useGetCarMarksClient } from "@/api/carMarks/useGetCarMarksClient";
import { useGetOneCarMarkClient } from "@/api/carMarks/useGetOneCarMarkClient";
import { useGetRegions } from "@/api/regions/useGetRegions";
import { useCreateDiagnostics } from "@/api/diagnostics/useCreateDiagnostics";
import { useToast } from "@/hooks/use-toast";
import type { DiagnosticsReq } from "@/interfaces/diagnostics.interface";
import {
  formatPhoneNumber,
  validatePhoneNumber,
  cleanPhoneNumber,
} from "@/lib/phoneUtils";
import diagnosticImg from "@assets/diagnostics/diag1.png";

const selectTriggerClass =
  "relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2";

const CarDiagnostics = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    vin: "",
    mileage: "",
    phone: "",
    name: "",
    comment: "",
    smsConfirm: false,
  });
  const [cityRegions, setCityRegions] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { toast } = useToast();
  const { data: carMarks } = useGetCarMarksClient(1, 100, i18n.language);
  const { data: selectedCarMark } = useGetOneCarMarkClient(form.brand);
  const { data: regions } = useGetRegions(i18n.language);
  const { mutateAsync: createDiagnostics, isPending } = useCreateDiagnostics();

  useEffect(() => {
    if (form.brand) {
      setForm((prev) => ({ ...prev, model: "" }));
    }
  }, [form.brand]);

  const handleCityRegionsChange = (newValues: string[]) => {
    if (!regions?.data?.rows) {
      setCityRegions(newValues);
      return;
    }
    const added = newValues.filter((v) => !cityRegions.includes(v));
    const removed = cityRegions.filter((v) => !newValues.includes(v));
    let result = [...newValues];

    for (const id of added) {
      const region = regions.data.rows.find((r) => r.id === id);
      if (region) {
        const cityIds = region.cities.map((c) => c.id);
        result = [...new Set([...result, ...cityIds])];
      }
    }

    for (const id of removed) {
      const region = regions.data.rows.find((r) => r.id === id);
      if (region) {
        const cityIds = new Set(region.cities.map((c) => c.id));
        result = result.filter((v) => !cityIds.has(v));
      }
    }

    setCityRegions(result);
  };

  const filteredRegions = useMemo(() => {
    if (!regions?.data?.rows) return [];
    if (!citySearch.trim()) return regions.data.rows;
    const searchLower = citySearch.toLowerCase();
    return regions.data.rows
      .map((region) => ({
        ...region,
        cities: region.cities.filter((city) =>
          city.name.toLowerCase().includes(searchLower),
        ),
      }))
      .filter(
        (region) =>
          region.cities.length > 0 ||
          region.name.toLowerCase().includes(searchLower),
      );
  }, [regions, citySearch]);

  const resolvedLocations = useMemo(() => {
    const regionIds: string[] = [];
    const cityIds: string[] = [];
    if (!regions?.data?.rows || cityRegions.length === 0)
      return { regionIds, cityIds };

    for (const value of cityRegions) {
      const isRegion = regions.data.rows.some((r) => r.id === value);
      if (isRegion) {
        regionIds.push(value);
        continue;
      }
      for (const region of regions.data.rows) {
        const city = region.cities.find((c) => c.id === value);
        if (city) {
          cityIds.push(city.id);
          break;
        }
      }
    }
    return { regionIds, cityIds };
  }, [cityRegions, regions]);

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setForm({ ...form, phone: formatted });
    if (phoneError) setPhoneError("");
  };

  const handlePhoneBlur = () => {
    const validation = validatePhoneNumber(form.phone);
    if (!validation.isValid && form.phone.length > 4) {
      setPhoneError(validation.error || "");
    }
  };

  const handlePhoneFocus = () => {
    if (!form.phone || form.phone.trim() === "") {
      setForm({ ...form, phone: "+993 " });
    }
    setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: DiagnosticsReq = {
      carMarkId: form.brand,
      carModelId: form.model,
      issueYear: form.year ? `${form.year}-01-01` : "",
      vin: form.vin,
      mileage: Number(form.mileage) || 0,
      phone: cleanPhoneNumber(form.phone),
      name: form.name,
      regionId: resolvedLocations.regionIds[0] || "",
      cityId: resolvedLocations.cityIds[0] || "",
      comment: form.comment,
    };

    try {
      await createDiagnostics(payload);
      toast({ title: t("diagnostics.submit"), variant: "default" });
      setForm({
        brand: "",
        model: "",
        year: "",
        vin: "",
        mileage: "",
        phone: "",
        name: "",
        comment: "",
        smsConfirm: false,
      });
      setCityRegions([]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/auth");
        return;
      }
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const features = [
    {
      icon: <IoCarSportOutline size={32} />,
      title: t("diagnostics.feature1Title"),
      desc: t("diagnostics.feature1Desc"),
    },
    {
      icon: <IoEyeOutline size={32} />,
      title: t("diagnostics.feature2Title"),
      desc: t("diagnostics.feature2Desc"),
    },
    {
      icon: <IoCheckboxOutline size={32} />,
      title: t("diagnostics.feature3Title"),
      desc: t("diagnostics.feature3Desc"),
    },
    {
      icon: <IoTrendingUpOutline size={32} />,
      title: t("diagnostics.feature4Title"),
      desc: t("diagnostics.feature4Desc"),
    },
    {
      icon: <IoDocumentTextOutline size={32} />,
      title: t("diagnostics.feature5Title"),
      desc: t("diagnostics.feature5Desc"),
    },
  ];

  return (
    <div className="px-4 md:px-12 lg:px-[120px] 2xl:px-[118px] py-[60px] md:py-[100px]">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-dm font-medium text-xs uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {t("diagnostics.badge")}
          </span>

          <h1 className="font-rale font-bold text-[32px] md:text-[44px] leading-tight text-textPrimary">
            {t("diagnostics.titleLine1")}
            <br />
            <span className="text-primary italic">
              {t("diagnostics.titleLine2")}
            </span>
          </h1>

          <p className="mt-5 text-textPrimary/70 font-dm text-sm md:text-base max-w-lg leading-relaxed">
            {t("diagnostics.description")}
          </p>

          <div className="flex items-center gap-6 mt-6 font-dm text-sm text-textPrimary">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-textPrimary" />
              {t("diagnostics.bullet1")}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-textPrimary" />
              {t("diagnostics.bullet2")}
            </span>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={diagnosticImg}
            alt={t("diagnostics.titleLine1")}
            className="w-full max-w-[500px] rounded-2xl object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-[60px] md:mt-[100px]">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-headerBorder bg-white p-5 flex flex-col gap-3"
          >
            <div className="text-primary">{feature.icon}</div>
            <h3 className="font-dm font-semibold text-textPrimary text-sm md:text-base leading-snug">
              {feature.title}
            </h3>
            <p className="font-dm text-textPrimary/60 text-xs md:text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Application Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-[60px] md:mt-[100px]">
        {/* Left: Steps */}
        <div className="bg-mainBg rounded-2xl p-8 md:p-12 flex flex-col justify-center">
          <h2 className="font-rale font-bold text-[28px] md:text-[36px] text-textPrimary leading-tight">
            {t("diagnostics.formTitleLine1")}{" "}
            <span className="text-primary">
              {t("diagnostics.formTitleLine2")}
            </span>
          </h2>
          <p className="mt-4 text-textPrimary/70 font-dm text-sm md:text-base max-w-md">
            {t("diagnostics.formDescription")}
          </p>

          <div className="mt-10 flex flex-col gap-8">
            {[
              {
                icon: <IoClipboardOutline size={24} />,
                title: t("diagnostics.step1Title"),
                desc: t("diagnostics.step1Desc"),
              },
              {
                icon: <IoCallOutline size={24} />,
                title: t("diagnostics.step2Title"),
                desc: t("diagnostics.step2Desc"),
              },
              {
                icon: <IoDocumentOutline size={24} />,
                title: t("diagnostics.step3Title"),
                desc: t("diagnostics.step3Desc"),
              },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-dm font-bold text-textPrimary text-base">
                    {idx + 1}. {step.title}
                  </h4>
                  <p className="font-dm text-textPrimary/60 text-sm mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-xs text-textPrimary/50 font-dm uppercase tracking-wider">
              {t("diagnostics.haveQuestions")}
            </p>
            <p className="font-dm font-bold text-textPrimary text-lg mt-1">
              +993 60 00-00-00
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-2xl border border-headerBorder p-6 md:p-8">
          <h3 className="font-rale font-bold text-[22px] md:text-[26px] text-textPrimary">
            {t("diagnostics.formTitle")}
          </h3>

          <form onSubmit={handleSubmit} className="mt-6">
            <p className="text-xs font-dm font-medium text-textPrimary/50 uppercase tracking-wider mb-4">
              {t("diagnostics.carData")}
            </p>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Select
                    value={form.brand}
                    onValueChange={(v) => setForm({ ...form, brand: v })}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <div className="flex flex-col gap-1 items-start w-full">
                        <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                          {t("diagnostics.brand")}
                        </span>
                        <SelectValue placeholder={t("filters.chooseBrand")} />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                      {carMarks?.data.rows.map((carMark) => (
                        <SelectItem
                          key={carMark.id}
                          value={carMark.id}
                          className="text-base font-rale cursor-pointer"
                        >
                          {carMark.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.brand && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm({ ...form, brand: "", model: "" });
                      }}
                      className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                    >
                      <IoCloseCircle size={18} />
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Select
                    value={form.model}
                    onValueChange={(v) => setForm({ ...form, model: v })}
                    disabled={!form.brand}
                  >
                    <SelectTrigger
                      className={`${selectTriggerClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="flex flex-col gap-1 items-start w-full">
                        <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                          {t("diagnostics.model")}
                        </span>
                        <SelectValue
                          placeholder={
                            form.brand
                              ? t("filters.chooseModel")
                              : t("filters.firstSelectBrand")
                          }
                        />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                      {selectedCarMark?.data.carModels?.map((carModel) => (
                        <SelectItem
                          key={carModel.id}
                          value={carModel.id}
                          className="text-base font-rale cursor-pointer"
                        >
                          {carModel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.model && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm({ ...form, model: "" });
                      }}
                      className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                    >
                      <IoCloseCircle size={18} />
                    </button>
                  )}
                </div>
              </div>

              <LabeledInput
                label={t("diagnostics.year")}
                type="number"
                value={form.year}
                onChange={handleChange("year")}
                placeholder="2020"
              />

              <div className="grid grid-cols-2 gap-4">
                <LabeledInput
                  label={t("diagnostics.vin")}
                  value={form.vin}
                  onChange={handleChange("vin")}
                  placeholder="XTA..."
                />
                <LabeledInput
                  label={t("diagnostics.mileageKm")}
                  type="number"
                  value={form.mileage}
                  onChange={handleChange("mileage")}
                  placeholder="50000"
                />
              </div>
            </div>

            <p className="text-xs font-dm font-medium text-textPrimary/50 uppercase tracking-wider mt-8 mb-4">
              {t("diagnostics.contactData")}
            </p>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div
                    className={`relative w-full min-h-[60px] px-4 py-2.5 border rounded-xl bg-white ${
                      phoneError
                        ? "border-red-500"
                        : "border-[#E1E1E1]"
                    }`}
                  >
                    <label className="text-sm font-medium text-gray-500 font-rale">
                      {t("diagnostics.phone")} *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      onFocus={handlePhoneFocus}
                      placeholder="+993 6X XXXXXX"
                      className="w-full mt-1 border-none outline-none font-rale text-textPrimary"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-500 text-xs font-dm mt-1">
                      {phoneError}
                    </p>
                  )}
                </div>
                <LabeledInput
                  label={t("diagnostics.name")}
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder={t("diagnostics.yourName")}
                />
              </div>

              <label className="flex items-center gap-2 font-dm text-xs text-textPrimary/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.smsConfirm}
                  onChange={(e) =>
                    setForm({ ...form, smsConfirm: e.target.checked })
                  }
                  className="rounded border-headerBorder"
                />
                {t("diagnostics.smsConfirm")}
              </label>

              <div className="relative">
                <MultiSearchableSelect
                  values={cityRegions}
                  onValuesChange={handleCityRegionsChange}
                >
                  <MultiSearchableSelectTrigger
                    className={`${selectTriggerClass} flex`}
                  >
                    <div className="flex flex-col gap-1 items-start w-full">
                      <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                        {t("diagnostics.cityRegion")}
                      </span>
                      <MultiSearchableSelectValue
                        placeholder={t("filters.chooseCity")}
                        getLabel={(id) => {
                          if (!regions?.data?.rows) return id;
                          for (const r of regions.data.rows) {
                            if (r.id === id) return r.name;
                            const city = r.cities.find((c) => c.id === id);
                            if (city) return city.name;
                          }
                          return id;
                        }}
                      />
                    </div>
                  </MultiSearchableSelectTrigger>
                  <MultiSearchableSelectContent
                    className="rounded-xl bg-white border border-[#7B3FF2]/20"
                    onSearchChange={setCitySearch}
                    searchPlaceholder={t("filters.searchCity")}
                  >
                    {filteredRegions.length > 0 ? (
                      filteredRegions.map((region) => (
                        <MultiSearchableSelectGroup key={region.id}>
                          <MultiSearchableSelectItem
                            value={region.id}
                            className="text-base font-rale cursor-pointer font-medium text-gray-700"
                          >
                            {region.name}
                          </MultiSearchableSelectItem>
                          {region.cities.map((city) => (
                            <MultiSearchableSelectItem
                              key={city.id}
                              value={city.id}
                              className="text-base font-rale cursor-pointer pl-6"
                            >
                              {city.name}
                            </MultiSearchableSelectItem>
                          ))}
                        </MultiSearchableSelectGroup>
                      ))
                    ) : (
                      <div className="py-6 text-center text-sm text-gray-500">
                        {t("filters.cityNotFound")}
                      </div>
                    )}
                  </MultiSearchableSelectContent>
                </MultiSearchableSelect>
                {cityRegions.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCityRegions([]);
                    }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  >
                    <IoCloseCircle size={18} />
                  </button>
                )}
              </div>

              <div className="relative w-full min-h-[120px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white">
                <label className="text-sm font-medium text-gray-500 font-rale">
                  {t("diagnostics.comment")}
                </label>
                <textarea
                  value={form.comment}
                  onChange={handleChange("comment")}
                  className="w-full mt-2 border-none outline-none resize-none font-rale"
                  rows={3}
                  placeholder={t("diagnostics.commentPlaceholder")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-6 bg-primary text-white py-3.5 rounded-full font-dm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("diagnostics.submit")}
              <BsArrowUpRight />
            </button>

            <p className="text-xs text-textPrimary/40 font-dm text-center mt-4">
              {t("diagnostics.privacy")}
            </p>
          </form>
        </div>
      </div>

      {/* Trust Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-[60px] md:mt-[100px] rounded-2xl border border-headerBorder p-4 md:p-6">
        {[
          {
            icon: <IoShieldCheckmarkOutline size={32} />,
            title: t("diagnostics.trustTitle1"),
            desc: t("diagnostics.trustDesc1"),
          },
          {
            icon: <IoScaleOutline size={32} />,
            title: t("diagnostics.trustTitle2"),
            desc: t("diagnostics.trustDesc2"),
          },
          {
            icon: <IoLockClosedOutline size={32} />,
            title: t("diagnostics.trustTitle3"),
            desc: t("diagnostics.trustDesc3"),
            link: t("diagnostics.trustLink3"),
          },
          {
            icon: <FiPhone size={32} />,
            title: t("diagnostics.trustTitle4"),
            desc: t("diagnostics.trustDesc4"),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-headerBorder bg-white p-6 flex flex-col gap-4"
          >
            <div className="text-primary">{item.icon}</div>
            <h4 className="font-dm font-bold text-textPrimary text-base">
              {item.title}
            </h4>
            <p className="font-dm text-textPrimary/60 text-sm leading-relaxed">
              {item.desc}
              {"link" in item && item.link && (
                <>
                  <br />
                  <a href="#" className="text-primary hover:underline">
                    {item.link}
                  </a>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDiagnostics;
