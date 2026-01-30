import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { BsArrowUpRight } from "react-icons/bs";
import { useGetCharsClient } from "@/api/carSpecsClient/useGetCharsClient";
import type { NewPostReq } from "@/interfaces/posts.interface";

interface CharacteristicsFormProps {
  formData: NewPostReq;
  setFormData: React.Dispatch<React.SetStateAction<NewPostReq>>;
  onNext: () => void;
}

const CharacteristicsForm = ({
  formData,
  setFormData,
  onNext,
}: CharacteristicsFormProps) => {
  const { data: chars } = useGetCharsClient();

  const handleFeatureToggle = (categoryId: string, featureId: string) => {
    setFormData((prev) => {
      const exists = prev.carCharacteristics.some(
        (char) => char.characteristicItemId === featureId,
      );

      if (exists) {
        return {
          ...prev,
          carCharacteristics: prev.carCharacteristics.filter(
            (char) => char.characteristicItemId !== featureId,
          ),
        };
      } else {
        return {
          ...prev,
          carCharacteristics: [
            ...prev.carCharacteristics,
            {
              characteristicId: categoryId,
              characteristicItemId: featureId,
              checked: true,
            },
          ],
        };
      }
    });
  };

  const isFeatureSelected = (featureId: string) => {
    return formData.carCharacteristics.some(
      (char) => char.characteristicItemId === featureId,
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {chars?.data.rows.map((category) => (
          <div key={category.id} className="flex flex-col gap-2">
            <h3 className="text-[16px] font-dm text-textPrimary mb-2">
              {category.name}
            </h3>
            {category.items.map((feature) => (
              <div key={feature.id} className="flex items-center gap-3">
                <Checkbox
                  checked={isFeatureSelected(feature.id)}
                  onCheckedChange={() =>
                    handleFeatureToggle(category.id, feature.id)
                  }
                  className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
                />
                <label className="text-base font-rale text-textPrimary cursor-pointer">
                  {feature.name}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="col-span-4">
        <Button
          onClick={onNext}
          size="none"
          className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center mt-[30px] gap-2.5 py-4 px-[25px] ml-auto w-fit"
        >
          Далее
          <BsArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default CharacteristicsForm;
