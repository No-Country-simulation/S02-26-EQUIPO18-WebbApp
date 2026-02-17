import Image from "next/image"; 
/*
Beneficio de next/image: optimización automática, lazy loading, etc. 
El servidor de Next.js detecta el navegador del usuario y, 
si este soporta WebP (que hoy es el 95% de los casos), 
convierte la imagen al vuelo y la sirve en WebP automáticamente.
*/


interface CustomImageProps {
  src: string;
  alt: string;
  className?: string; // Para bordes, sombras, etc.
  containerClass?: string; // Para la altura y el ancho del contenedor
  priority?: boolean;
}

export default function CustomImage({ 
  src, 
  alt, 
  className = "", 
  containerClass = "",
  priority = false 
}: CustomImageProps) {
  return (
    <div className={`relative overflow-hidden ${containerClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </div>
  );
}