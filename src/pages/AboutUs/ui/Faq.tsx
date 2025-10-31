interface FaqProps {
  question: {
    id: number;
    title: string;
  };
  index: number;
  openId: number | null;
  onToggle: (id: number) => void;
}

const Faq = ({ question, openId, onToggle }: FaqProps) => {
  return (
    <li
      onClick={() => onToggle(question.id)}
      className={` py-[38px] px-[33px] border-textPrimary relative cursor-pointer`}
    >
      <div className="flex justify-between transition-all duration-300">
        <div className="flex flex-col relative w-[80%]">
          <div className="text-textPrimary w-[80%] font-rale text-[20px] font-bold">
            {question.title}
          </div>
          <div
            className={`${
              openId === question.id
                ? "max-h-[500px] opacity-100 mt-6"
                : "max-h-0 opacity-0"
            } duration-300 flex flex-col gap-10`}
          >
            <p
              className={`text-textPrimary overflow-hidden transition-all text-lg font-dm`}
            >
              Просто выберите параметры авто с помощью фильтров, найдите
              подходящий вариант и свяжитесь с дилером для дальнейшей покупки.
            </p>
          </div>
        </div>
        <div className="relative w-5 h-5 shrink-0 transition-transform duration-300">
          <div
            className={`absolute top-1/2 left-1/2 h-0.5 w-[18px] bg-textPrimary transition-transform duration-300 -translate-x-1/2 -translate-y-1/2 ${
              openId === question.id ? "rotate-45" : "rotate-0"
            }`}
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 h-0.5 w-[18px] bg-textPrimary transition-transform duration-300 -translate-x-1/2 -translate-y-1/2 ${
              openId === question.id ? "-rotate-45" : "rotate-90"
            }`}
          ></div>
        </div>
      </div>
    </li>
  );
};

export default Faq;
