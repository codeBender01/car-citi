import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import { useGetCarDiagnostics } from "@/api/diagnostics/useGetCarDiagnostics";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import type { DiagnosticsItem } from "@/interfaces/diagnostics.interface";
import DiagnosticsDrawer from "./ui/DiagnosticsDrawer";

const CarDiagnosticsAdmin = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<DiagnosticsItem | null>(
    null,
  );

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: diagnosticsData, isLoading } = useGetCarDiagnostics({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
  });

  const rows = diagnosticsData?.data?.rows || [];
  const totalItems = diagnosticsData?.data?.count || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">
          {t("adminDiagnostics.title")}
        </div>
        <p className="text-textSecondary text-base">
          {t("adminDiagnostics.subtitle")}
        </p>
      </div>

      <div className="w-full border border-headerBorder rounded-2xl p-4">
        {/* Search */}
        <div className="my-6 flex justify-between items-center">
          <div className="text-textPrimary flex items-center flex-1 max-w-md">
            <CiSearch />
            <Input
              className="border-none shadow-none w-full text-textPrimary placeholder:text-textPrimary"
              placeholder="Поиск по имени, VIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
            <p className="font-dm text-textGray text-base">Загрузка...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-mainBg hover:bg-mainBg border-none">
                    <TableHead className="font-dm font-medium text-base text-primary">
                      {t("adminDiagnostics.name")}
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      {t("adminDiagnostics.brandModel")}
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      {t("adminDiagnostics.year")}
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      {t("adminDiagnostics.phone")}
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      VIN
                    </TableHead>
                    <TableHead className="font-dm font-medium text-base text-primary">
                      {t("adminDiagnostics.regionCity")}
                    </TableHead>

                    <TableHead className="font-dm font-medium text-base text-primary sticky right-0 bg-mainBg z-10">
                      {t("adminDiagnostics.action")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((item) => (
                    <TableRow key={item.id} className="hover:bg-mainBg/50">
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {item.name || "-"}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {item.carmark?.name} {item.carmodel?.name}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {item.issueYear
                          ? dayjs(item.issueYear).format("YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {item.phone || "-"}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {item.vin || "-"}
                      </TableCell>
                      <TableCell className="font-dm text-sm text-textSecondary">
                        {item.region?.name}
                        {item.city?.name ? `, ${item.city.name}` : ""}
                      </TableCell>

                      <TableCell className="sticky right-0 bg-white z-10">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-2 hover:bg-mainBg rounded-lg transition-colors text-textGray hover:text-primary"
                          title="Просмотр"
                        >
                          <FiEye size={18} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {rows.length === 0 && !isLoading && (
              <div className="bg-white rounded-2xl px-9 py-16 border border-grayBorder text-center">
                <p className="font-dm text-textGray text-base">
                  {t("adminDiagnostics.noData")}
                </p>
              </div>
            )}

            {rows.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      <DiagnosticsDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default CarDiagnosticsAdmin;
