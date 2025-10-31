import user from "@/assets/header/user.png";
import Parentheses from "@/svgs/Parentheses";
import { BsArrowUpRight } from "react-icons/bs";
import { reviews } from "../lib/reviews";

const Reviews = ({ variant }: { variant: string }) => {
  return (
    <>
      <div
        className={`flex items-center justify-between ${
          variant === "white" ? "text-white" : "text-textPrimary"
        }`}
      >
        <div className="font-rale text-[40px] font-bold">
          Что говорят наши клиенты
        </div>
        <div className="flex items-center gap-2 font-dm font-medium">
          Посмотреть все
          <BsArrowUpRight />
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-7 mt-[50px]">
        {reviews.map((r) => {
          return (
            <li
              key={r.id}
              className={`${
                variant === "white" ? "bg-white" : "bg-transparent"
              } p-10 rounded-2xl`}
            >
              <div className="flex items-center justify-between">
                <div className="font-rale text-2xl font-bold">{r.message}</div>
                <Parentheses />
              </div>
              <p className="mt-12 font-dm">
                {" "}
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad.”
              </p>

              <div className="mt-12 flex items-center gap-3">
                <div className="h-16 w-16 rounded-full">
                  <img
                    src={user}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="font-dm font-medium">Floyd Alexander</div>
                  <div className="text-sm font-dm">Toyota Avalon 2022</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Reviews;
