import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { EffectFade, Pagination, Autoplay, Navigation } from "swiper/modules";
import Styles from "./ChooseUs.module.css";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SpaIcon from "@mui/icons-material/Spa";
import { useLanguage } from "../../Utils/LanguageContext";

export default function ChooseUsSwiper() {
  const { language } = useLanguage();

  const data = [
    {
      title: `${
        language === "en" ? "Gluten-Free Guarantee" : "خالي من البروتايين"
      }`,
      text: `${
        language === "en"
          ? "Enjoy our spice collection worry-free with our gluten-free assurance"
          : "استمتع بمجموعة التوابل الخاصة بنا دون قلق مع ضماننا الخالي من الغلوتين"
      }`,
      icon: (
        <SpaIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
    {
      title: `${
        language === "en" ? "24 x 7 User Support" : "دعم المستخدم 24 × 7"
      }`,
      text: `${
        language === "en"
          ? "We use latest technology for the latest world because we know the demand of people"
          : "نحن نستخدم أحدث التقنيات لأحدث ما توصل إليه العالم لأننا نعرف طلب الناس"
      }`,
      icon: (
        <SupportAgentIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
    {
      title: `${language === "en" ? "Instant Access" : "دخول فوري"}`,
      text: `${
        language === "en"
          ? "Explore our spice collection and informative blogs with just one click, anytime, anywhere."
          : "استكشف مجموعة التوابل والمدونات الغنية بالمعلومات بنقرة واحدة فقط، في أي وقت وفي أي مكان."
      }`,
      icon: (
        <AccessTimeFilledIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
  ];
  return (
    <div className={Styles.container}>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide>
              <section key={index} className={Styles.card}>
                <span className={Styles.icon}>{item.icon}</span>
                <span className={Styles.rigth}>
                  <h3 className={Styles.title} style={{color:"white"}}>{item.title}</h3>
                  <p className={Styles.p}>{item.text}</p>
                </span>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
