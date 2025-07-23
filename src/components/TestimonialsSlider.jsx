import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonialsData = [
  {
    author: "Hebele Hübele",
    content: "Harika bir deneyim, tasarım detayları mükemmel.",
  },
  {
    author: "Jennifer Hilbertson",
    content: "Modern çizgilerle bezeli, sade ama etkileyici.",
  },
  {
    author: "Lesley Grand",
    content: "İç mimari uyumu gerçekten üst seviyede.",
  },
  {
    author: "John Frick",
    content: "Işıklandırma ve renk kombinasyonu çok başarılı.",
  },
];

const Testimonials = () => {
  return (
    <>
      <div className="container no-padd">
        <div className="row-fluid margin-lg-10t margin-sm-20t">
          <div className="col-sm-12 no-padd">
            <div className="column-inner">
              <div className="heading left dark">
                <div className="subtitle">TESTIMONIALS</div>
                <h2 className="title">They love us.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row row-fluid margin-lg-10t">
          <div className="testimonials-wrapper no-figure">
            <Swiper
              className="testimonials-swiper swiper"
              modules={[Autoplay, Pagination]}
              loop={true}
              speed={1500}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className}">${testimonialsData[index].author}</span>`,
              }}
            >
              {testimonialsData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="testimonials-item">
                    <span className="testimonials-icon fa fa-quote-right"></span>
                    <blockquote className="testimonials-description">
                      <p>{item.content}</p>
                    </blockquote>
                    <h4 className="testimonials-author">{item.author}</h4>
                  </div>
                </SwiperSlide>
              ))}

              {/* Pagination dışarıda olacak şekilde aşağıya alındı */}
              <div className="testimonials-pagination-wrapper">
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
