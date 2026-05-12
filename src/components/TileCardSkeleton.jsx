export default function TileCardSkeleton() {
  return (
    <div className="bg-[#111118] rounded-2xl overflow-hidden border border-white/5">
      <div className="h-52 skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-20 rounded-lg skeleton" />
        <div className="h-5 w-3/4 rounded skeleton" />
        <div className="h-4 w-1/2 rounded skeleton" />
        <div className="h-9 w-full rounded-xl skeleton mt-2" />
      </div>
    </div>
  );
}
