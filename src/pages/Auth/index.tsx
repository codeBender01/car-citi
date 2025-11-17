import bg from "@assets/auth/authBg.png";
import LoginForm from "./ui/LoginForm";

const Auth = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-[30px] rounded-2xl bg-white w-[450px]">
        <div className="text-textPrimary text-lg font-dm">Вход</div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Auth;
