import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BASE_URL } from "@/api";

interface CarImageGalleryProps {
  images: { hashblur: string; url: string }[];
  open: boolean;
  onClose: () => void;
}

const CarImageGallery = ({ images, open, onClose }: CarImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
          setCurrentIndex(0);
        }
      }}
    >
      <DialogContent
        showCloseButton
        className="!max-w-[90vw] !w-[90vw] !h-[85vh] !p-0 bg-black border-none overflow-hidden [&>button]:text-white [&>button]:z-20"
      >
        <VisuallyHidden>
          <DialogTitle>Фото автомобиля</DialogTitle>
        </VisuallyHidden>

        {images.length > 0 ? (
          <div className="relative w-full h-full">
            <img
              src={`${BASE_URL}/${images[currentIndex]?.url}`}
              alt={`Фото ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center px-4 z-10">
                  <button
                    onClick={handlePrev}
                    className="bg-white/20 text-white p-3 rounded-full cursor-pointer hover:bg-white/40 transition-colors"
                  >
                    <MdOutlineKeyboardArrowLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-white/20 text-white p-3 rounded-full cursor-pointer hover:bg-white/40 transition-colors"
                  >
                    <MdOutlineKeyboardArrowRight size={24} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-4 py-1.5 rounded-full font-dm text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-white/60 font-dm text-lg">
              Нет изображений
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CarImageGallery;
