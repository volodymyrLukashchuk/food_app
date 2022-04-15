import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ButtonBack, ButtonNext } from "pure-react-carousel";

const SingleCoupon = ({ coupon }) => {
  return (
    <>
      <div
        style={{
          background: `linear-gradient(90deg, ${coupon.gradientColors.start} 0%, ${coupon.gradientColors.end} 100%)`,
        }}
        className="single-coupon"
        key={coupon.id}
      >
        <p>{coupon.title}</p>
        <span>{coupon.description}</span>
        <button style={{ color: coupon.gradientColors.end }}>
          {coupon.buttonText}
        </button>
      </div>
      <ButtonBack className="arrow-button-left">
        <span>
          <MdKeyboardArrowLeft />
        </span>
      </ButtonBack>
      <ButtonNext className="arrow-button-right">
        <span>
          <MdKeyboardArrowRight />
        </span>
      </ButtonNext>
    </>
  );
};

export default SingleCoupon;
