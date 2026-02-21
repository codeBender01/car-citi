import type { SaveSearchRes } from "@/interfaces/savedSearch.interface";

export const buildPostsFilters = (search: SaveSearchRes | undefined) => {
  if (!search) return {};
  return {
    carMarkId: search.carMarkId || undefined,
    carModelId: search.carModelId || undefined,
    regionId: search.regionId?.length ? search.regionId : undefined,
    cityId: search.cityId || undefined,
    driveTypeId: search.driveTypeId || undefined,
    transmissionId: search.transmissionId || undefined,
    carConditionId: search.carConditionId || undefined,
    subcategoryId: search.subcategoryId || undefined,
    yearFrom: search.yearFrom || undefined,
    yearTo: search.yearTo || undefined,
    priceFrom: search.priceFrom || undefined,
    priceTo: search.priceTo || undefined,
    mileageFrom: search.mileageFrom || undefined,
    mileageTo: search.mileageTo || undefined,
    colorId: search.colorId || undefined,
    characteristicIds: search.characteristicIds?.length
      ? search.characteristicIds
      : undefined,
    characteristicItemIds: search.characteristicItemIds?.length
      ? search.characteristicItemIds
      : undefined,
    vin: search.vin || undefined,
  };
};
