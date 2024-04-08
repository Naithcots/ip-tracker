import { useQuery } from "@tanstack/react-query";
import * as leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { IpAddressInfo } from "./types";

const API_KEY = import.meta.env.VITE_API_KEY;

const getCityByIp = async (ip: string): Promise<IpAddressInfo> => {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`,
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const App = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const [ipInput, setIpInput] = useState("");

  const { refetch, data, isFetching, error } = useQuery({
    queryKey: ["ip", { value: ipInput }],
    queryFn: () => getCityByIp(ipInput),
    retry: false,
    enabled: false,
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (data) {
      if (map) {
        const icon = leaflet.icon({
          iconUrl: "/images/icon-location.svg",
          iconSize: [46, 56],
        });

        var locationRadius = leaflet
          .marker([data.location.lat, data.location.lng], { icon })
          .addTo(map);

        map?.setView([data.location.lat, data.location.lng]);
      }
    }

    return () => {
      if (locationRadius) {
        locationRadius.remove();
      }
    };
  }, [data]);

  useEffect(() => {
    if (mapRef?.current && !map) {
      var _map = leaflet
        .map(mapRef.current, { zoomControl: false })
        .setView([51.505, -0.09], 13);
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(_map);
      setMap(_map);
    }

    return () => {
      if (_map) {
        _map.off();
        _map.remove();
      }
    };
  }, [mapRef]);

  return (
    <div className="grid h-dvh grid-rows-[auto_10%_auto_1fr] sm:grid-rows-[auto_auto_auto_1fr]">
      <div className="col-[1/1] row-[1/3] bg-[url('/images/pattern-bg-mobile.png')] bg-cover bg-no-repeat md:bg-[url('/images/pattern-bg-desktop.png')]" />
      <section className="col-[1/1] row-[1/1] mx-auto mb-4 w-full max-w-7xl px-6 sm:mb-8 md:mb-10">
        <header className="py-4 text-center sm:py-6">
          <h1 className="text-2xl font-medium text-white sm:text-3xl">
            IP Address Tracker
          </h1>
        </header>
        <form onSubmit={onSubmit}>
          <section className="flex justify-center">
            <div className="flex h-12 max-w-2xl grow">
              <input
                type="text"
                placeholder="Search for any IP address or domain"
                className="w-full rounded-l-xl px-5 py-3 outline-none"
                value={ipInput}
                onChange={(event) => setIpInput(event.target.value)}
              />
              <button
                type="submit"
                disabled={isFetching}
                className="bg-veryDarkGray hover:bg-veryDarkGray/70 disabled:bg-veryDarkGray/50 grid aspect-square h-full place-items-center rounded-r-xl transition-colors"
              >
                <img src="/images/icon-arrow.svg" />
              </button>
            </div>
          </section>
        </form>
        {error && (
          <div className="mx-auto mt-4 w-fit rounded-lg bg-red-600 px-6 py-2 text-white">
            <p className="text-center">
              An error occurred. Please try again later.
            </p>
          </div>
        )}
      </section>
      <section className="col-[1/1] row-[2/4]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative z-10 flex flex-col gap-2 rounded-xl bg-white p-5 shadow-sm sm:gap-4 sm:p-7 md:flex-row md:justify-around md:py-9">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-darkGray text-xs font-bold tracking-widest sm:text-sm">
                IP ADDRESS
              </p>
              <p className="text-lg font-medium sm:text-2xl">
                {data ? data.ip : "-"}
              </p>
            </div>
            <div className="bg-darkGray/40 w-[1px]" />
            <div className="space-y-1 text-center md:text-left">
              <p className="text-darkGray text-xs font-bold tracking-widest sm:text-sm">
                LOCATION
              </p>
              <p className="text-lg font-medium sm:text-2xl">
                {data ? data.location.city : "-"}
              </p>
            </div>
            <div className="bg-darkGray/40 w-[1px]" />
            <div className="space-y-1 text-center md:text-left">
              <p className="text-darkGray text-xs font-bold tracking-widest sm:text-sm">
                TIMEZONE
              </p>
              <p className="text-lg font-medium sm:text-2xl">
                {data ? `UTC ${data.location.timezone}` : "-"}
              </p>
            </div>
            <div className="bg-darkGray/40 w-[1px]" />
            <div className="space-y-1 text-center md:text-left">
              <p className="text-darkGray text-xs font-bold tracking-widest sm:text-sm">
                ISP
              </p>
              <p className="text-lg font-medium sm:text-2xl">
                {data ? data.isp : "-"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="z-0 col-[1/1] row-[3/-1]">
        <div id="map" className="h-full" ref={mapRef}></div>
      </section>
    </div>
  );
};

export default App;
