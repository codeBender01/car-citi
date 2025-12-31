import { type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import type { NewNews } from "@/interfaces/news.interface";
import { useGetAllNewsCategory } from "@/api/news/useGetAllNewsCategory";
import { useGetAllNewsTags } from "@/api/news/useGetAllNewsTags";

import { useUploadSingle } from "@/api/upload/useUploadSingle";

interface AddNewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newsObj: NewNews;
  setNewsObj: Dispatch<SetStateAction<NewNews>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddNewsModal = ({
  open,
  onOpenChange,
  newsObj,
  setNewsObj,
  onSubmit,
}: AddNewsModalProps) => {
  const { data: categories } = useGetAllNewsCategory();
  const { data: tags } = useGetAllNewsTags();

  const uploadSingle = useUploadSingle();

  const handleImageChange = async (file: File | null) => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);

      const res = await uploadSingle.mutateAsync(formData);
      setNewsObj({
        ...newsObj,
        image: { url: res.data.url, hashblur: res.data.hashblur },
      });
    }
  };

  const toggleCategory = (categoryId: string) => {
    setNewsObj((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  const toggleTag = (tagId: string) => {
    setNewsObj((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить новость</DialogTitle>
          <DialogDescription>Создайте новую новость</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {/* Image Upload */}
            <div className="grid gap-2">
              <Label>Изображение</Label>
              <ImageUpload
                value={newsObj.image?.url}
                onChange={handleImageChange}
                className="max-w-sm h-[150px] w-[300px] "
              />
            </div>

            {/* Title Turkmen */}
            <div className="grid gap-2">
              <Label htmlFor="titleTk">Заголовок (Turkmen)</Label>
              <Input
                id="titleTk"
                type="text"
                value={newsObj.titleTk}
                onChange={(e) =>
                  setNewsObj({ ...newsObj, titleTk: e.target.value })
                }
                placeholder="Введите заголовок на туркменском"
                required
              />
            </div>

            {/* Title Russian */}
            <div className="grid gap-2">
              <Label htmlFor="titleRu">Заголовок (Русский)</Label>
              <Input
                id="titleRu"
                type="text"
                value={newsObj.titleRu}
                onChange={(e) =>
                  setNewsObj({ ...newsObj, titleRu: e.target.value })
                }
                placeholder="Введите заголовок на русском"
                required
              />
            </div>

            {/* Description Turkmen */}
            <div className="grid gap-2">
              <Label htmlFor="descTk">Описание (Turkmen)</Label>
              <Textarea
                id="descTk"
                value={newsObj.descriptionTk}
                onChange={(e) =>
                  setNewsObj({ ...newsObj, descriptionTk: e.target.value })
                }
                placeholder="Введите описание на туркменском"
                className="h-32"
                required
              />
            </div>

            {/* Description Russian */}
            <div className="grid gap-2">
              <Label htmlFor="descRu">Описание (Русский)</Label>
              <Textarea
                id="descRu"
                value={newsObj.descriptionRu}
                onChange={(e) =>
                  setNewsObj({ ...newsObj, descriptionRu: e.target.value })
                }
                placeholder="Введите описание на русском"
                className="h-32"
                required
              />
            </div>

            {/* Categories Multi-Select */}
            <div className="grid gap-2">
              <Label>Категории</Label>
              <div className="border rounded-lg p-3 max-h-48 overflow-y-auto">
                {categories?.data?.rows?.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2 py-2"
                  >
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={newsObj.categoryIds.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {category.nameRu} / {category.nameTk}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Multi-Select */}
            <div className="grid gap-2">
              <Label>Тэги</Label>
              <div className="border rounded-lg p-3 max-h-48 overflow-y-auto">
                {tags?.data?.rows?.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center space-x-2 py-2"
                  >
                    <input
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      checked={newsObj.tagIds.includes(tag.id)}
                      onChange={() => toggleTag(tag.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label
                      htmlFor={`tag-${tag.id}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {tag.nameRu} / {tag.nameTk}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="text-white"
              style={{ backgroundColor: "#88ba00" }}
            >
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
