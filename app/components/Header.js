"use client";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export default function Header () {
  const headerRef = useRef();
  const initialRender = useRef(false);
  const pathname = usePathname();

  useGSAP(() => {
    const pill = headerRef.current.querySelector(".pill");
    const links = gsap.utils.toArray(".nav-link");
    // We assume that the default acitve route is index
    let targetIndex = 0;
    links.forEach((e, i) => {
      if (pathname === e.getAttribute("href") && !initialRender.current) {
        Flip.fit(pill, e, {
          absolute: true,
        });
        targetIndex = i;
        initialRender.current = true;
      }
      e.addEventListener("click", () => {
        if (targetIndex !== i) {
          targetIndex = i;
          Flip.fit(pill, links[targetIndex], {
            duration: 0.35,
            ease: "power1.inOut",
            absolute: true,
          });
        }
      });
    });
    
  }, {
    scope: headerRef,
  });
  return (
    <header className="header" ref={headerRef}>
      <div className="nav-wrapper">
        <nav className="nav">
          <div className="pill"></div>
          <Link className="nav-link" href="/">Home</Link>
          <Link className="nav-link" href="/services">Services</Link>
          <Link className="nav-link" href="/long">Longtext Link</Link>
        </nav>
      </div>
    </header>
  );
}