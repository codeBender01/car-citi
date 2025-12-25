import AddFaqModal from "./ui/AddFaqModal";

const Faq = () => {
  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm flex items-center justify-between text-textSecondary">
        <div className="text-[32px] font-bold">
          FAQ (недавно заданные вопросы)
        </div>
        <AddFaqModal />
      </div>
      <div className="mt-10"></div>
    </div>
  );
};

export default Faq;
