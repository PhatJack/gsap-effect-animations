import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const PageLoadingTwo = () => {
	const rootRef = useRef<HTMLDivElement>(null);
	const counterRef = useRef<HTMLSpanElement>(null);

	useGSAP(
		() => {
			const counterEl = counterRef.current;
			if (!counterEl) return;

			document.body.style.overflow = "hidden";

			const counter = { value: 0 };
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
				onComplete: () => {
					document.body.style.overflow = "";
				},
			});

			tl.fromTo(
				".pl2-line",
				{ yPercent: 130 },
				{
					yPercent: 0,
					duration: 0.8,
					stagger: 0.08,
				},
				0.08,
			)
				.from(
					".pl2-meta",
					{
						y: 20,
						opacity: 0,
						duration: 0.55,
						stagger: 0.08,
					},
					0.2,
				)
				.to(
					counter,
					{
						value: 100,
						duration: 2,
						ease: "power2.inOut",
						onUpdate: () => {
							counterEl.textContent = Math.round(counter.value)
								.toString()
								.padStart(3, "0");
						},
					},
					0,
				)
				.to(
					".pl2-stripe",
					{
						scaleY: 0,
						transformOrigin: "top",
						duration: 0.7,
						stagger: {
							amount: 0.3,
							from: "edges",
						},
					},
					1.55,
				)
				.to(
					".pl2-loader",
					{
						yPercent: -100,
						duration: 1,
						ease: "expo.inOut",
					},
					1.8,
				)
				.from(
					".pl2-hero-word",
					{
						yPercent: 120,
						opacity: 0,
						rotateX: -45,
						transformOrigin: "50% 100%",
						duration: 0.9,
						stagger: 0.09,
					},
					2.05,
				)
				.from(
					".pl2-copy",
					{
						opacity: 0,
						y: 14,
						duration: 0.6,
					},
					2.25,
				);

			return () => {
				document.body.style.overflow = "";
				tl.kill();
			};
		},
		{ scope: rootRef },
	);

	return (
		<div ref={rootRef} className="relative h-[calc(100vh-4rem)] overflow-hidden bg-[#f8f4ed]">
			{/* <section className="pl2-hero relative z-10 min-h-screen px-6 pb-16 pt-28 text-[#10100e] md:px-12">
				<div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between gap-10">
					<div className="overflow-hidden text-[13vw] font-black uppercase leading-[0.84] tracking-[-0.04em] md:text-[8rem]">
						<div className="overflow-hidden">
							<span className="pl2-hero-word inline-block">Crafted</span>
						</div>
						<div className="overflow-hidden">
							<span className="pl2-hero-word inline-block">Motion</span>
						</div>
						<div className="overflow-hidden">
							<span className="pl2-hero-word inline-block">Prelude</span>
						</div>
					</div>

					<div className="pl2-copy flex flex-col gap-3 text-sm uppercase tracking-[0.24em] text-[#2f2f2b] md:text-base">
						<span>Inspired by high-end awwwards intros</span>
						<span>GSAP sequencing + editorial pacing</span>
					</div>
				</div>
			</section> */}

			<div className="pl2-loader fixed inset-0 z-50 overflow-hidden bg-[#111111] text-[#f2f1ed]">
				<div className="absolute inset-0 grid grid-cols-5">
					{Array.from({ length: 5 }).map((_, idx) => (
						<span
							key={idx}
							className="pl2-stripe h-full w-full border-r border-white/10 bg-[#1a1a1a] last:border-r-0"
						/>
					))}
				</div>

				<div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10">
					<div className="flex items-start justify-between gap-4 text-xs uppercase tracking-[0.22em] md:text-sm">
						<span className="pl2-meta">GSAP EFFECT LAB</span>
						<span className="pl2-meta">Page Loading Two</span>
					</div>

					<div className="space-y-1 text-[13vw] font-black uppercase leading-[0.85] tracking-[-0.05em] md:text-[9rem]">
						<div className="overflow-hidden">
							<span className="pl2-line inline-block">Building</span>
						</div>
						<div className="overflow-hidden">
							<span className="pl2-line inline-block">Your</span>
						</div>
						<div className="overflow-hidden">
							<span className="pl2-line inline-block">Experience</span>
						</div>
					</div>

					<div className="flex items-end justify-between gap-4 border-t border-white/15 pt-4">
						<div className="pl2-meta text-xs uppercase tracking-[0.24em] text-white/70 md:text-sm">
							Please wait while assets load
						</div>
						<div className="pl2-meta flex items-end text-[18vw] font-black leading-[0.75] tracking-[-0.05em] md:text-[7rem]">
							<span ref={counterRef}>000</span>
							<span className="pb-1 text-[0.2em]">%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { PageLoadingTwo };