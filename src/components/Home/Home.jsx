import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import Slider from "react-slick";
import carouselImgs from "./images";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import Product from "../Product/Product";

export default function Home() {
  const sliderSettings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <></>,
    prevArrow: <></>,
  };

  const [gamingChairs, setGamingChairs] = useState([]);
  const [gamingMonitors, setGamingMonitors] = useState([]);
  const [graphicCards, setGraphicCards] = useState([]);
  const [gamingHeadsets, setGamingHeadset] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data } = await commerce.products.list({ limit: 200 });
    const gamingChairsItems = data.filter((item) => item.categories[0].slug === "gaming-chair");
    const gamingMonitorsItems = data.filter((item) => item.categories[0].slug === "gaming-monitor");
    const graphicCardsItems = data.filter((item) => item.categories[0].slug === "graphic-card");
    const gamingHeadsetItems = data.filter((item) => item.categories[0].slug === "gaming-headset");
    setGamingChairs(gamingChairsItems.slice(0, 4));
    setGamingMonitors(gamingMonitorsItems.slice(0, 4));
    setGraphicCards(graphicCardsItems.slice(0, 4));
    setGamingHeadset(gamingHeadsetItems.slice(0, 4));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <div className="nav-height"></div>
          <div className="container">
            <div className="py-4">
              <Slider {...sliderSettings}>
                {carouselImgs.map((image, index) => (
                  <div key={index} className={`p-2 ${styles.carousel_item}`}>
                    <div className={styles.inner_item}>
                      <img src={image} alt="pc art work" className="w-100 rounded-3" />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="mb-4">
              <div className="light-brdr-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className={`fw-bold h4 mb-0 pb-2 text-light-black ${styles.green_brdr_bottom}`}>Gaming Chairs</h2>
                  <Link to="/category/gaming-chair" className={`text-decoration-none pb-2 fw-bold ${styles.see_all_link}`}>
                    See All<i className="fa-solid fa-angles-right ms-1"></i>
                  </Link>
                </div>
              </div>
              <div className="row justify-content-center py-4 g-3">
                {gamingChairs.map((gamingChair, index) => (
                  <Product product={gamingChair} key={index} />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <div className="light-brdr-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className={`fw-bold h4 mb-0 pb-2 text-light-black ${styles.green_brdr_bottom}`}>Gaming Monitors</h2>
                  <Link to="/category/gaming-monitor" className={`text-decoration-none pb-2 fw-bold ${styles.see_all_link}`}>
                    See All<i className="fa-solid fa-angles-right ms-1"></i>
                  </Link>
                </div>
              </div>
              <div className="row justify-content-center py-4 g-3">
                {gamingMonitors.map((gamingMonitor, index) => (
                  <Product product={gamingMonitor} key={index} />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <div className="light-brdr-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className={`fw-bold h4 mb-0 pb-2 text-light-black ${styles.green_brdr_bottom}`}>Graphic Cards</h2>
                  <Link to="/category/graphic-card" className={`text-decoration-none pb-2 fw-bold ${styles.see_all_link}`}>
                    See All<i className="fa-solid fa-angles-right ms-1"></i>
                  </Link>
                </div>
              </div>
              <div className="row justify-content-center py-4 g-3">
                {graphicCards.map((graphicCard, index) => (
                  <Product product={graphicCard} key={index} />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <div className="light-brdr-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className={`fw-bold h4 mb-0 pb-2 text-light-black ${styles.green_brdr_bottom}`}>Gaming Headset</h2>
                  <Link to="/category/gaming-headset" className={`text-decoration-none pb-2 fw-bold ${styles.see_all_link}`}>
                    See All<i className="fa-solid fa-angles-right ms-1"></i>
                  </Link>
                </div>
              </div>
              <div className="row justify-content-center py-4 g-3">
                {gamingHeadsets.map((gamingHeadset, index) => (
                  <Product product={gamingHeadset} key={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
