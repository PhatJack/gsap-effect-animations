import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const images = [
  "/loading/img-1.png",
  "/loading/img-2.png",
  "/loading/img-3.png",
  "/loading/img-4.png",
  "/loading/img-5.png",
  "/loading/img-1.png",
  "/loading/img-2.png",
  "/loading/img-3.png",
];

const PageLoadingFive = () => {
  const loaderContainerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";
      const images = gsap.utils.toArray(
        ".pl3-loader-image",
      ) as HTMLImageElement[];

      gsap.set(images, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        rotate: (i) => (i < images.length - 1 ? gsap.utils.random(-15, 15) : 0),
        scale: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });
      tl.to(images, {
        scale: 1,
        duration: 1,
        stagger: 0.2,
      }).to(images[images.length - 1], {
        width: "100vw",
        height: "93vh",
        duration: 0.5,
        ease: "power2.inOut",
        delay: 0.25,
        border: 0,
      });
    },
    {
      scope: loaderContainerRef,
    },
  );

  return (
    <div className="relative h-[calc(100vh-4rem)] bg-[#ebdbd6] text-[#9a826b] w-full">
      <div ref={loaderContainerRef} className="loader absolute inset-0 ">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Loading ${index + 1}`}
            className="pl3-loader-image aspect-2/3 border-4 w-64 h-48 border-[#9a826b]"
          />
        ))}
      </div>
    </div>
  );
};

export default PageLoadingFive;
