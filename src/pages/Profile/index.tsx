import UploadBox from "@/components/UploadBox";
import LabeledInput from "@/components/LabeledInput";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { BASE_URL } from "@/api";
import { useGetProfile } from "@/api/auth/useGetProfile";
import { useUpdatePersonalProfile } from "@/api/profile/useUpdatePersonalProfile";
import { useUpdateBusinessProfile } from "@/api/profile/useUpdateBusinessProfile";
import { useUploadSingle } from "@/api/upload/useUploadSingle";
import { useToast } from "@/hooks/use-toast";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteAccount } from "@/api/profile/useDeleteAccount";
import type {
  UpdatePersonalProfileReq,
  UpdateBusinessProfileReq,
} from "@/interfaces/profile.interface";

const Profile = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { toast } = useToast();
  const navigate = useNavigate();

  const updatePersonalProfile = useUpdatePersonalProfile();
  const updateBusinessProfile = useUpdateBusinessProfile();
  const uploadSingle = useUploadSingle();
  const deleteAccount = useDeleteAccount();

  const [avatarPreview, setAvatarPreview] = useState("");
  const [emailError, setEmailError] = useState("");
  const [personalProfile, setPersonalProfile] =
    useState<UpdatePersonalProfileReq>({
      smsSubscribtion: false,
      avatar: "",
      name: "",
      email: "",
    });
  const [businessProfileData, setBusinessProfileData] =
    useState<UpdateBusinessProfileReq>({
      smsSubscribtion: false,
      name: "",
      logo: "",
      emails: [],
      baranchAddresses: [""],
      socialMedia: [],
    });

  const isPersonal = profile?.data.accountType === "Personal";

  const getSocialMediaValue = (name: string) => {
    const entry = businessProfileData.socialMedia.find(
      (s) => s.name === name,
    );
    return entry?.url || "";
  };

  const updateSocialMedia = (name: string, url: string) => {
    setBusinessProfileData((prev) => {
      const existing = prev.socialMedia.filter((s) => s.name !== name);
      if (url) {
        return { ...prev, socialMedia: [...existing, { name, url }] };
      }
      return { ...prev, socialMedia: existing };
    });
  };

  useEffect(() => {
    if (profile) {
      if (isPersonal) {
        setPersonalProfile((prev) => ({
          ...prev,
          smsSubscribtion: profile.data.smsSubscribtion,
          name: profile.data.userProfile?.name || "",
          avatar: profile.data.userProfile?.avatar || "",
          email: profile.data.userProfile?.email || "",
        }));
        if (profile.data.userProfile?.avatar) {
          setAvatarPreview(`${BASE_URL}/${profile.data.userProfile.avatar}`);
        }
      } else {
        const bp = profile.data.businesProfile;
        setBusinessProfileData((prev) => ({
          ...prev,
          smsSubscribtion: profile.data.smsSubscribtion,
          name: bp?.name || "",
          logo: bp?.logo || "",
          emails: bp?.emails || [],
          baranchAddresses:
            bp?.baranchAddresses?.length ? bp.baranchAddresses : [""],
          socialMedia: bp?.socialMedia || [],
        }));
        if (bp?.logo) {
          setAvatarPreview(`${BASE_URL}/${bp.logo}`);
        }
      }
    }
  }, [profile, isPersonal]);

  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    const objectUrl = URL.createObjectURL(file);
    formData.append("file", file);
    setAvatarPreview(objectUrl);

    const res = await uploadSingle.mutateAsync(formData);
    if (res.data) {
      if (isPersonal) {
        setPersonalProfile((prev) => ({
          ...prev,
          avatar: res.data.url,
        }));
      } else {
        setBusinessProfileData((prev) => ({
          ...prev,
          logo: res.data.url,
        }));
      }
    }
  };

  const handleProfileUpdate = async () => {
    if (isPersonal) {
      if (
        personalProfile.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalProfile.email)
      ) {
        setEmailError("Введите корректный email");
        return;
      }
      try {
        await updatePersonalProfile.mutateAsync(personalProfile);
        toast({
          title: "Успешно сохранено",
          description: "Ваш профиль был успешно обновлен",
          variant: "success",
        });
      } catch {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить профиль. Попробуйте снова.",
          variant: "destructive",
        });
      }
    } else {
      try {
        await updateBusinessProfile.mutateAsync(businessProfileData);
        toast({
          title: "Успешно сохранено",
          description: "Ваш бизнес-профиль был успешно обновлен",
          variant: "success",
        });
      } catch {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить профиль. Попробуйте снова.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount.mutateAsync();

      localStorage.removeItem("accessToken");

      toast({
        title: "Аккаунт удален",
        description: "Ваш аккаунт был успешно удален",
        variant: "success",
      });

      navigate("/home");
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить аккаунт. Попробуйте снова.",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  if (profileLoading) {
    return (
      <div className="p-4 md:p-[35px] 2xl:p-[60px] flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-6 md:mb-10">
        <div className="text-2xl md:text-[32px] font-bold">Профиль</div>
        <p className="text-textSecondary text-sm md:text-base">
          Тип профиля:{" "}
          <span className="font-bold">
            {isPersonal ? "Простой" : "Бизнес"}
          </span>
        </p>
      </div>

      <div className="border border-headerBorder p-3 md:p-4 rounded-2xl">
        <div className="flex my-4 flex-col gap-4">
          <Label htmlFor="smsSub" className="font-sans font-medium">
            Смс подписка
          </Label>
          <Switch
            checked={
              isPersonal
                ? personalProfile.smsSubscribtion
                : businessProfileData.smsSubscribtion
            }
            onCheckedChange={(checked) => {
              if (isPersonal) {
                setPersonalProfile({
                  ...personalProfile,
                  smsSubscribtion: checked,
                });
              } else {
                setBusinessProfileData({
                  ...businessProfileData,
                  smsSubscribtion: checked,
                });
              }
            }}
            id="smsSub"
          />
        </div>
        <div className="font-dm text-textPrimary">
          <div className="text-base">Аватар</div>
          <div className="my-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            {avatarPreview !== "" && (
              <div className="w-[190px] h-[170px]">
                <img
                  src={avatarPreview}
                  alt=""
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
            )}

            <UploadBox onFileSelect={handleAvatarUpload} />
          </div>
          <p className="text-base font-light">
            Максимальный размер файла - 1 МБ, минимальный размер: 330x300.
            Подходящие файлы - .jpg и .png.
          </p>
        </div>

        <div className="h-0.5 my-[30px] w-full bg-grayBorder"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <LabeledInput
            value={profile?.data.phone || ""}
            label="Номер телефона"
            placeholder=""
            readOnly
          />
          <LabeledInput
            onChange={(e) => {
              if (isPersonal) {
                setPersonalProfile({
                  ...personalProfile,
                  name: e.target.value,
                });
              } else {
                setBusinessProfileData({
                  ...businessProfileData,
                  name: e.target.value,
                });
              }
            }}
            value={isPersonal ? personalProfile.name : businessProfileData.name}
            label="Имя"
            placeholder="Введите ваше имя"
          />
          <div>
            <LabeledInput
              onChange={(e) => {
                const value = e.target.value;
                if (isPersonal) {
                  setPersonalProfile({
                    ...personalProfile,
                    email: value,
                  });
                }
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  setEmailError("Введите корректный email");
                } else {
                  setEmailError("");
                }
              }}
              value={personalProfile.email}
              type="email"
              label="Email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1 ml-1">{emailError}</p>
            )}
          </div>
          {!isPersonal && (
            <>
              <LabeledInput
                label="Whatsapp"
                type="tel"
                placeholder="+98 (___) ___-__-__"
                value={getSocialMediaValue("whatsapp")}
                onChange={(e) => updateSocialMedia("whatsapp", e.target.value)}
              />
              <LabeledInput
                label="Instagram"
                placeholder="@username"
                value={getSocialMediaValue("instagram")}
                onChange={(e) => updateSocialMedia("instagram", e.target.value)}
              />
              <LabeledInput
                label="Адрес"
                placeholder=""
                value={businessProfileData.baranchAddresses[0] || ""}
                onChange={(e) =>
                  setBusinessProfileData((prev) => ({
                    ...prev,
                    baranchAddresses: [e.target.value],
                  }))
                }
              />
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4">
          <Button
            onClick={handleProfileUpdate}
            disabled={
              updatePersonalProfile.isPending ||
              updateBusinessProfile.isPending
            }
            size="none"
            className="text-white bg-primary hover:bg-white hover:text-darkGreen border border-white  font-dm text-[15px] w-fit cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] "
          >
            {updatePersonalProfile.isPending ||
            updateBusinessProfile.isPending
              ? "Сохранение..."
              : "Сохранить"}
          </Button>
          <Button
            onClick={handleDeleteAccount}
            disabled={deleteAccount.isPending}
            size="none"
            className="text-white bg-red-600 hover:bg-red-700 border border-red-600 hover:border-red-700 font-dm text-[15px] w-fit cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteAccount.isPending ? "Удаление..." : "Удалить аккаунт"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
