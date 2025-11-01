import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiTrash2 } from "react-icons/fi";
import Pagination from "@/components/Pagination";
import { mockSearches } from "./lib/mockSearches";
import type { SavedSearch as SavedSearchType } from "./lib/mockSearches";

import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SavedSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searches, setSearches] = useState<SavedSearchType[]>(mockSearches);

  // Pagination constants
  const ITEMS_PER_PAGE = 5;
  const totalItems = searches.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Calculate paginated searches
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSearches = searches.slice(startIndex, endIndex);

  const handleDelete = (id: number) => {
    setSearches(searches.filter((search) => search.id !== id));
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary mb-10">
        <div className="text-[32px] font-bold">Сохранённый поиск</div>
        <p className="text-textSecondary text-base">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>

      <div className="rounded-2xl border border-headerBorder p-4">
        <div className="my-2 flex justify-between items-center">
          <div className="text-textPrimary flex items-center">
            <CiSearch />
            <Input
              className="border-none shadow-none w-fit text-textPrimary placeholder:text-textPrimary"
              placeholder="Поиск"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-textGray text-[15px] font-dm">
              Сортировать по
            </span>
            <Select>
              <SelectTrigger className="border-none shadow-none p-0 h-auto gap-2 w-auto focus:ring-0">
                <SelectValue className="text-textPrimary text-[15px] font-dm" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Audi A3">Новые</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-mainBg rounded-t-2xl border-none hover:bg-mainBg">
              <TableHead className="font-dm font-medium text-base text-primary leading-7 py-[21px] px-9">
                Заголовок
              </TableHead>
              <TableHead className="font-dm font-medium text-base text-primary leading-7 py-[21px]">
                Сохраненный поиск
              </TableHead>
              <TableHead className="font-dm font-medium text-base text-primary leading-7 py-[21px]">
                Количество объявлений
              </TableHead>
              <TableHead className="font-dm font-medium text-base text-primary leading-7 py-[21px]">
                Дата
              </TableHead>
              <TableHead className="font-dm font-medium text-base text-primary leading-7 py-[21px] px-9">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSearches.map((search) => (
              <TableRow key={search.id} className="border-b border-grayBorder">
                {/* Car Name */}
                <TableCell className="font-dm text-[15px] text-textPrimary leading-[26px] py-3.5 px-9">
                  {search.carName}
                </TableCell>

                {/* Search Info */}
                <TableCell className="font-dm text-textPrimary py-3.5">
                  <div className="flex items-center gap-[7px]">
                    <span className="text-sm leading-6">
                      Год :{search.year}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-textPrimary" />
                    <span className="text-[15px] leading-[26px]">
                      Пробег: {search.mileage}
                    </span>
                  </div>
                </TableCell>

                {/* Results Count */}
                <TableCell className="font-dm text-[15px] text-textPrimary leading-[26px] py-3.5">
                  {search.resultsCount}
                </TableCell>

                {/* Date */}
                <TableCell className="font-dm text-[15px] text-textPrimary leading-[26px] py-3.5">
                  {search.date}
                </TableCell>

                {/* Action */}
                <TableCell className="py-3.5 px-9">
                  <button
                    onClick={() => handleDelete(search.id)}
                    className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#f9fbfc] border border-grayBorder hover:bg-mainBg transition-colors text-textGray hover:text-danger"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {searches.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-dm text-textGray text-base">
              У вас пока нет сохранённых поисков
            </p>
          </div>
        )}

        {/* Pagination */}
        {searches.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default SavedSearch;
