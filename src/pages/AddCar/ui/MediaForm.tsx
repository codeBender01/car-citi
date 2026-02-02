import { useState } from "react";
import UploadBox from "@/components/UploadBox";
import { Button } from "@/components/ui/button";
import { BsArrowUpRight } from "react-icons/bs";
import { useUploadSingle } from "@/api/upload/useUploadSingle";
import type { NewPostReq } from "@/interfaces/posts.interface";
import { X } from "lucide-react";
import { BASE_URL } from "@/api";

interface MediaFormProps {
  formData: NewPostReq;
  setFormData: React.Dispatch<React.SetStateAction<NewPostReq>>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const MediaForm = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: MediaFormProps) => {
  const uploadSingle = useUploadSingle();
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file);
      const res = await uploadSingle.mutateAsync(formDataObj);

      setFormData({
        ...formData,
        carImages: {
          ...formData.carImages,
          images: [
            ...formData.carImages.images,
            { url: res.data.url, hashblur: res.data.hashblur },
          ],
        },
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData({
      ...formData,
      carImages: {
        ...formData.carImages,
        images: formData.carImages.images.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="font-dm text-textPrimary">
        <div className="text-base mb-4">Галерея</div>
        <div className="flex items-center gap-6 flex-wrap">
          {/* Display uploaded images */}
          {formData.carImages.images.map((image, index) => (
            <div
              key={index}
              className="relative w-[190px] h-[167px] rounded-lg overflow-hidden border-2 border-primary"
            >
              <img
                src={`${BASE_URL}/${image.url}`}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Upload box */}
          <UploadBox
            onFileSelect={handleImageUpload}
            accept="image/jpeg,image/jpg,image/png"
            multiple={false}
          />

          {/* Loading indicator */}
          {uploadingImage && (
            <div className="w-[190px] h-[167px] bg-mainBg border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
              <p className="text-sm text-textPrimary">Загрузка...</p>
            </div>
          )}
        </div>
        <p className="text-base font-light mt-4">
          Максимальный размер файла - 5 МБ, максимальный размер: 330x300px и
          количество 10 шт. Подходящие файлы - .jpg и .png.
        </p>
      </div>

      <div className="col-span-4">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          size="none"
          className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center mt-[30px] gap-2.5 py-4 px-[25px] ml-auto w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Отправка..." : "Далее"}
          <BsArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default MediaForm;
