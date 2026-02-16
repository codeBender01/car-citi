import { useState, useEffect } from "react";
import Tabs from "@/components/Tabs";
import CarDetailsForm from "./ui/CarDetailsForm";
import PriceInputs from "./ui/PriceInputs";
import CharacteristicsForm from "./ui/CharacteristicsForm";
import MediaForm from "./ui/MediaForm";
import ContactsForm from "./ui/ContactsForm";

import type { NewPostReq } from "@/interfaces/posts.interface";

import { useAddPost } from "@/api/posts/useAddPost";
import { useGetProfile } from "@/api/auth/useGetProfile";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const AddCar = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const { data: profile } = useGetProfile();

  const addPost = useAddPost();

  const getInitialFormData = (): NewPostReq => ({
    tags: [],
    engineVolume: 0,
    regionId: "",
    offerTypeId: "",
    cityId: "",
    carMarkId: "",
    carModelId: "",
    issueYear: "",
    subcategoryId: "",
    carConditionId: "",
    driveTypeId: "",
    transmissionId: "",
    colorId: "",
    mileage: 0,
    carEquipmentId: "",
    damage: "",
    phone: profile ? profile?.data.phone : "",
    title: "",
    vin: "",
    carPrice: {
      price: 0,
    },
    carImages: {
      images: [],
      reports: [],
      videoUrl: "",
    },
    carCharacteristics: [],
  });

  const [formData, setFormData] = useState<NewPostReq>(getInitialFormData());

  const handleNext = () => {
    setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  };

  const handleSubmit = async () => {
    await addPost.mutateAsync(formData);
  };

  const handleSuccess = () => {
    toast({
      title: "Успешно!",
      description: "Объявление успешно создано",
      variant: "success",
    });

    setFormData(getInitialFormData());
    setActiveTab(0);
  };

  const tabs = [
    t("addCar.carDetails"),
    t("addCar.price"),
    t("addCar.characteristics"),
    t("addCar.media"),
    t("addCar.contacts"),
    // t("addCar.location"),
  ];

  useEffect(() => {
    if (profile) {
      setFormData({
        ...formData,
        phone: profile?.data.phone,
      });
    }
  }, [profile]);

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">{t("addCar.addListing")}</div>
      </div>

      <div className="border rounded-2xl p-[30px] border-grayBorder">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-8">
          {activeTab === 0 && (
            <CarDetailsForm
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
            />
          )}

          {activeTab === 1 && (
            <PriceInputs
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
            />
          )}

          {activeTab === 2 && (
            <CharacteristicsForm
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
            />
          )}

          {activeTab === 3 && (
            <MediaForm
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
            />
          )}

          {activeTab === 4 && (
            <ContactsForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onSuccess={handleSuccess}
              isSubmitting={addPost.isPending}
            />
          )}

          {/* {activeTab === 5 && (
            <LocationForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isSubmitting={addPost.isPending}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AddCar;
