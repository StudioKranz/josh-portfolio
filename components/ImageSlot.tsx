export default function ImageSlot({
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`flex ${ratio} w-full items-center justify-center rounded-lg border border-line bg-surface px-4 text-center text-[12px] text-faint ${className}`}
    >
      {label}
    </div>
  );
}
