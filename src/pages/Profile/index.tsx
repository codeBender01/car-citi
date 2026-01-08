import UploadBox from "@/components/UploadBox";
import LabeledInput from "@/components/LabeledInput";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useGetProfile } from "@/api/auth/useGetProfile";
import { useUpdatePersonalProfile } from "@/api/profile/useUpdatePersonalProfile";
import { useUploadSingle } from "@/api/upload/useUploadSingle";
import { useToast } from "@/hooks/use-toast";

import { useEffect, useState } from "react";
import type { UpdatePersonalProfileReq } from "@/interfaces/profile.interface";

const Profile = () => {
  const { data: profile } = useGetProfile();
  const { toast } = useToast();

  const updatePersonalProfile = useUpdatePersonalProfile();
  const uploadSingle = useUploadSingle();

  const [avatarPreview, setAvatarPreview] = useState("");
  const [personalProfile, setPersonalProfile] =
    useState<UpdatePersonalProfileReq>({
      smsSubscribtion: false,
      avatar: "",
      name: "",
    });

  useEffect(() => {
    if (profile) {
      if (profile.data.accountType === "Personal") {
        setPersonalProfile({
          ...personalProfile,
          smsSubscribtion: profile.data.smsSubscribtion,
        });
      }
    }
  }, [profile]);

  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    const objectUrl = URL.createObjectURL(file);
    formData.append("file", file);
    setAvatarPreview(objectUrl);

    const res = await uploadSingle.mutateAsync(formData);
    if (res.data) {
      setPersonalProfile({
        ...personalProfile,
        avatar: res.data.url,
      });
    }
  };

  const handleProfileUpdate = async () => {
    if (profile?.data.accountType === "Personal") {
      try {
        await updatePersonalProfile.mutateAsync(personalProfile);

        toast({
          title: "Успешно сохранено",
          description: "Ваш профиль был успешно обновлен",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить профиль. Попробуйте снова.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">Профиль</div>
        <p className="text-textSecondary text-base">
          Тип профиля:{" "}
          <span className="font-bold">
            {profile?.data.accountType === "Personal" ? "Простой" : "Бизнес"}
          </span>
        </p>
      </div>

      <div className="border border-headerBorder p-4 rounded-2xl">
        <div className="flex my-4 flex-col gap-4">
          <Label htmlFor="smsSub" className="font-sans font-medium">
            Смс подписка
          </Label>
          <Switch
            checked={personalProfile.smsSubscribtion}
            onCheckedChange={(checked) =>
              setPersonalProfile({
                ...personalProfile,
                smsSubscribtion: checked,
              })
            }
            id="smsSub"
          />
        </div>
        <div className="font-dm text-textPrimary">
          <div className="text-base">Аватар</div>
          <div className="my-4 flex items-center gap-6">
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

        <div className="grid grid-cols-3 gap-6">
          <LabeledInput
            onChange={(e) => {
              setPersonalProfile({
                ...personalProfile,
                name: e.target.value,
              });
            }}
            label="Имя"
            placeholder="Введите ваше имя"
          />
          {profile?.data.accountType !== "Personal" ? (
            <>
              <LabeledInput
                label="Email"
                type="email"
                placeholder="example@mail.com"
              />
              <LabeledInput
                label="Whatsapp"
                type="tel"
                placeholder="+98 (___) ___-__-__"
              />
              <LabeledInput
                label="Instagram"
                type="tel"
                placeholder="@username"
              />
              <LabeledInput label="Адрес" placeholder="" />
            </>
          ) : null}
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            onClick={handleProfileUpdate}
            size="none"
            className="text-white bg-primary hover:bg-white hover:text-darkGreen border border-white  font-dm text-[15px] w-fit cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] "
          >
            Сохранить
          </Button>
          <Button
            size="none"
            className="text-white bg-red-600 hover:bg-red-700 border border-red-600 hover:border-red-700 font-dm text-[15px] w-fit cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px]"
          >
            Удалить аккаунт
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
