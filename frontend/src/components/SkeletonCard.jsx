import Skeleton from "@mui/material/Skeleton";

export default function SkeletonCard() {
  return (
    <div className="p-1 h-[525px] min-w-[250px] flex flex-col items-center gap-4">
      <Skeleton variant="rectangle" sx={{width:"100%",height:"50%"}} />
      <Skeleton variant="rounded" sx={{width:"100%"}}/>
      <Skeleton variant="rounded" sx={{width:"100%"}}/>
      <Skeleton variant="rounded" sx={{width:"100%"}}/>
      <Skeleton variant="rounded" sx={{width:"100%"}}/>
    </div>
  );
}
