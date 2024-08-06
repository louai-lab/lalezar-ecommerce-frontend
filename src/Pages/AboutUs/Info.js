import React from "react";
import StyleInfo from "./Info.module.css";
import FirstImage from "../../Assets/first.jpeg";
import SecondImage from "../../Assets/second.jpeg";
import ThirdImage from "../../Assets/third.jpeg";
import ForthImage from "../../Assets/forth.jpeg";
import SingleInfo from "./SingleInfo";
import { useLanguage } from "../../Utils/LanguageContext";

function Info() {
  const { language } = useLanguage();

  const Infos = [
    {
      id: 1,
      title: language === "en" ? "Our Products" : "منتجاتنا",
      paragraph:
        language === "en"
          ? `Lalezar’s products are 100% Lebanese, crafted with passion and
      attention to detail. We offer a wide range of distinctive and
      innovative blends, without any unhealthy additives or preservatives,
      and they are also gluten-free. These features make our products
      stand out in quality and uniqueness in the market`
          : `منتجات لاليزار التحويلية لبنانية 100%، تتميز بأنها مصنوعة بشغف واهتمام بالتفاصيل. نقدم مجموعة واسعة من الخلطات المميزة والمبتكرة، بدون أي إضافات غير صحية أو مواد حافظة، كما أنها خالية من الغلوتين. هذه الميزات تجعل منتجاتنا تتفوق في الجودة وتنفرد في السوق.`,
      image: FirstImage,
    },
    {
      id: 2,
      title: language === "en" ? "Our Presence" : "إنتشارنا",
      paragraph:
        language === "en"
          ? `Lalezar has a main branch in Koura and three points 
      of sale in Tripoli and Beirut. Our customers seek us out for the 
      innovation and quality we provide. We believe that using 
      high-quality spices is the best way to attract customers looking 
      for new products with added value.`
          : `تمتلك لاليزار فرعًا رئيسيًا في الكورة وثلاث نقاط بيع في طرابلس وبيروت. يتوجه إلينا عملاؤنا بحثًا عن الابتكار والجودة التي نقدمها. نؤمن بأن استخدام البهارات عالية الجودة هو الطريقة المثلى لجذب العملاء الباحثين عن منتجات جديدة ذات قيمة إضافية.`,
      image: SecondImage,
    },
    {
      id: 3,
      title: language === "en" ? "Our Vision" : "رؤيتنا",
      paragraph:
        language === "en"
          ? `Based on the market studies we conducted in 2019, 
      we found that the manufacturing industry and spice production 
      have undergone significant changes. The Lebanese market needs 
      high-quality products at reasonable prices. This is where the
       idea of Lalizar came from: to offer new and unique flavors 
       to traditional spices, while maintaining the highest quality 
       standards`
          : `استنادًا إلى دراسات السوق التي أجريناها في عام 2019، تبين لنا أن الصناعة التحويلية وإنتاج البهارات قد شهدت تغيرات كبيرة. السوق اللبناني بحاجة إلى منتجات عالية الجودة بأسعار معتدلة. ومن هنا جاءت فكرة مشروع لاليزار لتقديم نكهات جديدة وفريدة للبهارات التقليدية، مع الحفاظ على أعلى معايير الجودة.`,
      image: ThirdImage,
    },
    {
      id: 4,
      title:
        language === "en" ? "Supporting Local Producers" : "دعمنا للمحليين",
      paragraph:
        language === "en"
          ? `At Lalezar, we are committed to using many 
      local products, including agricultural crops, herbs, 
      and raw materials from local factories, to support local 
      industries and agriculture in Lebanon and to help achieve 
      reasonable prices for our products.`
          : `نحن في لاليزار نحرص على استخدام الكثير من المنتجات المحلية، بما في ذلك المحاصيل الزراعية والأعشاب والمواد الأولية من المصانع المحلية، بهدف دعم الصناعات والزراعات المحلية في لبنان والمساهمة في تحقيق أسعار معتدلة لمنتجاتنا.`,
      image: ForthImage,
    },
  ];

  return (
    <div className={StyleInfo.infoContainer}>
      {Infos.map((item, index) => (
        <SingleInfo
          key={index}
          id={item.id}
          title={item.title}
          paragraph={item.paragraph}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default Info;
