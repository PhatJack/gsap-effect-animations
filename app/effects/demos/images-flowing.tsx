import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollArea } from "~/components/ui/scroll-area";

gsap.registerPlugin(ScrollTrigger);

const FLOWING_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    alt: "1",
  },
  {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
    alt: "2",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    alt: "3",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
    alt: "4",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    alt: "5",
  },
  // {
  //   src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
  //   alt: "6",
  // }
];

const ImagesFlowing = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const viewport = scrollerRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]",
      ) as HTMLElement | null;
      const stage = stageRef.current;
      const gallery = galleryRef.current;

      if (!viewport || !stage || !gallery) return;

      const cards = gsap.utils.toArray<HTMLElement>(".flip-flow-card");

      // Cấu hình không gian 3D cho gallery
      gsap.set(gallery, {
        perspective: 1800,
        perspectiveOrigin: "50% 50%",
      });

      // BAN ĐẦU: Tất cả ảnh xếp chồng ở giữa (dùng xPercent và yPercent)
      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        z: 0,
        opacity: 1,
        rotationY: 0,
        scale: 0,
        transformOrigin: "center center",
      });

      // Vị trí cuối cùng cho mỗi ảnh (dàn hàng ngang)
      const totalCards = cards.length;
      const spacing = 180; // Khoảng cách giữa các ảnh
      const totalWidth = (totalCards - 1) * spacing;
      const centerIndex = Math.floor(totalCards / 2);
      // Xác định vị trí x cuối cùng cho mỗi ảnh (căn giữa)
      const endPositions = cards.map((_, i) => {
        return -totalWidth / 2 + i * spacing;
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: stage,
          scroller: viewport,
          start: "top top",
          end: () => `+=${Math.max(1200, cards.length * 200)}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // ANIMATION: Từ giữa dàn ra hàng ngang
      timeline
        // Scale và xoay nhẹ khi bắt đầu
        .to(cards, {
          scale: 1,
          rotationY: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
        })
        // Dàn ra hàng ngang
        .to(cards, {
          x: (i) => endPositions[i] * 2,
          y: 0,
          z: (i) => Math.sin(i * 0.7) * 70, // Tạo chiều sâu 3D
          rotationY: (i) => (i - (totalCards - 1) / 2) * 8, // Xoay nhẹ tạo hiệu ứng
          duration: 1.5,
          stagger: {
            each: 0.06,
            from: "center",
          },
          ease: "power3.inOut",
        });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    { scope: scrollerRef },
  );

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-[#08090b]">
      <ScrollArea ref={scrollerRef} className="h-full w-full">
        {/* Section đầu */}
        <section className="grid h-[72svh] place-items-end px-5 pb-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-5xl">
            <p className="text-xs font-semibold uppercase text-emerald-300">
              GSAP 3D scroll
            </p>
            <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              Helix Flow
            </h1>
          </div>
        </section>

        {/* Section triggers hiệu ứng */}
        <section
          ref={stageRef}
          aria-label="Images flipping in a spiral flow"
          className="relative grid h-[100svh] overflow-hidden bg-[#e8e2d6]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" />

          {/* GALLERY: Hiển thị hàng ngang */}
          <div
            ref={galleryRef}
            className="relative flex h-full w-full items-center justify-center overflow-visible"
            style={{ transformStyle: "preserve-3d" }}
          >
            {FLOWING_IMAGES.map((image, index) => (
              <figure
                key={image.src}
                className="flip-flow-card absolute w-[240px] sm:w-[280px] lg:w-[320px] h-[38svh] min-h-[200px] overflow-hidden rounded-md bg-zinc-950 shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                  left: "50%",
                  top: "50%",
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <figcaption className="flip-flow-label absolute bottom-4 left-4 rounded bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase text-white">
                  {String(index + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="h-[86svh] bg-[#121416]" />
      </ScrollArea>
    </div>
  );
};

export default ImagesFlowing;
