import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const ParallaxFooter = () => {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2, // độ mượt (1.2–2 là đẹp)
      effects: true, // enable data-speed parallax
    });
    const footerContainer = document.getElementById("footer-container");
    gsap.set(footerContainer, {
      yPercent: -50,
    });
    const tl = gsap.timeline({ paused: true });
    tl.to(footerContainer, {
      yPercent: 0,
      ease: "none",
    });
    ScrollTrigger.create({
      trigger: "#conclusion",
      start: "top top",
      end: "+=75%",
      animation: tl,
      scrub: true,
    });
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="w-full h-screen bg-red-400"></div>
        <div className="w-full h-screen bg-blue-400"></div>

        <div id="conclusion" className="w-full h-screen bg-green-400"></div>

        <footer className="bg-gray-950 text-gray-400 h-[75vh] w-full overflow-hidden">
          <div
            id="footer-container"
            data-speed="0.8"
            className="mx-auto container py-12 md:py-16 h-[75vh]"
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12 mb-12 text-sm">
              {" "}
              <div>
                {" "}
                <h3 className="mb-4 font-semibold text-white">Product</h3>{" "}
                <ul className="space-y-3">
                  {" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Features{" "}
                    </a>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Pricing{" "}
                    </a>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Changelog{" "}
                    </a>{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="mb-4 font-semibold text-white">Company</h3>{" "}
                <ul className="space-y-3">
                  {" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      About{" "}
                    </a>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Blog{" "}
                    </a>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Careers{" "}
                    </a>{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="mb-4 font-semibold text-white">
                  Resources
                </h3>{" "}
                <ul className="space-y-3">
                  {" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Docs{" "}
                    </a>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Support{" "}
                    </a>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Community{" "}
                    </a>{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="mb-4 font-semibold text-white">Legal</h3>{" "}
                <ul className="space-y-3">
                  {" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Privacy{" "}
                    </a>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Terms{" "}
                    </a>{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href="#" className="hover:text-white transition-colors">
                      {" "}
                      Cookies{" "}
                    </a>{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
            </div>{" "}
            {/* Bottom bar */}{" "}
            <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-800 pt-8 text-sm md:flex-row">
              {" "}
              <p>
                {" "}
                © {new Date().getFullYear()} Your Company. All rights
                reserved.{" "}
              </p>{" "}
              <div className="flex gap-6">
                {" "}
                <a href="#" className="hover:text-white transition-colors">
                  {" "}
                  Twitter{" "}
                </a>{" "}
                <a href="#" className="hover:text-white transition-colors">
                  {" "}
                  GitHub{" "}
                </a>{" "}
                <a href="#" className="hover:text-white transition-colors">
                  {" "}
                  Discord{" "}
                </a>{" "}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export { ParallaxFooter };
