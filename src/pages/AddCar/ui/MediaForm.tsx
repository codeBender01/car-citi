import UploadBox from "@/components/UploadBox";
import { Button } from "@/components/ui/button";
import { BsArrowUpRight } from "react-icons/bs";
import { Input } from "@/components/ui/input";

const MediaForm = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="font-dm text-textPrimary">
        <div className="text-base mb-4">Галерея</div>
        <div className="flex items-center gap-6">
          <UploadBox />
        </div>
        <p className="text-base font-light mt-4">
          Максимальный размер файла - 1 МБ, минимальный размер: 330x300.
          Подходящие файлы - .jpg и .png.
        </p>
      </div>
      <div className="font-dm text-textPrimary">
        <div className="text-base mb-4">Вложения / файлы</div>
        <div className="flex items-center gap-6">
          <UploadBox />
        </div>
        <p className="text-base font-light mt-4">
          Максимальный размер файла - 10 МБ. Подходящие файлы - .pdf и .doc
        </p>
      </div>
      <div>
        <div className="text-base mb-4">Видео</div>
        <div className="relative w-full min-h-[60px]">
          <Input
            type="text"
            className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
          />
          <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
            Ссылка на видео
          </span>
          <div className="text-base ml-2 mt-5 font-dm">
            Введите URL-адрес Youtube или Vimeo.
          </div>
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

export default MediaForm;
