import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "@/api";
import dayjs from "dayjs";
import type { DiagnosticsItem } from "@/interfaces/diagnostics.interface";

interface DiagnosticsDrawerProps {
  item: DiagnosticsItem | null;
  onClose: () => void;
}

const DiagnosticsDrawer = ({ item, onClose }: DiagnosticsDrawerProps) => {
  const { t } = useTranslation();

  return (
    <Sheet
      open={!!item}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="!w-[50%] !max-w-none bg-white p-0 overflow-y-auto [&>button]:text-textSecondary"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>
            {item?.carmark?.name} {item?.carmodel?.name}
          </SheetTitle>
        </SheetHeader>

        {item && (
          <div className="flex flex-col">
            {/* Brand logo header */}
            {item.carmark?.logo?.url && (
              <div className="flex items-center gap-4 p-6 border-b border-headerBorder">
                <img
                  src={`${BASE_URL}/${item.carmark.logo.url}`}
                  alt={item.carmark.name}
                  className="w-16 h-16 object-contain rounded-lg border border-headerBorder"
                />
                <div>
                  <h2 className="font-dm text-2xl font-bold text-textSecondary">
                    {item.carmark?.name} {item.carmodel?.name}
                  </h2>
                  <p className="font-dm text-sm text-textGray">
                    {item.issueYear
                      ? dayjs(item.issueYear).format("YYYY")
                      : "-"}
                  </p>
                </div>
              </div>
            )}

            <div className="p-6 flex flex-col gap-4">
              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">
                    {t("adminDiagnostics.name")}
                  </span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {item.name || "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">
                    {t("adminDiagnostics.phone")}
                  </span>
                  <a
                    href={`tel:${item.phone}`}
                    className="text-sm font-medium text-primary font-dm hover:underline"
                  >
                    {item.phone || "-"}
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">
                    {t("adminDiagnostics.brandModel")}
                  </span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {item.carmark?.name} {item.carmodel?.name}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">
                    {t("adminDiagnostics.year")}
                  </span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {item.issueYear
                      ? dayjs(item.issueYear).format("YYYY")
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">VIN</span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {item.vin || "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">
                    {t("adminDiagnostics.regionCity")}
                  </span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {item.region?.name}
                    {item.city?.name ? `, ${item.city.name}` : ""}
                  </span>
                </div>
              </div>

              {/* Comment */}
              {item.comment && (
                <div className="flex flex-col gap-1 mt-2 pt-4 border-t border-headerBorder">
                  <span className="text-sm text-textGray font-dm">
                    {t("adminDiagnostics.comment")}
                  </span>
                  <p className="text-sm font-medium text-textSecondary font-dm whitespace-pre-wrap">
                    {item.comment}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default DiagnosticsDrawer;
