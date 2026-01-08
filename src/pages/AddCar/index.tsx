import { useState } from "react";
import Tabs from "@/components/Tabs";
import CarDetailsForm from "./ui/CarDetailsForm";
import PriceInputs from "./ui/PriceInputs";
import CharacteristicsForm from "./ui/CharacteristicsForm";
import MediaForm from "./ui/MediaForm";
import LocationForm from "./ui/LocationForm";
import type { NewPostReq } from "@/interfaces/posts.interface";

const AddCar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState<NewPostReq>({
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
    mileage: "",
    carEquipment: "",
    damage: "",
    categoryId: "",
    phone: "",
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
    carCharacteristics: {
      characteristicId: "",
      characteristicItemId: "",
      checked: false,
    },
  });

  const tabs = [
    "Детали автомобиля",
    "Цена",
    "Характеристики",
    "Медиа",
    "Местоположение",
  ];

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

          {activeTab === 1 && <PriceInputs />}

          {activeTab === 2 && <CharacteristicsForm />}

          {activeTab === 3 && <MediaForm />}

          {activeTab === 4 && <LocationForm />}
        </div>
      </div>
    </div>
  );
};

export default AddCar;
