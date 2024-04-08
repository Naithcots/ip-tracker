const App = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-3 max-h-dvh">
      <div className="col-[1/1] row-[1/2]">
        <img
          src="/images/pattern-bg-mobile.png"
          alt="background"
          className="w-full object-cover"
        />
      </div>
      <section className="z-10 col-[1/1] row-[1/3]">
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
          <section>
            <div className="mt-5 flex flex-col gap-4 rounded-xl bg-white p-5">
              <div className="space-y-1 text-center">
                <p className="text-darkGray text-sm font-bold tracking-widest">IP ADDRESS</p>
                <p className="text-xl font-medium">192.212.174.101</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-darkGray text-sm font-bold tracking-widest">LOCATION</p>
                <p className="text-xl font-medium">Brooklyn, NY 10001</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-darkGray text-sm font-bold tracking-widest">TIMEZONE</p>
                <p className="text-xl font-medium">UTC -05:00</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-darkGray text-sm font-bold tracking-widest">ISP</p>
                <p className="text-xl font-medium">SpaceX Starlink</p>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section className="col-[1/1] row-[2/4] bg-gray-500">
        <span>Map</span>
      </section>
    </div>
  );
};

export default App;
