import * as leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<leaflet.Map | null>(null);

  useEffect(() => {
    if (mapRef?.current && !map) {
      var _map = leaflet.map(mapRef.current, {zoomControl: false}).setView([51.505, -0.09], 13);
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
      _map.off();
      _map.remove();
    };
  }, [mapRef]);

  return (
    <div className="grid max-h-dvh grid-cols-1 grid-rows-3">
      <div className="col-[1/1] row-[1/2]">
        <img
          src="/images/pattern-bg-mobile.png"
          alt="background"
          className="w-full object-cover"
        />
      </div>
      <section className="col-[1/1] row-[1/3]">
        <div className="px-6">
          <header className="my-6 text-center">
            <h1 className="text-3xl font-medium text-white">
              IP Address Tracker
            </h1>
          </header>
          <section>
            <div className="flex h-12">
              <input
                type="text"
                className="w-full rounded-l-xl px-5 py-3 outline-none"
              />
              <button className="bg-veryDarkGray hover:bg-veryDarkGray/70 grid aspect-square h-full place-items-center rounded-r-xl transition-colors">
                <img src="/images/icon-arrow.svg" />
              </button>
            </div>
          </section>
          <section className="relative z-10">
            <div className="mt-5 flex flex-col gap-4 rounded-xl bg-white p-5">
              <div className="space-y-1 text-center">
                <p className="text-darkGray text-sm font-bold tracking-widest">
                  IP ADDRESS
                </p>
                <p className="text-xl font-medium">192.212.174.101</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-darkGray text-sm font-bold tracking-widest">
                  LOCATION
                </p>
                <p className="text-xl font-medium">Brooklyn, NY 10001</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-darkGray text-sm font-bold tracking-widest">
                  TIMEZONE
                </p>
                <p className="text-xl font-medium">UTC -05:00</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-darkGray text-sm font-bold tracking-widest">
                  ISP
                </p>
                <p className="text-xl font-medium">SpaceX Starlink</p>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section className="z-0 col-[1/1] row-[2/4]">
        <div id="map" className="h-full" ref={mapRef}></div>
      </section>
    </div>
  );
};

export default App;
