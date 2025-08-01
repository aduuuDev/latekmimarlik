import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonialsData = [
  {
    author: "Kullanıcı Odaklılık",
    content:
      "Her projemizde önceliğimiz; kullanıcıların ihtiyaçlarına, yaşam tarzına ve beklentilerine uygun çözümler üretmek.",
  },
  {
    author: "Sürdürülebilirlik",
    content:
      "Malzeme seçiminden enerji verimliliğine kadar her aşamada çevreye duyarlı, sürdürülebilir tasarım ilkelerini benimsiyoruz.",
  },
  {
    author: "Fonksiyonellik ve Estetik Dengesi",
    content:
      "Mekanların hem işlevsel hem de estetik olarak tatmin edici olmasına özen gösteriyoruz.",
  },
  {
    author: "Modern ve Zamansız Çizgiler",
    content:
      "Tasarımda güncel yaklaşımları takip ederken, uzun ömürlü ve zamansız mekânlar yaratmayı hedefliyoruz.",
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
                <div className="subtitle">TASARIM ANLAYIŞIMIZ</div>
                <h2 className="title">Tasarımda denge, detayda zarafet.</h2>
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
