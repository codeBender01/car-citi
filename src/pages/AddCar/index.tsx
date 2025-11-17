import { useState } from "react";
import Tabs from "@/components/Tabs";
import CarDetailsForm from "./ui/CarDetailsForm";
import PriceInputs from "./ui/PriceInputs";
import CharacteristicsForm from "./ui/CharacteristicsForm";
import MediaForm from "./ui/MediaForm";
import LocationForm from "./ui/LocationForm";

const AddCar = () => {
  const [activeTab, setActiveTab] = useState(0);

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
        <div className="text-[32px] font-bold">Добавить объявления</div>
        <p className="text-textSecondary text-base">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>

      <div className="border rounded-2xl p-[30px] border-grayBorder">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-8">
          {activeTab === 0 && <CarDetailsForm />}

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
