import LabeledInput from "@/components/LabeledInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BsArrowUpRight } from "react-icons/bs";
import maps from "@assets/images/maps2.png";

const LocationForm = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-6">
        <LabeledInput label="Адрес" placeholder="" />
        <LabeledInput label="Местоположение" placeholder="" />
      </div>

      <div>
        <img src={maps} alt="" className="max-w-full" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <LabeledInput label="Долгота" placeholder="" />
        <LabeledInput label="Широта" placeholder="" />
        <div className="relative col-span-2">
          <Textarea
            id="message"
            placeholder=" "
            className="w-full h-[200px] px-5 py-4 rounded-xl border border-grayBorder bg-white font-dm text-[15px] text-textPrimary resize-none peer"
          />
          <label
            htmlFor="message"
            className="absolute left-5 top-4 font-dm text-[13px] text-[#818181] transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
          >
            Описание
          </label>
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

export default LocationForm;