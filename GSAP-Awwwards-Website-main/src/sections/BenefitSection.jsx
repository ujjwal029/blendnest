import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <section id="benefits" className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <p>
            Why Blendnest: <br />
            Natural Benefits You Can Taste
          </p>

          <div className="mt-20 col-center">
            <ClipPathTitle
              title={"Real fruit"}
              color={"#f5f9f0"}
              bg={"#5a9c4a"}
              className={"first-title"}
              borderColor={"#1a2a1f"}
            />
            <ClipPathTitle
              title={"Tropical Tango"}
              color={"#1a2a1f"}
              bg={"#f5f9f0"}
              className={"second-title"}
              borderColor={"#1a2a1f"}
            />
            <ClipPathTitle
              title={"No artificial flavors"}
              color={"#f5f9f0"}
              bg={"#3d6b35"}
              className={"third-title"}
              borderColor={"#1a2a1f"}
            />
            <ClipPathTitle
              title={"Citrus fresh"}
              color={"#1a2a1f"}
              bg={"#8bc34a"}
              className={"fourth-title"}
              borderColor={"#1a2a1f"}
            />
          </div>

          <div className="md:mt-0 mt-10">
            <p>And much more ...</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
