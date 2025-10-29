import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  numberOfImages?: number;
  className?: string;
}

const ImageGalleryTours = ({ numberOfImages = 12, className = "" }: Props) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    // Import all images from the onSitePhotos folder
    const importImages = async () => {
      // Get all image files from the Brigitta folder
      const imageModules = import.meta.glob(
        "../assets/images/compressed/onSitePhotos/**/*.{png,jpg,jpeg,webp}"
      );

      const imagePaths = Object.keys(imageModules);

      // Shuffle array function
      const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      // Randomly select images
      const shuffledPaths = shuffleArray(imagePaths);
      const selectedPaths = shuffledPaths.slice(0, numberOfImages);

      // Load the images
      const loadedImages = await Promise.all(
        selectedPaths.map(async (path) => {
          const module = await imageModules[path]();
          return (module as any).default.src || (module as any).default;
        })
      );

      setSelectedImages(loadedImages);
    };

    importImages();
  }, [numberOfImages]);

  return (
    <div className={`image-gallery-tours ${className}`}>
      <div className="masonry-grid">
        {selectedImages.map((imageSrc, index) => (
          <motion.div
            key={index}
            className="masonry-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <img
              src={imageSrc}
              alt={`Tour photo ${index + 1}`}
              className="gallery-image"
              loading={index < 4 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .image-gallery-tours {
          width: 100%;
          padding: 2rem 1rem;
        }

        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 1rem;
          margin: 0 auto;
          max-width: 1400px;
        }

        @media (min-width: 640px) {
          .masonry-grid {
            gap: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .masonry-grid {
            gap: 1.5rem;
          }
        }

        @media (min-width: 1280px) {
          .masonry-grid {
            gap: 1.75rem;
          }
        }

        .masonry-item {
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .masonry-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: center;
          display: block;
          border-radius: 0.5rem;
          transition: transform 0.3s ease;
        }

        .masonry-item:hover .gallery-image {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ImageGalleryTours;

