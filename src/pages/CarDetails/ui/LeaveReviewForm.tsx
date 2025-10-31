import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { BsArrowUpRight } from "react-icons/bs";
import { ratings } from "../lib/ratings";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LeaveReviewForm = () => {
  const [selectedRatings, setSelectedRatings] = useState<
    Record<number, number>
  >({});
  const [hoveredRatings, setHoveredRatings] = useState<Record<number, number>>(
    {}
  );

  const handleStarClick = (ratingId: number, starIndex: number) => {
    setSelectedRatings((prev) => ({
      ...prev,
      [ratingId]: starIndex,
    }));
  };

  const handleStarHover = (ratingId: number, starIndex: number) => {
    setHoveredRatings((prev) => ({
      ...prev,
      [ratingId]: starIndex,
    }));
  };

  const handleMouseLeave = (ratingId: number) => {
    setHoveredRatings((prev) => {
      const newState = { ...prev };
      delete newState[ratingId];
      return newState;
    });
  };

  const getStarRating = (ratingId: number) => {
    return hoveredRatings[ratingId] ?? selectedRatings[ratingId] ?? 0;
  };

  return (
    <div className="bg-white border border-grayBorder p-10 mt-[30px] rounded-2xl font-dm flex flex-col gap-10">
      <div className="text-[26px]">Оставить отзыв</div>
      <p className="font-dm text-base text-textPrimary">
        Ваш адрес электронной почты опубликован не будет. Поля, обязательные для
        заполнения, помечены *
      </p>

      <ul className="grid grid-cols-2 gap-x-8 gap-y-6">
        {ratings.map((r) => {
          const currentRating = getStarRating(r.id);
          return (
            <li
              key={r.id}
              className="flex items-center justify-between text-base font-dm font-light"
            >
              <div className="">{r.text}</div>
              <div
                className="flex items-center text-[22px] text-primary gap-1"
                onMouseLeave={() => handleMouseLeave(r.id)}
              >
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const isFilled = starIndex <= currentRating;
                  return (
                    <button
                      key={starIndex}
                      type="button"
                      onClick={() => handleStarClick(r.id, starIndex)}
                      onMouseEnter={() => handleStarHover(r.id, starIndex)}
                      className="cursor-pointer transition-all duration-150 hover:scale-110"
                    >
                      {isFilled ? (
                        <TiStarFullOutline className="text-primary" />
                      ) : (
                        <TiStarOutline className="text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      <form className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <Input
              type="text"
              id="name"
              placeholder=" "
              className="w-full px-5 py-4 rounded-xl border border-grayBorder bg-white font-dm text-[15px] text-textPrimary h-auto peer"
            />
            <Label
              htmlFor="name"
              className="absolute left-5 top-1/2 -translate-y-1/2 font-dm text-[13px] text-[#818181] transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
            >
              Имя
            </Label>
          </div>

          <div className="relative">
            <Input
              type="email"
              id="email"
              placeholder=" "
              className="w-full px-5 py-4 rounded-xl border border-grayBorder bg-white font-dm text-[15px] text-textPrimary h-auto peer"
            />
            <Label
              htmlFor="email"
              className="absolute left-5 top-1/2 -translate-y-1/2 font-dm text-[13px] text-[#818181] transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
            >
              Почта
            </Label>
          </div>
        </div>

        <div className="relative">
          <Input
            type="text"
            id="title"
            placeholder=" "
            className="w-full px-5 py-4 rounded-xl border border-grayBorder bg-white font-dm text-[15px] text-textPrimary h-auto peer"
          />
          <Label
            htmlFor="title"
            className="absolute left-5 top-1/2 -translate-y-1/2 font-dm text-[13px] text-[#818181] transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
          >
            Заголовок
          </Label>
        </div>

        <div className="relative">
          <Textarea
            id="message"
            placeholder=" "
            className="w-full h-[200px] px-5 py-4 rounded-xl border border-grayBorder bg-white font-dm text-[15px] text-textPrimary resize-none peer"
          />
          <Label
            htmlFor="message"
            className="absolute left-5 top-4 font-dm text-[13px] text-[#818181] transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
          >
            Сообщение
          </Label>
        </div>
      </form>

      <Button
        size="none"
        className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center mt-10 gap-2.5 py-4 px-[25px] w-fit"
      >
        Оставить Отзыв
        <BsArrowUpRight />
      </Button>
    </div>
  );
};

export default LeaveReviewForm;
