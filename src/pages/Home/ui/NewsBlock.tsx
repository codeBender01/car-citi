import { BsArrowUpRight } from "react-icons/bs";

import news1 from "@assets/home/news1.png";

const NewsBlock = () => {
  return (
    <div className="2xl:px-[200px] px-[120px] mt-[140px] ">
      <div className="flex items-center justify-between w-full">
        <div className="font-rale text-[40px] text-textPrimary font-bold">
          Свежие записи в блоге
        </div>
        <div className="flex items-center gap-2 font-dm font-medium">
          Посмотреть все
          <BsArrowUpRight />
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-[22px] mt-[50px]">
        <li className=" font-dm">
          <div className="relative">
            <img src={news1} alt="" className="rounded-2xl object-cover" />
            <div className="absolute top-2.5 left-2.5 bg-primary text-white rounded-4xl text-sm px-2 py-1 font-dm">
              Новости
            </div>
          </div>

          <div className="mt-3 font-dm text-sm">Дек 11, 2024</div>
          <div className="mt-3 text-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit....
          </div>
        </li>
        <li className=" font-dm">
          <div className="relative">
            <img src={news1} alt="" className="rounded-2xl object-cover" />
            <div className="absolute top-2.5 left-2.5 bg-primary text-white rounded-4xl text-sm px-2 py-1 font-dm">
              Новости
            </div>
          </div>

          <div className="mt-3 font-dm text-sm">Дек 11, 2024</div>
          <div className="mt-3 text-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit....
          </div>
        </li>
        <li className=" font-dm">
          <div className="relative">
            <img src={news1} alt="" className="rounded-2xl object-cover" />
            <div className="absolute top-2.5 left-2.5 bg-primary text-white rounded-4xl text-sm px-2 py-1 font-dm">
              Новости
            </div>
          </div>

          <div className="mt-3 font-dm text-sm">Дек 11, 2024</div>
          <div className="mt-3 text-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit....
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NewsBlock;
