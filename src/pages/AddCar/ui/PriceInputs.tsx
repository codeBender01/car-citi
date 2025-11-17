import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BsArrowUpRight } from "react-icons/bs";
import { useState } from "react";

const PriceInputs = () => {
  const [price, setPrice] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full min-h-[60px]">
        <Input
          type="text"
          value={price ? price : undefined}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          placeholder="Пример 1000"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Цена ($)
        </span>
      </div>
      <div className="relative w-full min-h-[60px]">
        <Input
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
