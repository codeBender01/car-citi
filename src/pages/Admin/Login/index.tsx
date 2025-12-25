import bg from "@assets/auth/authBg.png";
import AdminLoginForm from "./ui/AdminLoginForm";

const AdminLogin = () => {
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
        <div className="text-textPrimary text-lg font-dm">Вход в Админ Панель</div>
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;