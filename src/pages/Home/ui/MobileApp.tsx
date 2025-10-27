import mobileApp from "@assets/home/mobileApp.png";
import appView from "@assets/home/appView.png";
import land from "@assets/images/landscape.png";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";

export default function MobileApp() {
  return (
    <div className="2xl:px-[200px] px-[120px] mt-[120px] flex items-center justify-between gap-[30px]">
      <div className="w-[55%]">
        <div className="flex justify-between gap-[30px]">
          <div className="min-w-[155px] h-[155px]">
            <img
              src={mobileApp}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <div className="font-rale text-3xl 2xl:text-[40px] font-bold text-textPrimary">
            Покупайте/продавайте новые и подержанные автомобили, на стоянке или
            в дороге
          </div>
        </div>
        <p className="mt-10 font-dm">
          Скачайте наше приложение, чтобы сохранять автомобили и создавать
          оповещения, сканировать наклейки на окнах на нашей стоянке для
          получения более подробной информации и даже забирать автомобиль,
          удерживая его до 7 дней.
        </p>

        <div className="mt-10 flex items-center gap-[30px]">
          <div className="bg-textPrimary rounded-2xl text-white px-5 py-3.5 w-fit flex items-center">
            <FaApple size={20} />
            <div className="bg-white h-[30px] opacity-30 w-0.5 mx-5"></div>
            <div className="font-dm">
              <div className="text-xs">Download on the</div>
              <div className="text-[15px]">Apple Store</div>
            </div>
          </div>
          <div className="bg-textPrimary rounded-2xl text-white px-5 py-3.5 w-fit flex items-center">
            <FaGooglePlay size={20} />
            <div className="bg-white h-[30px] opacity-30 w-0.5 mx-5"></div>
            <div className="font-dm">
              <div className="text-xs">Get in on</div>
              <div className="text-[15px]">Google Play</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] relative">
        <div className="h-[630px]">
          <img src={land} alt="" className="h-full object-cover rounded-2xl" />
        </div>
        <div className="h-[520px] absolute left-[-15%] bottom-[-10%]">
          <img src={appView} alt="" className="h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
