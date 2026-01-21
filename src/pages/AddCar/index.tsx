import { useState, useEffect } from "react";
import Tabs from "@/components/Tabs";
import CarDetailsForm from "./ui/CarDetailsForm";
import PriceInputs from "./ui/PriceInputs";
import CharacteristicsForm from "./ui/CharacteristicsForm";
import MediaForm from "./ui/MediaForm";
import LocationForm from "./ui/LocationForm";
import type { NewPostReq } from "@/interfaces/posts.interface";

import { useAddPost } from "@/api/posts/useAddPost";
import { useGetProfile } from "@/api/auth/useGetProfile";
import { toast } from "@/hooks/use-toast";

const AddCar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: profile } = useGetProfile();

  const addPost = useAddPost();

  const getInitialFormData = (): NewPostReq => ({
    tags: [],
    engineVolume: 0,
    doors: 0,
    regionId: "",
    saleTypeId: "",
    cityId: "",
    carMarkId: "",
    carModelId: "",
    issueYear: "",
    subcategoryId: "",
    carConditionId: "",
    fuelTypeId: "",
    driveTypeId: "",
    transmissionId: "",
    colorId: "",
    mileage: 0,
    carEquipment: "",
    damage: "",
    categoryId: "",
    phone: profile ? profile?.data.phone : "",
    title: "",
    cylinders: "",
    vin: "",
    carPrice: {
      price: 0,
      prefixPrice: "",
      suffixPrice: "",
      customPrice: "",
    },
    carImages: {
      images: [],
      reports: [],
      videoUrl: "",
    },
    carMap: {
      address: "",
      location: "",
      mapUrl: "",
      latitude: "",
      longitude: "",
    },
    carCharacteristics: [],
  });

  const [formData, setFormData] = useState<NewPostReq>(getInitialFormData());

  const handleSubmit = async () => {
    try {
      await addPost.mutateAsync(formData);

      toast({
        title: "Успешно!",
        description: "Объявление успешно создано",
        variant: "success",
      });

      setFormData(getInitialFormData());
      setActiveTab(0);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать объявление. Попробуйте еще раз.",
        variant: "destructive",
      });
    }
  };

  const tabs = [
    "Детали автомобиля",
    "Цена",
    "Характеристики",
    "Медиа",
    "Местоположение",
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
        <div className="text-[32px] font-bold">Добавить объявление</div>
      </div>

      <div className="border rounded-2xl p-[30px] border-grayBorder">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-8">
          {activeTab === 0 && (
            <CarDetailsForm formData={formData} setFormData={setFormData} />
          )}

          {activeTab === 1 && (
            <PriceInputs formData={formData} setFormData={setFormData} />
          )}

          {activeTab === 2 && (
            <CharacteristicsForm
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {activeTab === 3 && (
            <MediaForm formData={formData} setFormData={setFormData} />
          )}

          {activeTab === 4 && (
            <LocationForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isSubmitting={addPost.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCar;
