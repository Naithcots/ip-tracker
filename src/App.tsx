import * as leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<leaflet.Map | null>(null);

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
    <div className="grid h-dvh grid-rows-[auto_auto_auto_1fr]">
      <div className="col-[1/1] row-[1/3] bg-[url('/images/pattern-bg-mobile.png')] bg-cover bg-no-repeat md:bg-[url('/images/pattern-bg-desktop.png')]" />
      <section className="col-[1/1] row-[1/1] mx-auto mb-8 w-full max-w-7xl px-6 md:mb-10">
        <header className="py-6 text-center">
          <h1 className="text-3xl font-medium text-white">
            IP Address Tracker
          </h1>
        </header>
        <section className="flex justify-center">
          <div className="flex h-12 max-w-2xl grow">
            <input
              type="text"
              placeholder="Search for any IP address or domain"
              className="w-full rounded-l-xl px-5 py-3 outline-none"
            />
            <button className="bg-veryDarkGray hover:bg-veryDarkGray/70 grid aspect-square h-full place-items-center rounded-r-xl transition-colors">
              <img src="/images/icon-arrow.svg" />
            </button>
          </div>
        </section>
      </section>
      <section className="col-[1/1] row-[2/4]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative z-10 flex flex-col gap-4 rounded-xl bg-white p-7 shadow-sm md:flex-row md:justify-around md:py-9">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-darkGray text-sm font-bold tracking-widest">
                IP ADDRESS
              </p>
              <p className="text-xl font-medium sm:text-2xl">192.212.174.101</p>
            </div>
            <div className="bg-darkGray/40 w-[1px]" />
            <div className="space-y-1 text-center md:text-left">
              <p className="text-darkGray text-sm font-bold tracking-widest">
                LOCATION
              </p>
              <p className="text-xl font-medium sm:text-2xl">
                Brooklyn, NY 10001
              </p>
            </div>
            <div className="bg-darkGray/40 w-[1px]" />
            <div className="space-y-1 text-center md:text-left">
              <p className="text-darkGray text-sm font-bold tracking-widest">
                TIMEZONE
              </p>
              <p className="text-xl font-medium sm:text-2xl">UTC -05:00</p>
            </div>
            <div className="bg-darkGray/40 w-[1px]" />
            <div className="space-y-1 text-center md:text-left">
              <p className="text-darkGray text-sm font-bold tracking-widest">
                ISP
              </p>
              <p className="text-xl font-medium sm:text-2xl">SpaceX Starlink</p>
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
