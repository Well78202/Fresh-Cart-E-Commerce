import React from "react";
import payPal from "../../assets/paypal.jpg";
import amazonPay from "../../assets/amazon.jpg";
import americanExpress from "../../assets/amircan.jpg";
import masterCard from "../../assets/mastercard.jpg";
import apple from "../../assets/appstore.jpg";
import googlePlay from "../../assets/google play.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
export default function Footer() {
  function sendData() {
    emailjs
      .send(
        "service_sm4r3rc",
        "template_7vx0ycr",
        { user_mail: formik.values.user_mail },
        {
          publicKey: "bd__HK1SGi_wtWEev",
        }
      )
      .then(
        () => {
          toast.success("Thanks for contact us");
        },
        (error) => {
          toast.error(error);
        }
      );
    setTimeout(() => {
      formik.handleReset();
    }, 1000);
  }

  let validationSchema = Yup.object().shape({
    user_mail: Yup.string().required().email(),
  });

  let formik = useFormik({
    initialValues: {
      user_mail: "",
    },
    onSubmit: sendData,
    validationSchema,
  });

  return (
    <>
      <div className="footer bg-gray-200 py-8 mt-8">
        <div className="container  mx-auto">
          <h2 className="capitalize text-3xl">Get The FreshCart App</h2>
          <p className="capitalize text-gray-500 my-4">
            We Will Send You a link, open it on your phone to download the app
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="input flex items-center justify-between  flex-wrap md:flex-nowrap gap-4 px-4"
          >
            <input
              type="email"
              className="w-full md:w-[85%] p-2 rounded border-0 focus:outline-none"
              name="user_mail"
              placeholder="Email .."
              value={formik.values.user_mail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="submit"
              className="capitalize w-full md:w-[15%] mx-auto  rounded text-white bg-green-500 hover:bg-green-800 duration-300 text-sm px-4 py-2"
            >
              share app link
            </button>
          </form>

          <div className="flex my-4 items-center justify-between flex-wrap  border-gray-300 border-y py-6">
            <div className="flex items-center justify-center w-full xl:w-auto gap-2 flex-wrap">
              <h3 className="capitalize text-2xl text-center">
                payment partners
              </h3>
              <img src={amazonPay} className="w-20" alt="amazonPay" />
              <img
                src={americanExpress}
                className="w-20"
                alt="americanExpress"
              />
              <img src={masterCard} className="w-20" alt="masterCard" />
              <img src={payPal} className="w-20" alt="payPal" />
            </div>
            <div className="flex items-center justify-center w-full xl:w-auto gap-2 flex-wrap">
              <h3 className="capitalize text-2xl text-center">
                get deliveries with freshCart
              </h3>
              <img src={apple} className="w-24" alt="apple" />
              <img src={googlePlay} className="w-24" alt="googlePlay" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}