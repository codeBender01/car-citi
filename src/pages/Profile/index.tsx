import benz3 from "@assets/images/benz3.png";
import benz2 from "@assets/images/benz2.png";
import benz from "@assets/images/benz4.png";

import maps from "@assets/images/maps2.png";

import UploadBox from "@/components/UploadBox";
import LabeledInput from "@/components/LabeledInput";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">Профиль</div>
        <p className="text-textSecondary text-base">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>

      <div className="border border-headerBorder p-4 rounded-2xl">
        <div className="font-dm text-textPrimary">
          <div className="text-base">Аватар</div>
          <div className="my-4 flex items-center gap-6">
            <div className="w-[190px] h-[170px]">
              <img
                src={benz3}
                alt=""
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>

            <UploadBox />
          </div>
          <p className="text-base font-light">
            Максимальный размер файла - 1 МБ, минимальный размер: 330x300.
            Подходящие файлы - .jpg и .png.
          </p>
        </div>

        <div className="h-0.5 my-[30px] w-full bg-grayBorder"></div>

        <div className="grid grid-cols-3 gap-6">
          <LabeledInput label="Имя" placeholder="Введите ваше имя" />
          <LabeledInput label="Фамилия" placeholder="Введите ваше имя" />
          <LabeledInput
            label="Email"
            type="email"
            placeholder="example@mail.com"
          />
          <LabeledInput
            label="Телефон"
            type="tel"
            placeholder="+7 (___) ___-__-__"
          />
          <LabeledInput
            label="Whatsapp"
            type="tel"
            placeholder="+98 (___) ___-__-__"
          />
          <LabeledInput
            label="Вебсайт"
            type="tel"
            placeholder="+98 (___) ___-__-__"
          />
        </div>

        <div className="font-dm text-textPrimary">
          <div className="text-base">Изображения</div>
          <div className="my-4 flex items-center gap-6">
            <div className="w-[190px] h-[170px]">
              <img
                src={benz3}
                alt=""
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
            <div className="w-[190px] h-[170px]">
              <img
                src={benz2}
                alt=""
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
            <div className="w-[190px] h-[170px]">
              <img
                src={benz}
                alt=""
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>

            <UploadBox />
          </div>
          <p className="text-base font-light">
            Максимальный размер файла - 1 МБ, минимальный размер: 330x300.
            Подходящие файлы - .jpg и .png.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-[30px]">
          <LabeledInput label="Адрес" placeholder="" />
          <LabeledInput label="Местоположение" placeholder="" />
        </div>

        <div className="mt-[30px]">
          <img src={maps} alt="" className="max-w-full" />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-[30px]">
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
      </div>
    </div>
  );
};

export default Profile;
