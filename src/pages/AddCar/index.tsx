import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tabs from "@/components/Tabs";
import CarDetailsForm from "./ui/CarDetailsForm";
import PriceInputs from "./ui/PriceInputs";
import CharacteristicsForm from "./ui/CharacteristicsForm";
import MediaForm from "./ui/MediaForm";
import ContactsForm from "./ui/ContactsForm";

import type { NewPostReq } from "@/interfaces/posts.interface";

import { useAddPost } from "@/api/posts/useAddPost";
import { useGetProfile } from "@/api/auth/useGetProfile";
import { useGetOnePost } from "@/api/posts/useGetOnePost";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const AddCar = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const { data: profile } = useGetProfile();

  const isEditMode = !!id;

  const { data: existingPost, isLoading: isLoadingPost } = useGetOnePost(
    i18n.language,
    id,
  );

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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isEditMode && existingPost?.data && !isInitialized) {
      const post = existingPost.data;
      setFormData({
        id: post.id,
        tags: [],
        engineVolume: post.engineVolume || 0,
        regionId: post.region?.id || "",
        offerTypeId: post.offerType?.id || "",
        cityId: post.city?.id || "",
        carMarkId: post.carMark?.id || "",
        carModelId: post.carModel?.id || "",
        issueYear: post.issueYear || "",
        subcategoryId: post.subcategory?.id || "",
        carConditionId: post.carCondition?.id || "",
        driveTypeId: post.driveType?.id || "",
        transmissionId: post.transmission?.id || "",
        colorId: post.color?.id || "",
        mileage: post.mileage || 0,
        carEquipmentId: post.carEquipment?.id || "",
        damage: post.damage || "",
        phone: post.phone || profile?.data.phone || "",
        title: post.title || "",
        vin: post.vin || "",
        carPrice: {
          price: post.carPrice?.price || 0,
        },
        carImages: {
          images: post.images?.images || [],
          reports: post.images?.reports || [],
          videoUrl: "",
        },
        carCharacteristics: post.carCharacteristics
          ? post.carCharacteristics.flatMap((char) =>
              char.items.map((item) => ({
                characteristicId: char.id,
                characteristicItemId: item.id,
                checked: item.checked,
              })),
            )
          : [],
      });
      setIsInitialized(true);
    }
  }, [existingPost, isEditMode, isInitialized, profile]);

  const handleNext = () => {
    setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  };

  const handleSubmit = async () => {
    await addPost.mutateAsync(formData);
  };

  const handleSuccess = () => {
    toast({
      title: "Успешно!",
      description: isEditMode
        ? "Объявление успешно обновлено"
        : "Объявление успешно создано",
      variant: "success",
    });

    if (isEditMode) {
      navigate("/dashboard/posted");
    } else {
      setFormData(getInitialFormData());
      setActiveTab(0);
    }
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
    if (profile && !id) {
      setFormData((prev) => ({
        ...prev,
        phone: profile?.data.phone,
      }));
    }
  }, [profile, id]);

  if (isEditMode && isLoadingPost) {
    return (
      <div className="p-[35px] 2xl:p-[60px] flex items-center justify-center">
        <div className="text-textGray">{t("addCar.loading") || "Загрузка..."}</div>
      </div>
    );
  }

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">
          {isEditMode ? t("addCar.editListing") || "Редактировать объявление" : t("addCar.addListing")}
        </div>
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
