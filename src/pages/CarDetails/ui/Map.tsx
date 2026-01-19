import { BsArrowUpRight } from "react-icons/bs";
import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import type { OnePost } from "@/interfaces/posts.interface";
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

interface MapProps {
  carMap?: OnePost["carMap"];
}

const Map = ({ carMap }: MapProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const latitude = carMap?.latitude ? parseFloat(carMap.latitude) : 37.9601;
  const longitude = carMap?.longitude ? parseFloat(carMap.longitude) : 58.3261;

  return (
    <div className="bg-white border border-grayBorder mx-6 lg:mx-0 mt-[15px] md:mt-[30px] rounded-2xl font-dm">
      <div
        className="text-[22px] md:text-[26px] p-6 lg:p-10 flex items-center justify-between cursor-pointer md:cursor-default"
        onClick={toggleExpanded}
      >
        Местоположение
        <IoChevronDownOutline
          className={`md:hidden transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 md:max-h-none! md:opacity-100! ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 lg:px-10 pb-6 lg:pb-10">
          <p className="text-base">{carMap?.address}</p>
          {carMap?.mapUrl && (
            <a
              href={carMap.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex mt-[30px] items-center gap-2 text-primary w-fit hover:underline"
            >
              Проложить маршрут
              <BsArrowUpRight />
            </a>
          )}
          <div className="mt-[30px] w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border-2 border-grayBorder">
            <MapContainer
              center={[latitude, longitude]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url={import.meta.env.VITE_MAP_TILE_URL}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[latitude, longitude]} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
