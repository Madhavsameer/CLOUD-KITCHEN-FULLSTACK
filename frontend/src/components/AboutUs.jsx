import React from "react";
import { Container, Row, Col } from "reactstrap";
import CountUp from "react-countup";
import Slider from "react-slick";
import "../styles/about.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutUs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
  };

  return (
    <section id="about-us">
      <Container>
        <Row>
          <Col lg="6">
            <div className="about__content">
              <h2>Know About Us..😊</h2>
              <p>
                This website is developed by domain students of Centurion University.
                We are continuously working to make this web experience better for our users.
              </p>

              <div className="about__counter">
                <div className="single__counter">
                  <span className="counter">
                    <CountUp start={0} end={5000} duration={5} suffix="" />
                  </span>
                  <p className="counter__title">5000+ Happy Customers😋</p>
                </div>

                <div className="single__counter">
                  <span className="counter">
                    <CountUp start={0} end={8000} duration={5} suffix="" />
                  </span>
                  <p className="counter__title">8000+ Cloud Kitchen Partners Globally</p>
                </div>

                <div className="single__counter">
                  <span className="counter">
                    <CountUp start={0} end={500000} duration={5} suffix="" />
                  </span>
                  <p className="counter__title">Ideas Raised Funds</p>
                </div>

                <div className="single__counter">
                  <span className="counter">
                    <CountUp start={0} end={100} duration={5} suffix="" />
                  </span>
                  <p className="counter__title">100+ Categories Served</p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6" className="mb-4 mb-lg-0">
            <div className="about__img">
              <Slider {...settings}>
                <div>
                  <img src="https://www.namasteui.com/wp-content/uploads/2020/11/Cloud-Kitchen.jpg" alt="Cloud Kitchen 1" className="w-100" />
                </div>
                <div>
                  <img src="https://bubblycious.co.uk/img/delivery_boy.gif" alt="Cloud Kitchen 3" className="w-100" />
                </div>
                <div>
                  <img src="https://th.bing.com/th/id/OIP.U1Zff1L5DDLpc5TDYeV6fAHaE8?rs=1&pid=ImgDetMain" alt="Cloud Kitchen 2" className="w-100" />
                </div>
                
                {/* Add more images as needed */}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
