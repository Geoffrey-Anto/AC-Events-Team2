import React from "react";
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderData";

const Event = () => {
  return (
    <div className="main__container">
      <div className="text__container">
        <p className="header">Our Events</p>
        <p className="paragraph">
          Android Club has conducted various events through out it's history.
          These are some highlights of such events.
        </p>
      </div>
      <ImageSlider slides={SliderData} />
    </div>
  );
};

export default Event;
