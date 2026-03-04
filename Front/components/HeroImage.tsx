import CustomImage from "./ui/CustomImage";

export default function HeroImage() {
  return (
    <CustomImage 
      src="/images/hero-business.jpg"
      alt="Emprendedor exitoso iniciando su negocio con Total Incorporation"
      // Aquí definimos que el Hero ES prioritario
      priority={true} //crucial para el rendimiento SEO
      // Estilos específicos que solo el Hero lleva
      containerClass="w-full max-w-5xl mx-auto h-[300px] md:h-[500px] mt-12 shadow-2xl rounded-[2.5rem]"
      className="hover:scale-105 transition-transform duration-1000"
    />
  );
}