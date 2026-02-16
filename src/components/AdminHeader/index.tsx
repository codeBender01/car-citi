import LogoDashboard from "@/svgs/LogoDashboard";
import BurgerMenu from "@/svgs/BurgerMenu";
import { CiSearch } from "react-icons/ci";

import { Input } from "../ui/input";

const AdminHeader = () => {
  return (
    <header className="px-10 py-9 2xl:px-[60px] flex items-center justify-between">
      <div className="flex items-center">
        <LogoDashboard />
        <div className="ml-16 flex gap-8 items-center">
          <BurgerMenu />
          <div className="text-white flex items-center">
            <CiSearch />
            <Input
              className="border-none text-white placeholder:text-white"
              placeholder="Поиск"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {/* <div className="relative ml-12" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <span className="text-xl">{currentLanguage.flag}</span>
            <span className="font-dm font-medium text-[15px]">
              {currentLanguage.name}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[180px] overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    lang.code === i18n.language
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-dm font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default AdminHeader;
