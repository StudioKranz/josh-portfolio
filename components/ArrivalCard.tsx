export default function ArrivalCard() {
  return (
    <div className="mt-8 rounded-xl border border-line bg-surface p-5 sm:p-7">
      <div className="mx-auto max-w-sm rounded-2xl border border-line bg-white p-5">
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-line" aria-hidden="true" />

        <div className="flex items-end justify-between text-center">
          <div className="flex-1">
            <p className="text-[20px] font-semibold leading-none text-ink">11:45</p>
            <p className="mt-1 text-[11px] text-faint">arrival</p>
          </div>
          <div className="flex-1">
            <p className="text-[20px] font-semibold leading-none text-ink">6 min</p>
            <p className="mt-1 text-[11px] text-faint">drive</p>
          </div>
          <div className="flex-1">
            <p className="text-[20px] font-semibold leading-none text-ink">1.7 mi</p>
            <p className="mt-1 text-[11px] text-faint">distance</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-line bg-surface p-4">
          <p className="text-[13.5px] font-medium text-ink">
            Parking looks tight near your destination
          </p>
          <p className="mt-1 text-[12.5px] leading-snug text-muted">
            Add a few minutes to park and walk in — or reroute to an open lot
            nearby.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-ink px-3 py-1.5 text-[12.5px] font-medium text-white">
              Add 6 min &amp; reroute
            </span>
            <span className="rounded-full border border-line px-3 py-1.5 text-[12.5px] text-muted">
              Share ETA
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[11.5px] text-faint">
        Concept mock — the parking affordance lives in the arrival card, where
        the friction is felt, not in a hazard report.
      </p>
    </div>
  );
}
