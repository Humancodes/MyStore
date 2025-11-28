import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function ProductCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-0">
        <Skeleton className="w-full aspect-square rounded-t-lg" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardFooter>
    </Card>
  );
}

