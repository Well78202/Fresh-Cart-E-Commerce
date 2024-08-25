import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function PopularCategories() {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="text-4xl text-main text-center my-4">Shop popular category</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="focus:outline-none">
            <img
              loading="lazy"
              src={category.image}
              className="h-[200px] w-full"
              alt={category}
            />
            <p className="text-lg">{category.name}</p>
          </div>
        ))}
      </Slider>
    </>
  );
}