import React, { useContext } from "react";
import HeroSection from "../../Components/Hero/HeroSection";
import MainCategories from "../../Components/MainCategories/MainCategories";
import Styles from "./Home.module.css";
import ChooseUs from "../../Components/ChooseUs/ChooseUs";
import BlogCard from "../../Components/BlogCard2/BlogCard";
import Clients from "../../Components/Clients/Clients";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Utils/AxiosInstance";
import { Reveal } from "../../RevealAnimation";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { useCategoriesStore } from "../../Zustand/Store";
import { useProductsStore } from "../../Zustand/Store";
import { useClientsStore } from "../../Zustand/Store";
import { useLanguage } from "../../Utils/LanguageContext";

const Home = () => {
  const { increaseCartItem, setCartItems } = useContext(CartContext);

  const { categories } = useCategoriesStore();
  const { loading, products } = useProductsStore();
  const { clients, clientCount } = useClientsStore();

  const { language } = useLanguage();

  const {
    isPending: isBlogPending,
    isError: isBlogError,
    data: blogData,
  } = useQuery({
    queryKey: ["blogData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}blog/lastTwo`
        );
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
      }
    },
  });

  const showToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#fff",
        color: "#c86823",
        fontSize: "16px",
      },
    });
  };

  const addToCart = (product) => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = currentItems.find((item) => item.id === product._id);

    if (!existingItem) {
      const newItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        slug: product.slug,
        image: `${process.env.REACT_APP_IMAGE_PATH}${product.image}`,
        totalPrice: product.price,
      };

      currentItems.push(newItem);
      localStorage.setItem("cart", JSON.stringify(currentItems));
      showToast(`${product.name} added successfully to your bag`);
      setCartItems((prevCartItems) => [...prevCartItems, newItem]);
      increaseCartItem();
    } else {
      showToast(`${product.name} already added to your bag 🙂`);
      return;
    }
  };

  const isProductInCart = (productId) => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    return currentItems.some((item) => item.id === productId);
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "5rem auto",
      }}
    >
      <ToastContainer />
      <HeroSection />
      <main className={Styles.main}>
        <h2 className={`${Styles.h2} ${language === "ar" ? Styles.h2AR : ""}`}>
          {language === "en" ? "Main Categories :" : ": الفئات الرئيسية"}
        </h2>
        <MainCategories categories={categories} loading={loading} />
        <h2 className={`${Styles.h2} ${language === "ar" ? Styles.h2AR : ""}`}>
          {language === "en" ? "Latest Products :" : ": أحدث المنتجات"}
        </h2>
        <article className={Styles.products}>
          {loading ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "20vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontWeight: "700",
                }}
              >
                <Loading />
              </p>
            </div>
          ) : (
            products.slice(0, 4).map((product, index) => (
              <Reveal key={index}>
                <div className={Styles.oneCart}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "background-color 0.5s, opacity 0.3s",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    to={`/product/${product.slug}`}
                    key={product._id}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f8f8";
                      e.currentTarget.style.opacity = 0.8;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.opacity = 0.8;
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_IMAGE_PATH}${product.image}`}
                      className={Styles.imgCart}
                      alt={product.slug}
                    />
                    <div>
                      <section
                        className={`${Styles.infoCart} ${
                          language === "ar" ? Styles.infoCartAR : ""
                        }`}
                      >
                        <strong style={{ fontSize: "25px" }}>
                          {language === "en"
                            ? `${product.name}`
                            : `${product.name_AR}`}
                        </strong>
                        {language === "en"
                          ? `${product.category.name}`
                          : `${product.category.name_AR}`}
                        <p style={{ fontSize: "20px", color: "#c86823" }}>
                          ${product.price}
                        </p>
                      </section>
                    </div>
                  </Link>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={isProductInCart(product._id)}
                    onClick={() => addToCart(product)}
                    sx={{
                      bgcolor: "#C86823",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      "&:hover": {
                        bgcolor: "#A0471D",
                        color: "white",
                      },
                      textTransform: "none",
                      fontSize: "1.1rem",
                    }}
                  >
                    {isProductInCart(product._id) ? (
                      "Already in Cart"
                    ) : (
                      <>
                        <AddShoppingCartIcon />
                        {language === "en" ? "Add to cart" : "أضف إلى السلة"}
                      </>
                    )}{" "}
                  </Button>
                </div>
              </Reveal>
            ))
          )}
        </article>
        <article className={Styles.chooseUsContainer}>
          <div className={Styles.chooseUsWraper}>
            <section className={Styles.chooseUsLeft}>
              {language === "en"
                ? "What you will get from one click with us"
                : "ما سوف تحصل عليه من خلال نقرة واحدة معنا"}
            </section>
            <section className={Styles.chooseUsRight}>
              <ChooseUs />
            </section>
          </div>
        </article>

        <h2 className={`${Styles.h2} ${language === "ar" ? Styles.h2AR : ""}`}>
          {language === "en" ? "Latest Blogs :" : ": أحدث المدونات"}
        </h2>
        <article className={Styles.Blogs}>
          {isBlogPending ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "20vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontWeight: "700",
                }}
              >
                <Loading />
              </p>
            </div>
          ) : isBlogError ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "20vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "red",
                  fontWeight: "700",
                }}
              >
                An Error Occured
              </p>
            </div>
          ) : (
            blogData.map((item, index) => {
              return (
                <BlogCard
                  key={index}
                  title={item.title_en}
                  image={item.image}
                  description={item.description_en}
                  slug={item.slug}
                />
              );
            })
          )}
        </article>
        <article>
          <h2
            className={`${Styles.h2} ${language === "ar" ? Styles.h2AR : ""}`}
          >
            {language === "en" ? "Our Clients :" : ": زبائننا"}
          </h2>
          <Clients data={clients} />
        </article>
      </main>
    </div>
  );
};

export default Home;
