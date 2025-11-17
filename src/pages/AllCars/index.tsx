import { FiChevronDown } from "react-icons/fi";

import CarCard from "@/components/CarCard";
import Filters from "./ui/Filters";

import { useGetPosts } from "@/api/posts";

const AllCars = () => {
  const { data: posts } = useGetPosts();

  return (
    <div className="pt-[180px] px-20 2xl:px-[118px]">
      <div className="font-dm text-[15px] flex gap-1">
        <span className="text-primary">Домашняя страница</span> /{" "}
        <span>Поиск</span>
      </div>
      <div className="h2 mt-5">
        Результаты поиска{" "}
        <span className="text-primary border-b-2 border-primary">1,445</span>{" "}
        автомобилей
      </div>
      <div className="mt-16 flex justify-between">
        <Filters />
        <div className="w-[70%]">
          <div className="flex items-center justify-between font-dm text-base">
            <div className="text-textPrimary">
              Показаны от 1 до 15 из 1,445 автомобилей
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-textGray">Сортировать по</span>
              <span className="flex items-center gap-2">
                Новые
                <FiChevronDown />
              </span>
            </div>
          </div>

          <div className="mt-[50px] grid grid-cols-3 gap-7">
            {posts?.data.rows.map((car, idx) => {
              return <CarCard car={car} key={idx} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCars;
