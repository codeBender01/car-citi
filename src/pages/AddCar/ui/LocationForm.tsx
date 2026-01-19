import { useState } from "react";
import LabeledInput from "@/components/LabeledInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BsArrowUpRight } from "react-icons/bs";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import type { NewPostReq } from "@/interfaces/posts.interface";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationFormProps {
  formData: NewPostReq;
  setFormData: React.Dispatch<React.SetStateAction<NewPostReq>>;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const LocationForm = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: LocationFormProps) => {
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(
    formData.carMap.latitude && formData.carMap.longitude
      ? {
          lat: parseFloat(formData.carMap.latitude),
          lng: parseFloat(formData.carMap.longitude),
        }
      : null
  );

  // Component to handle map clicks
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition({ lat, lng });
        setFormData({
          ...formData,
          carMap: {
            ...formData.carMap,
            latitude: lat.toString(),
            longitude: lng.toString(),
          },
        });
      },
    });
    return null;
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      carMap: {
        ...formData.carMap,
        address: e.target.value,
      },
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      carMap: {
        ...formData.carMap,
        location: e.target.value,
      },
    });
  };

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lat = e.target.value;
    setFormData({
      ...formData,
      carMap: {
        ...formData.carMap,
        latitude: lat,
      },
    });
    if (lat && formData.carMap.longitude) {
      setMarkerPosition({
        lat: parseFloat(lat),
        lng: parseFloat(formData.carMap.longitude),
      });
    }
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lng = e.target.value;
    setFormData({
      ...formData,
      carMap: {
        ...formData.carMap,
        longitude: lng,
      },
    });
    if (lng && formData.carMap.latitude) {
      setMarkerPosition({
        lat: parseFloat(formData.carMap.latitude),
        lng: parseFloat(lng),
      });
    }
  };

  const handleMapUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      carMap: {
        ...formData.carMap,
        mapUrl: e.target.value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-6">
        <LabeledInput
          label="Адрес"
          placeholder=""
          value={formData.carMap.address}
          onChange={handleAddressChange}
        />
        <LabeledInput
          label="Местоположение"
          placeholder=""
          value={formData.carMap.location}
          onChange={handleLocationChange}
        />
      </div>

      <div className="w-full h-[400px] rounded-xl overflow-hidden border-2 border-grayBorder">
        <MapContainer
          center={
            markerPosition
              ? [markerPosition.lat, markerPosition.lng]
              : [37.9601, 58.3261]
          }
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url={import.meta.env.VITE_MAP_TILE_URL}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          {markerPosition && (
            <Marker position={[markerPosition.lat, markerPosition.lng]} />
          )}
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <LabeledInput
          label="Долгота"
          placeholder=""
          value={formData.carMap.longitude}
          onChange={handleLongitudeChange}
        />
        <LabeledInput
          label="Широта"
          placeholder=""
          value={formData.carMap.latitude}
          onChange={handleLatitudeChange}
        />
        <div className="relative col-span-2">
          <Textarea
            id="message"
            placeholder=" "
            value={formData.carMap.mapUrl}
            onChange={handleMapUrlChange}
            className="w-full h-[200px] px-5 py-4 rounded-xl border border-grayBorder bg-white font-dm text-[15px] text-textPrimary resize-none peer"
          />
          <label
            htmlFor="message"
            className="absolute left-5 top-4 font-dm text-[13px] text-[#818181] transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-0 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
          >
            Описание
          </label>
        </div>
      </div>

      <div className="col-span-4">
        <Button
          size="none"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center mt-[30px] gap-2.5 py-4 px-[25px] ml-auto w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Отправка..." : "Далее"}
          <BsArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default LocationForm;
