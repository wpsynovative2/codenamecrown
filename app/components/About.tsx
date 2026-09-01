import Image from "next/image";
import { ABOUT_PARAGRAPHS } from "../data/site";

export default function About() {
  return (
    <section className="section section--dark about" id="about-us">
      <div className="container">
        <h2 className="about__badge">ABOUT-US</h2>

        <div className="about__body">
          <div className="about__text">
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <figure className="about__figure">
            <Image
              src="/images/Biometric Entry gate.jpeg"
              alt="Biometric entry gate at Codename Crown"
              width={912}
              height={1177}
              sizes="(max-width: 767px) 100vw, 32vw"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
