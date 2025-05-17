import React from "react";
import useRequest from "../utils/useRequest";
import {coupon} from "../utils/api";

const useCoupon = () => {
  const {Request} = useRequest();

  const getCouponsByProductId = async (shopId) => {
    try {
      const response = await Request.get(
        coupon.getCouponsByProductId(shopId)
      );
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const updateCoupon = async (couponId, couponData) => {
    try {
      const response = await Request.put(
        coupon.updateCoupon(couponId),
        couponData
      );
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const deleteCoupon = async (couponId) => {
    try {
      const response = await Request.delete(coupon.deleteCoupon(couponId));
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const createCoupon = async (couponData) => {
    try {
      const response = await Request.post(coupon.createCoupon, couponData);
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  return {getCouponsByProductId, updateCoupon, deleteCoupon, createCoupon};
};

export default useCoupon;
