import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/**
 * A banner hero image — a single static image, or an auto-advancing slider
 * when there is more than one (admin-managed, priority-ordered). Shared by
 * the portfolio project detail page and the product "Learn more" dialog.
 */
export function BannerSlider({
  images,
  alt,
  className,
  imageClassName,
}: {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api || images.length <= 1) return;
    const id = setInterval(() => api.scrollNext(), 5500);
    return () => clearInterval(id);
  }, [api, images.length]);

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className={cn("aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md", className)}>
        <img src={images[0]} alt={alt} className={cn("h-full w-full object-cover object-center", imageClassName)} />
      </div>
    );
  }

  return (
    <div>
      <Carousel setApi={setApi} opts={{ loop: true }} className="group">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={src + i}>
              <div className={cn("aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md", className)}>
                <img
                  src={src}
                  alt={`${alt} — slide ${i + 1} of ${images.length}`}
                  className={cn("h-full w-full object-cover object-center", imageClassName)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 opacity-0 transition-opacity group-hover:opacity-100" />
        <CarouselNext className="right-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </Carousel>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === current ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
