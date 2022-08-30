import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState({
    prev: slides.length - 1,
    curr: 0,
    next: 1,
  });

  useEffect(() => {
    window.addEventListener("keyup", keyPressHandler, false);
    // window.addEventListener("scroll", scrollHandler, false);
    return () => {
      window.removeEventListener("keyup", keyPressHandler);
      // window.removeEventListener("scroll", scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  if (!Array.isArray(slides) || slides.length <= 1) {
    return null;
  }
  const length = slides.length;

  const next = () => {
    if (current.next === length - 1) {
      setCurrent({
        prev: current.next - 1,
        curr: current.next,
        next: 0,
      });
    } else {
      setCurrent({
        prev: current.curr,
        curr: current.next,
        next: current.next + 1,
      });
    }
  };
  const prev = () => {
    if (current.prev === 0) {
      setCurrent({
        prev: length - 1,
        curr: current.prev,
        next: current.prev + 1,
      });
    } else if (current.curr === 0) {
      setCurrent({
        prev: current.prev - 1,
        curr: current.prev,
        next: 0,
      });
    } else {
      setCurrent({
        prev: current.prev - 1,
        curr: current.prev,
        next: current.prev + 1,
      });
    }
  };

  function keyPressHandler(e) {
    if (e.key === "ArrowLeft") {
      prev();
    } else if (e.key === "ArrowRight") {
      next();
    }
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prev} />
      <FaArrowAltCircleRight className="right-arrow" onClick={next} />
      <div className="slider__images__container">
        <img
          src={slides[current.prev].image}
          alt="alt"
          className="image left"
        />
        <img src={slides[current.curr].image} alt="alt" className="image" />
        <img
          src={slides[current.next].image}
          alt="alt"
          className="image right"
        />
      </div>
    </section>
  );
};

export default ImageSlider;
