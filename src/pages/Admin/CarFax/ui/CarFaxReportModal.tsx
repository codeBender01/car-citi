import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";
import { useUploadSingle } from "@/api/upload/useUploadSingle";
import { useCreateCarFaxReport } from "@/api/carfax/useCreateCarFaxReport";
import { useGetCarFaxReport } from "@/api/carfax/useGetCarFaxReport";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/api";
import { IoClose } from "react-icons/io5";
import dayjs from "dayjs";
import type { OnePost } from "@/interfaces/posts.interface";
import type { CarFaxItem } from "@/interfaces/carfax.interface";

interface CarFaxReportModalProps {
  post: OnePost | null;
  carFaxItem?: CarFaxItem | null;
  posts?: OnePost[];
  open: boolean;
  mode: "create" | "view";
  onClose: () => void;
}

export default function CarFaxReportModal({
  post: postProp,
  carFaxItem,
  posts = [],
  open,
  mode,
  onClose,
}: CarFaxReportModalProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const uploadSingle = useUploadSingle();
  const createReport = useCreateCarFaxReport();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const reportInputRef = useRef<HTMLInputElement>(null);

  const [selectedPostId, setSelectedPostId] = useState("");
  const [isPaid, setIsPaid] = useState(true);
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [reports, setReports] = useState<string[]>([]);
  const [isPaidConfirmed, setIsPaidConfirmed] = useState(false);
  const [editablePhone, setEditablePhone] = useState("");
  const [editableVin, setEditableVin] = useState("");
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isUploadingReports, setIsUploadingReports] = useState(false);

  const isViewMode = mode === "view";

  // In create mode, resolve post from dropdown selection; in view mode, use prop
  const post = isViewMode
    ? postProp
    : posts.find((p) => p.id === selectedPostId) || null;

  const shouldFetchReport = isViewMode && post && !carFaxItem;
  const { data: existingReport, isLoading: isLoadingReport } =
    useGetCarFaxReport(shouldFetchReport ? post.id : "");

  const reportData = carFaxItem || existingReport?.data;

  const resetForm = () => {
    setSelectedPostId("");
    setIsPaid(true);
    setPrice("");
    setImages([]);
    setReports([]);
    setIsPaidConfirmed(false);
    setEditablePhone("");
    setEditableVin("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    e.target.value = "";
    setIsUploadingImages(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await uploadSingle.mutateAsync(formData);
        if (res.data) {
          setImages((prev) => [...prev, res.data.url]);
        }
      } catch {
        toast({
          title: "Ошибка загрузки",
          variant: "destructive",
          duration: 1000,
        });
      }
    }
    setIsUploadingImages(false);
  };

  const handleReportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    e.target.value = "";
    setIsUploadingReports(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await uploadSingle.mutateAsync(formData);
        if (res.data) {
          setReports((prev) => [...prev, res.data.url]);
        }
      } catch {
        toast({
          title: "Ошибка загрузки",
          variant: "destructive",
          duration: 1000,
        });
      }
    }
    setIsUploadingReports(false);
  };

  const handleSubmit = async () => {
    if (!post && !selectedPostId) return;

    try {
      await createReport.mutateAsync({
        isPaid,
        vin: post?.vin || editableVin,
        images,
        reports,
        price: isPaid ? Number(price) || 0 : 0,
        postId: post?.id || selectedPostId,
      });
      toast({
        title: t("carfax.success"),
        variant: "success",
      });
      handleClose();
    } catch {
      toast({
        title: t("carfax.error"),
        variant: "destructive",
      });
    }
  };

  const getPostLabel = (p: OnePost) => {
    const mark = p.carMark?.name || "";
    const model = p.carModel?.name || "";
    const year = p.issueYear ? dayjs(p.issueYear).format("YYYY") : "";
    return `${mark} ${model} ${year}`.trim() || p.id;
  };

  const carName = post ? getPostLabel(post) : carFaxItem?.carId || "-";

  // In view mode, use data from the API response or carFaxItem
  const viewImages = isViewMode ? reportData?.images || [] : images;
  const viewReports = isViewMode ? reportData?.reports || [] : reports;
  const viewVin = isViewMode ? reportData?.vin || post?.vin || "-" : null;
  const viewPrice = isViewMode ? reportData?.price : null;
  const viewIsPaid = isViewMode ? (reportData?.price ?? 0) > 0 : isPaid;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-dm text-lg font-bold">
            {t("carfax.modalTitle")}
          </DialogTitle>
        </DialogHeader>

        {/* Car Select in create mode */}
        {!isViewMode && (
          <div className="border-t border-headerBorder pt-4">
            <p className="text-xs font-dm text-primary uppercase tracking-wider mb-3">
              Выберите автомобиль
            </p>
            <Select value={selectedPostId} onValueChange={setSelectedPostId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите объявление" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {posts.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {getPostLabel(p)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {isViewMode && !carFaxItem && isLoadingReport ? (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        ) : post || carFaxItem ? (
          <>
            {/* Info Section */}
            <div className="border-t border-headerBorder pt-4">
              <p className="text-xs font-dm text-primary uppercase tracking-wider mb-3">
                {t("carfax.info")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-textGray font-dm">
                    {t("carfax.car")}
                  </p>
                  <p className="font-dm font-semibold text-textPrimary text-sm">
                    {carName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-textGray font-dm">
                    {t("carfax.phone")}
                  </p>
                  {isViewMode || post?.phone ? (
                    <p className="font-dm font-semibold text-textPrimary text-sm">
                      {post?.phone || "-"}
                    </p>
                  ) : (
                    <input
                      type="tel"
                      value={editablePhone}
                      onChange={(e) => setEditablePhone(e.target.value)}
                      placeholder="+993 6..."
                      className="w-full mt-1 border border-headerBorder rounded-lg px-3 py-1.5 font-dm text-sm text-textPrimary outline-none focus:border-primary"
                    />
                  )}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-textGray font-dm">VIN</p>
                {isViewMode ? (
                  <p className="font-dm font-semibold text-textPrimary text-sm">
                    {viewVin}
                  </p>
                ) : post?.vin ? (
                  <p className="font-dm font-semibold text-textPrimary text-sm">
                    {post.vin}
                  </p>
                ) : (
                  <input
                    type="text"
                    value={editableVin}
                    onChange={(e) => setEditableVin(e.target.value)}
                    placeholder="VIN..."
                    className="w-full mt-1 border border-headerBorder rounded-lg px-3 py-1.5 font-dm text-sm text-textPrimary outline-none focus:border-primary"
                  />
                )}
              </div>
            </div>

            {/* Payment Section */}
            <div className="border-t border-headerBorder pt-4">
              <p className="text-xs font-dm text-primary uppercase tracking-wider mb-3">
                {t("carfax.payment")}
              </p>

              {isViewMode ? (
                <>
                  <div className="grid grid-cols-2 gap-0 border border-headerBorder rounded-xl overflow-hidden">
                    <div
                      className={`py-3 text-center font-dm text-sm font-medium ${
                        !viewIsPaid
                          ? "bg-white text-textPrimary border-r border-headerBorder"
                          : "bg-mainBg text-textGray border-r border-headerBorder"
                      }`}
                    >
                      {t("carfax.free")}
                    </div>
                    <div
                      className={`py-3 text-center font-dm text-sm font-medium ${
                        viewIsPaid
                          ? "bg-white text-textPrimary"
                          : "bg-mainBg text-textGray"
                      }`}
                    >
                      {t("carfax.paid")}
                    </div>
                  </div>
                  {viewIsPaid && (
                    <div className="mt-3 relative">
                      <div className="w-full border border-headerBorder rounded-xl px-4 py-3 font-dm text-sm text-textPrimary">
                        {viewPrice}
                      </div>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-textGray font-dm text-sm">
                        TMT
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-0 border border-headerBorder rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setIsPaid(false)}
                      className={`py-3 font-dm text-sm font-medium transition-colors ${
                        !isPaid
                          ? "bg-white text-textPrimary border-r border-headerBorder"
                          : "bg-mainBg text-textGray border-r border-headerBorder"
                      }`}
                    >
                      {t("carfax.free")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPaid(true)}
                      className={`py-3 font-dm text-sm font-medium transition-colors ${
                        isPaid
                          ? "bg-white text-textPrimary"
                          : "bg-mainBg text-textGray"
                      }`}
                    >
                      {t("carfax.paid")}
                    </button>
                  </div>

                  {isPaid && (
                    <div className="mt-3 relative">
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0"
                        className="w-full border border-headerBorder rounded-xl px-4 py-3 font-dm text-sm text-textPrimary outline-none focus:border-primary"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-textGray font-dm text-sm">
                        TMT
                      </span>
                    </div>
                  )}

                  {isPaid && (
                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPaidConfirmed}
                        onChange={(e) => setIsPaidConfirmed(e.target.checked)}
                        className="w-4 h-4 rounded border-headerBorder text-primary accent-primary cursor-pointer"
                      />
                      <span className="font-dm text-sm text-textPrimary">
                        {t("carfax.paidConfirmed")}
                      </span>
                    </label>
                  )}
                </>
              )}
            </div>

            {/* Report Section */}
            <div className="border-t border-headerBorder pt-4">
              <p className="text-xs font-dm text-primary uppercase tracking-wider mb-3">
                {t("carfax.report")}
              </p>

              {/* Images */}
              <div className="mb-4">
                {!isViewMode && (
                  <>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => imageInputRef.current?.click()}
                      disabled={isUploadingImages}
                      className="w-full border-dashed"
                    >
                      {isUploadingImages ? (
                        <>
                          <Spinner />
                          Загрузка...
                        </>
                      ) : (
                        t("carfax.uploadImages")
                      )}
                    </Button>
                  </>
                )}
                {viewImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {viewImages.map((url, idx) => (
                      <div key={idx} className="relative w-16 h-16">
                        <img
                          src={`${BASE_URL}/${url}`}
                          alt=""
                          className="w-full h-full object-cover rounded-lg border border-headerBorder"
                        />
                        {!isViewMode && (
                          <button
                            type="button"
                            onClick={() =>
                              setImages((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                            className="absolute -top-1 -right-1 bg-white rounded-full shadow"
                          >
                            <IoClose size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {isViewMode && viewImages.length === 0 && (
                  <p className="text-sm text-textGray font-dm">-</p>
                )}
              </div>

              {/* Reports */}
              <div>
                {!isViewMode && (
                  <>
                    <input
                      ref={reportInputRef}
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleReportUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => reportInputRef.current?.click()}
                      disabled={isUploadingReports}
                      className="w-full border-dashed"
                    >
                      {isUploadingReports ? (
                        <>
                          <Spinner />
                          Загрузка...
                        </>
                      ) : (
                        t("carfax.uploadReports")
                      )}
                    </Button>
                  </>
                )}
                {viewReports.length > 0 && (
                  <div className="flex flex-col gap-1 mt-2">
                    {viewReports.map((url, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-3 py-2 bg-mainBg rounded-lg text-sm font-dm"
                      >
                        <span className="truncate max-w-[400px]">{url}</span>
                        {!isViewMode && (
                          <button
                            type="button"
                            onClick={() =>
                              setReports((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                          >
                            <IoClose size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {isViewMode && viewReports.length === 0 && (
                  <p className="text-sm text-textGray font-dm">-</p>
                )}
              </div>
            </div>

            <DialogFooter className="border-t border-headerBorder pt-4">
              <Button variant="outline" onClick={handleClose}>
                {t("carfax.cancel")}
              </Button>
              {!isViewMode && (
                <Button
                  onClick={handleSubmit}
                  className="text-white"
                  disabled={createReport.isPending}
                >
                  {createReport.isPending && <Spinner />}
                  {t("carfax.submit")}
                </Button>
              )}
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
