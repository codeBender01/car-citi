import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BsArrowUpRight } from "react-icons/bs";
import type { NewPostReq } from "@/interfaces/posts.interface";

interface PriceInputsProps {
  formData: NewPostReq;
  setFormData: React.Dispatch<React.SetStateAction<NewPostReq>>;
  onNext: () => void;
}

const PriceInputs = ({ formData, setFormData, onNext }: PriceInputsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full min-h-[60px]">
        <Input
          type="text"
          value={formData.carPrice.price || ""}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({
              ...formData,
              carPrice: {
                ...formData.carPrice,
                price: val === "" ? 0 : parseInt(val) || 0,
              },
            });
          }}
          placeholder="Пример 1000"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Цена (TMT)
        </span>
      </div>
      <div className="relative w-full min-h-[60px]">
        <Input
          onChange={(e) =>
            setFormData({
              ...formData,
              carPrice: {
                ...formData.carPrice,
                prefixPrice: e.target.value,
              },
            })
          }
          value={formData.carPrice.prefixPrice}
          type="text"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Префикс цены
        </span>
        <div className="text-base ml-2 mt-5 font-dm">
          Любой текст, указанный перед ценой (например: от).
        </div>
      </div>
      <div className="relative w-full min-h-[60px]">
        <Input
          onChange={(e) =>
            setFormData({
              ...formData,
              carPrice: {
                ...formData.carPrice,
                suffixPrice: e.target.value,
              },
            })
          }
          value={formData.carPrice.suffixPrice}
          type="text"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Суффикс цены
        </span>
        <div className="text-base ml-2 mt-5 font-dm">
          Любой текст, указанный после цены (например: Торг).
        </div>
      </div>
      <div className="relative w-full min-h-[60px]">
        <Input
          onChange={(e) =>
            setFormData({
              ...formData,
              carPrice: {
                ...formData.carPrice,
                customPrice: e.target.value,
              },
            })
          }
          value={formData.carPrice.customPrice}
          type="text"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Price Custom
        </span>
        <div className="text-base ml-2 mt-5 font-dm">
          Любой текст вместо цены (например: по договоренности). Префикс и
          суффикс игнорируются.
        </div>
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

export default PriceInputs;
