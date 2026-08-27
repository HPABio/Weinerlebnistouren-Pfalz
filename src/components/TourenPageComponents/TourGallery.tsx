import { LazyImage } from "@/components/lazy-image";
import { cn } from "@/lib/utils";

export type TourGalleryImage = {
	src: string;
	/** width / height of the original photo */
	ratio: number;
	alt: string;
};

type TourGalleryProps = {
	images: TourGalleryImage[];
	className?: string;
};

/**
 * Masonry-Galerie für die Touren-Übersichtsseite.
 *
 * Abgeleitet von components/image-gallery.tsx, aber mit echten Tour-Fotos
 * statt Platzhaltern: die Bild-URLs (bereits von Astro optimiert) und ihre
 * Seitenverhältnisse kommen als Props aus dem Astro-Frontmatter. CSS-Columns
 * statt fester Spalten-Arrays, damit die Spaltenzahl responsiv bleibt, ohne
 * die Bilder umzuverteilen. Geladen wird jedes Foto erst, wenn es in den
 * Viewport kommt (LazyImage inView).
 */
export default function TourGallery({ images, className }: TourGalleryProps) {
	return (
		<div
			className={cn(
				"columns-2 gap-3 md:gap-4 lg:columns-3 [column-fill:balance]",
				className
			)}
		>
			{images.map((image) => (
				<div className="mb-3 break-inside-avoid md:mb-4" key={image.src}>
					<LazyImage
						alt={image.alt}
						containerClassName="rounded-2xl border-soft-beige/60 bg-soft-sand/70 shadow-sm"
						inView={true}
						ratio={image.ratio}
						src={image.src}
					/>
				</div>
			))}
		</div>
	);
}
