import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";

import SingleCoupon from "./SingleCoupon";
import { getCoupons } from "../../features/redux/bazar/bazarThunkActions";
import { getCouponsSelector } from "../../features/redux/bazar/bazarSelector";
import { ICoupon } from "../../features/redux/bazar/bazarTypes";
import "./Coupon.css";

const Coupon = () => {
  const coupons = useSelector(getCouponsSelector);

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
            {coupons.map((coupon: ICoupon, i: number) => (
              <SingleCoupon key={i} coupon={coupon} />
            ))}
          </div>
        </Slide>
        <Slide index={1}>
          <div className="coupons">
            {coupons.map((coupon: ICoupon, i: number) => (
              <SingleCoupon key={i} coupon={coupon} />
            ))}
          </div>
        </Slide>
        <Slide index={2}>
          <div className="coupons">
            {coupons.map((coupon: ICoupon, i: number) => (
              <SingleCoupon key={i} coupon={coupon} />
            ))}
          </div>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default Coupon;
