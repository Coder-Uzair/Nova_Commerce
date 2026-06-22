import { cn } from "../../utils/format";

export default function Skeleton({ className }) {
  return <div className={cn("skeleton rounded-xl", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl border border-app p-3">
      <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}
