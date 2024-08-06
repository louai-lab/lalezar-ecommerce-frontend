import React from "react";
import StyleInfo from "./Info.module.css";
import { Reveal } from "../../RevealAnimation";
import { RevealRight } from "../../RevealAnimationRight";
import { RevealLeft } from "../../RevealAnimationLeft";

function SingleInfo({ id, title, paragraph, image }) {
  const isReversed = id % 2 === 0;

  const ImageReveal = isReversed ? RevealRight : RevealLeft;
  const TextReveal = isReversed ? RevealLeft : RevealRight;

  return (
    <div
      className={`${StyleInfo.singleborder} ${
        isReversed ? StyleInfo.reverse : ""
      }`}
    >
      <div className={StyleInfo.parentImage}>
        <ImageReveal>
          <img src={image} alt="spices" className={StyleInfo.image} />
        </ImageReveal>
      </div>
      <div className={StyleInfo.border}>
        <TextReveal>
          <h1 className={StyleInfo.titleBorder}>{title}</h1>
          <p className={StyleInfo.paragraph}>{paragraph}</p>
        </TextReveal>
      </div>
    </div>
  );
}

export default SingleInfo;
