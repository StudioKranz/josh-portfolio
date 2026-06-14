export default function ParkingLoop() {
  return (
    <div className="mt-8 rounded-xl border border-line bg-surface p-5 sm:p-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            Report · hazard card
          </p>
          <div className="mt-3 rounded-xl border border-line bg-surface p-4">
            <p className="text-[13.5px] font-medium text-ink">Lot full?</p>
            <p className="mt-1 text-[12.5px] leading-snug text-muted">
              Flag it in one tap while driving — the same place you’d report
              traffic.
            </p>
            <span className="mt-3 inline-flex rounded-full bg-ink px-3 py-1.5 text-[12.5px] font-medium text-white">
              Report lot full
            </span>
          </div>
          <p className="mt-3 text-[11.5px] text-faint">
            Shares only “lot full” — no tracking.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
            Use · arrival card
          </p>
          <div className="mt-3 flex items-end justify-between text-center">
            <div className="flex-1">
              <p className="text-[16px] font-semibold leading-none text-ink">11:45</p>
              <p className="mt-1 text-[10px] text-faint">arrival</p>
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold leading-none text-ink">6 min</p>
              <p className="mt-1 text-[10px] text-faint">drive</p>
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold leading-none text-ink">1.7 mi</p>
              <p className="mt-1 text-[10px] text-faint">distance</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-line bg-surface p-3">
            <p className="text-[12.5px] font-medium text-ink">Parking looks tight ahead</p>
            <p className="mt-1 text-[12px] leading-snug text-muted">
              Add 6 min to park and walk, or reroute to an open lot.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[11.5px] text-faint">
        One driver’s report becomes the next driver’s reroute — the hazard card
        feeds the arrival card.
      </p>
    </div>
  );
}
