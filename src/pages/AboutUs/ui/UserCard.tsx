import user from "@assets/aboutUs/user.png";

const UserCard = () => {
  return (
    <div className="flex flex-col items-center max-w-[260px]">
      <div className="relative group">
        <img src={user} alt="team" className="rounded-2xl" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="py-2 px-4 bg-white rounded-4xl text-center">
            user@carciti.com
          </div>
          <div className="py-2 px-4 bg-white rounded-4xl text-center mt-2">
            +90 533 888 4706
          </div>
        </div>
      </div>

      <div className="mt-5 text-[20px] font-rale font-bold">Имя Фамилия</div>
      <div className="mt-3 font-dm font-normal text-sm">
        Software Development Manager
      </div>
    </div>
  );
};

export default UserCard;
