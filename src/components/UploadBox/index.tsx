import { FiUpload } from "react-icons/fi";
import { useRef } from "react";

interface UploadBoxProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  multiple?: boolean;
}

const UploadBox = ({ onFileSelect, accept = "image/*", multiple = false }: UploadBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onFileSelect) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-[190px] h-[167px] bg-mainBg border-2 border-dashed border-primary rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      <FiUpload size={34} className="text-textPrimary mb-2" />
      <p className="font-dm font-medium text-[15px] leading-7 text-textPrimary">
        Upload
      </p>
    </div>
  );
};

export default UploadBox;