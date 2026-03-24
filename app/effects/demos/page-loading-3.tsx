import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const PageLoadingThree = () => {
	const rootRef = useRef<HTMLDivElement>(null);
	const counterRef = useRef<HTMLSpanElement>(null);

	useGSAP(
		() => {
			const counterEl = counterRef.current;
			if (!counterEl) return;

			// Lock overflow
			document.body.style.overflow = "hidden";

			// Marquee animation
			// Continuous horizontal scroll
			gsap.to(".marquee-text-1", {
				xPercent: -50,
				ease: "none",
				duration: 15,
				repeat: -1,
			});
			gsap.to(".marquee-text-2", {
				xPercent: -50,
				ease: "none",
				duration: 20,
				repeat: -1,
			});

			const counter = { value: 0 };
			const tl = gsap.timeline({
				onComplete: () => {
					document.body.style.overflow = "";
				},
			});

			// Counter going up and subtle scale
			tl.from(
				".pl3-center-circle",
				{
					scale: 0.8,
					opacity: 0,
					duration: 1.5,
					ease: "power3.out",
				},
				0
			)
				.to(
					counter,
					{
						value: 100,
						duration: 2.5,
						ease: "power2.inOut",
						onUpdate: () => {
							counterEl.textContent = Math.round(counter.value)
								.toString()
								.padStart(3, "0");
						},
					},
					0.5
				)
				// Blur and fade out text elements as it finishes
				.to(
					".pl3-blur",
					{
						filter: "blur(15px)",
						opacity: 0,
						duration: 0.8,
						ease: "power2.in",
					},
					"-=0.8"
				)
				// Iris out reveal (clip-path circle shrinks to nothing to reveal background)
				// We start from 150% so it covers all corners, and shrink to 0%
				.to(
					".pl3-loader",
					{
						clipPath: "circle(0% at 50% 50%)",
						duration: 1.2,
						ease: "expo.inOut",
					},
					"-=0.1"
				);

			return () => {
				document.body.style.overflow = "";
				tl.kill();
			};
		},
		{ scope: rootRef }
	);

	return (
		<div
			ref={rootRef}
			className="relative h-[calc(100vh-4rem)] overflow-hidden bg-[#e6e6e6] text-[#111]"
		>
			{/* Fake Page Content to reveal */}
			<div className="flex h-full w-full items-center justify-center">
				<div className="text-center">
					<h1 className="text-5xl font-black uppercase tracking-tighter md:text-8xl">
						<span className="block opacity-20">Experience</span>
						<span className="block">Revealed</span>
					</h1>
				</div>
			</div>

			{/* Loader Overlay */}
			<div
				className="pl3-loader fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050505] text-white"
				style={{ clipPath: "circle(150% at 50% 50%)" }}
			>
				{/* Infinite Marquee Backdrops */}
				<div
					className="pl3-blur absolute flex w-[200vw] rotate-[-10deg] opacity-20"
					style={{ top: "10%" }}
				>
					<div
						className="marquee-text-1 flex whitespace-nowrap text-[12vw] font-black uppercase tracking-widest text-transparent"
						style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)" }}
					>
						<span>AESTHETIC SEQUENCING • AESTHETIC SEQUENCING •&nbsp;</span>
						<span>AESTHETIC SEQUENCING • AESTHETIC SEQUENCING •&nbsp;</span>
					</div>
				</div>
				<div
					className="pl3-blur absolute flex w-[200vw] rotate-[10deg] opacity-10"
					style={{ bottom: "10%" }}
				>
					<div
						className="marquee-text-2 flex whitespace-nowrap text-[15vw] font-black uppercase tracking-tight text-transparent"
						style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}
					>
						<span>IMMERSIVE PORTAL • IMMERSIVE PORTAL •&nbsp;</span>
						<span>IMMERSIVE PORTAL • IMMERSIVE PORTAL •&nbsp;</span>
					</div>
				</div>

				{/* Center counter circle */}
				<div className="pl3-blur pl3-center-circle relative z-10 flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl md:h-72 md:w-72">
					<div className="flex items-baseline text-6xl font-black tracking-tighter md:text-8xl">
						<span ref={counterRef}>000</span>
						<span className="text-2xl text-white/40 md:text-4xl">%</span>
					</div>
				</div>

				{/* Corner accents */}
				<div className="pl3-blur absolute left-6 top-6 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
					Initialising
				</div>
				<div className="pl3-blur absolute bottom-6 right-6 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
					GSAP Engine 3.12
				</div>
			</div>
		</div>
	);
};

export { PageLoadingThree };
