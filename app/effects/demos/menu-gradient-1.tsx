import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState, useRef } from "react";

const MenuGradientOne = () => {
  const [menu, setMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayMenuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const menuItems = gsap.utils.toArray(".menu-item");
      // trạng thái ban đầu
      gsap.set(menuRef.current, {
        y: "100%",
        skewY: -10,
        transformOrigin: "right top",
      });
      gsap.set(overlayMenuRef.current, {
        y: "-100%",
        transformOrigin: "center top",
      });
      gsap.set(menuItems, {
        y: 50,
        opacity: 0,
      });

      // tạo timeline
      tl.current = gsap.timeline({ paused: true });

      tl.current
        // bars
        .to(
          "#bar-one",
          {
            rotate: -5,
            duration: 0.5,
            transformOrigin: "right center",
          },
          0,
        )
        .to(
          "#bar-two",
          {
            rotate: 5,
            duration: 0.5,
            transformOrigin: "right center",
          },
          0,
        )

        // text open -> hide
        .to(
          "#text-open",
          {
            y: "-100%",
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          0,
        )

        // text close -> show
        .fromTo(
          "#text-close",
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          0.1,
        )

        // menu overlay
        .to(
          menuRef.current,
          {
            y: "0%",
            skewY: 0,
            duration: 1.25,
            ease: "power3.out",
          },
          0,
        )
        .to(
          overlayMenuRef.current,
          {
            y: "0%",
            duration: 0.75,
            ease: "power3.out",
          },
          "<30%",
        )
        .to(
          menuItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        );
    },
    { scope: containerRef },
  );

  // control timeline
  useGSAP(
    () => {
      if (menu) {
        tl.current?.play();
      } else {
        tl.current?.reverse();
      }
    },
    { dependencies: [menu] },
  );

  return (
    <>
      <div
        ref={containerRef}
        className="h-[calc(100vh-4rem)] relative overflow-hidden"
      >
        <div className="w-full flex justify-end items-center relative p-6 z-60">
          <button
            onClick={() => setMenu((prev) => !prev)}
            className="group cursor-pointer relative w-fit h-8 flex items-end justify-end"
          >
            <span
              id="bar-one"
              className="absolute top-0 right-0 h-0.5 bg-black w-full"
            ></span>
            <span
              id="bar-two"
              className="absolute top-1/4 right-0 h-0.5 bg-black w-full"
            ></span>

            <div className="flex items-center gap-1 overflow-hidden h-5">
              <div className="relative h-full w-12 text-right">
                <span
                  id="text-open"
                  className="absolute inset-0 uppercase text-sm font-bold"
                >
                  open
                </span>
                <span
                  id="text-close"
                  className="absolute inset-0 uppercase text-sm font-bold"
                >
                  close
                </span>
              </div>
              <p className="uppercase text-sm font-bold">menu</p>
            </div>
          </button>
        </div>
        <div ref={menuRef} className="fixed inset-0 bg-red-400 z-50">
          <div className="flex items-center h-full p-20">
            <div className="flex flex-col items-start gap-10">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <span
                  key={item}
                  className="menu-item text-6xl uppercase text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div ref={overlayMenuRef} className="fixed inset-0 bg-black/40 z-40" />
      </div>
    </>
  );
};

export { MenuGradientOne };
