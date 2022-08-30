import React, { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState({
    prev: slides.length - 1,
    curr: 0,
    next: 1,
  });

  const [isSliding, setIsSliding] = useState(false);

  const sliderRef = useRef();

  useEffect(() => {
    window.addEventListener("keyup", keyPressHandler, false);
    window.addEventListener("wheel", scrollHandler, false);
    return () => {
      window.removeEventListener("keyup", keyPressHandler);
      window.removeEventListener("wheel", scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  function scrollHandler(e) {
    if ((e.deltaX > 10 || e.deltaX < 10) && !isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        if (e.deltaX > 0) {
          next();
        } else {
          prev();
        }
        setIsSliding(false);
      }, 200);
    }
    // e.deltaX > 100 ? next() : prev();
  }

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
      <div className="slider__images__container" ref={sliderRef}>
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
