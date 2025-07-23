"use client";

import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Geri sayım hedef tarihi (2022/01/10 12:00)
    const targetDate = new Date("2022-01-10T12:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("EMAIL");

    // E-posta abonelik işlemi burada yapılabilir
    console.log("E-posta aboneliği:", email);
    alert("E-posta adresiniz kaydedildi!");
    e.target.reset();
  };

  return (
    <MainLayout>
      <div className="container-fluid no-padd">
        <div className="row-fluid no-padd">
          <div className="col-sm-12 no-padd">
            <div className="prague-coming-outer page-calculate fullheight overflow">
              <img
                src="/img/coming-soon/8b966b46813989.5865202b84353.jpg"
                className="s-img-switch"
                alt="banner image"
              />

              <div className="prague-coming-wrapper page-calculate-content fullheight">
                <div className="prague-coming-content">
                  <div className="coming-subtitle">COMING SOON</div>

                  <h1 className="coming-title">We're working on this page</h1>

                  <div className="coming-description">
                    <p>Launching in…</p>
                  </div>

                  <ul className="prague-coming-time-wrapper">
                    <li className="coming-time-item">
                      <div className="count count-days">{timeLeft.days}</div>
                      <div
                        className="name name-days"
                        data-mobile="DAY"
                        data-desktop="DAYS"
                      >
                        {window.innerWidth <= 768 ? "DAY" : "DAYS"}
                      </div>
                    </li>

                    <li className="coming-time-item">
                      <div className="count count-hours">{timeLeft.hours}</div>
                      <div
                        className="name name-hours"
                        data-mobile="HOUR"
                        data-desktop="HOURS"
                      >
                        {window.innerWidth <= 768 ? "HOUR" : "HOURS"}
                      </div>
                    </li>

                    <li className="coming-time-item">
                      <div className="count count-mins">{timeLeft.minutes}</div>
                      <div
                        className="name name-mins"
                        data-mobile="MIN"
                        data-desktop="MINS"
                      >
                        {window.innerWidth <= 768 ? "MIN" : "MINS"}
                      </div>
                    </li>

                    <li className="coming-time-item">
                      <div className="count count-secs">{timeLeft.seconds}</div>
                      <div
                        className="name name-secs"
                        data-mobile="SEC"
                        data-desktop="SECS"
                      >
                        {window.innerWidth <= 768 ? "SEC" : "SECS"}
                      </div>
                    </li>
                  </ul>

                  <form
                    onSubmit={handleSubmit}
                    className="mc4wp-form mc4wp-form-1159"
                  >
                    <div className="mc4wp-form-fields">
                      <p>
                        <input
                          className="specialcolorInput"
                          type="email"
                          name="EMAIL"
                          placeholder="Enter Your email to be notified when we launch"
                          required
                        />
                      </p>

                      <p>
                        <button
                          type="submit"
                          className="coming-btn a-btn creative"
                        >
                          <span className="a-btn-line"></span>
                          SIGN UP
                        </button>
                      </p>
                    </div>
                  </form>

                  <ul className="prague-coming-share">
                    <li>
                      <a href="https://www.behance.net/foxthemes">
                        <span className="fa fa fa-behance"></span>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/foxthemes_offic">
                        <span className="fa fa fa-twitter"></span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/foxthemes.page/">
                        <span className="fa fa fa-facebook"></span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.pinterest.com/foxthemes/">
                        <span className="fa fa fa-pinterest-p"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
