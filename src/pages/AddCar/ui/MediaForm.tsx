import { useState } from "react";
import UploadBox from "@/components/UploadBox";
import { Button } from "@/components/ui/button";
import { BsArrowUpRight } from "react-icons/bs";
import { Input } from "@/components/ui/input";
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

const MediaForm = ({ formData, setFormData, onSubmit, isSubmitting }: MediaFormProps) => {
  const uploadSingle = useUploadSingle();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingReport, setUploadingReport] = useState(false);

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

  const handleReportUpload = async (file: File) => {
    setUploadingReport(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file);
      const res = await uploadSingle.mutateAsync(formDataObj);

      setFormData({
        ...formData,
        carImages: {
          ...formData.carImages,
          reports: [
            ...formData.carImages.reports,
            { url: res.data.url, name: file.name },
          ],
        },
      });
    } catch (error) {
      console.error("Report upload failed:", error);
    } finally {
      setUploadingReport(false);
    }
  };

  const handleReportRemove = (index: number) => {
    setFormData({
      ...formData,
      carImages: {
        ...formData.carImages,
        reports: formData.carImages.reports.filter((_, i) => i !== index),
      },
    });
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      carImages: {
        ...formData.carImages,
        videoUrl: e.target.value,
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
      <div className="font-dm text-textPrimary">
        <div className="text-base mb-4">Вложения / файлы</div>
        <div className="flex flex-col gap-4">
          {/* Display uploaded reports */}
          {formData.carImages.reports.map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg border-grayBorder"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-textPrimary font-medium">
                  {report.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleReportRemove(index)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Upload section */}
          <div className="flex items-center gap-6">
            <UploadBox
              onFileSelect={handleReportUpload}
              accept=".pdf,.doc,.docx"
              multiple={false}
            />
            {uploadingReport && (
              <p className="text-sm text-textPrimary">Загрузка...</p>
            )}
          </div>
        </div>
        <p className="text-base font-light mt-4">
          Максимальный размер файла - 10 МБ. Подходящие файлы - .pdf и .doc
        </p>
      </div>
      <div>
        <div className="text-base mb-4">Видео</div>
        <div className="relative w-full min-h-[60px]">
          <Input
            type="text"
            value={formData.carImages.videoUrl}
            onChange={handleVideoUrlChange}
            className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
          />
          <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
            Ссылка на видео
          </span>
          <div className="text-base ml-2 mt-5 font-dm">
            Введите URL-адрес Youtube или Vimeo.
          </div>
        </div>
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
