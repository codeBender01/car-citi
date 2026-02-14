import { BsArrowUpRight } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import banner from "@assets/home/banner.jpeg";

interface DealersBannerProps {
  title: string;
  description: string;
  buttonText: string;
}

const DealersBanner = ({ title, description, buttonText }: DealersBannerProps) => {
  return (
    <div className="bg-textPrimary flex flex-col md:flex-row md:h-[500px] mx-4 md:mx-0">
      <div className="w-full md:w-[50%] h-full">
        <img
          src={banner}
          alt=""
          className="object-contain md:rounded-0 rounded-lg h-full"
        />
      </div>
      <div className="w-full md:w-[40%] mx-auto flex md:items-center flex-col px-[30px] md:px-0 md:py-0 py-[35px] justify-center gap-10 h-full text-white">
        <div className="text-[26px] md:text-[40px] font-rale font-bold">
          {title}
        </div>
        <p className="font-dm text-base">{description}</p>
        <Button
          size="none"
          className="bg-transparent self-start text-white font-dm text-[15px] cursor-pointer rounded-xl w-full md:w-fit flex items-center gap-2.5 py-[22.5px] font-medium px-[25px] border border-white"
        >
          <div>{buttonText}</div>
          <BsArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default DealersBanner;
