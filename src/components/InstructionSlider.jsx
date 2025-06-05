// src/components/InstructionSlider.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "./InstructionSlider.css"; // Tạo file CSS này

const InstructionSlider = ({ instructions, destinationName }) => {
  if (!instructions || instructions.length === 0) {
    return null;
  }
  console.log("instructions", instructions);
  return (
    <div className="instruction-slider">
      <h2 className="slider-title">Hướng dẫn đến: {destinationName}</h2>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30} // Khoảng cách giữa các slide
        slidesPerView={1} // Hiển thị 1 slide mỗi lần
        navigation // Bật nút Next/Prev
        pagination={{ clickable: true }} // Bật chấm phân trang
        className="mySwiper" // Class để style nếu cần
      >
        {instructions.map((step, index) => (
          <SwiperSlide key={index} className="instruction-step-slide">
            <div className="slide-text-content">
              <p className="step-number">
                Bước {index + 1}/{instructions.length}
              </p>
              <p className="step-description">{step.text}</p>
            </div>
            <div className="slide-image-container">
              <img
                src={step.image}
                alt={`Bước ${index + 1}`}
                className="slide-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InstructionSlider;
