import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoupons } from "../../features/redux/bazarSlice";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./Coupon.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Coupon = () => {
  const coupons = useSelector((state) => state.bazar.coupons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  return (
    <CarouselProvider
      interval={5000}
      isPlaying={true}
      infinite={true}
      totalSlides={3}
      naturalSlideWidth={100}
      naturalSlideHeight={20}
    >
      <Slider>
        <Slide index={0}>
          <div className="coupons">
            {coupons.map((coupon) => (
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
            ))}
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
          </div>
        </Slide>
        <Slide index={1}>
          <div className="coupons">
            {coupons.map((coupon) => (
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
            ))}
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
          </div>
        </Slide>
        <Slide index={2}>
          <div className="coupons">
            {coupons.map((coupon) => (
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
            ))}
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
          </div>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default Coupon;
