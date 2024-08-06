import React, { useContext, useEffect, useState, useRef } from "react";
import StyleProducts from "./Products.module.css";
import Icon from "@mui/icons-material/CategoryOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Reveal } from "../../RevealAnimation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { CartContext } from "../../Context/CartContext";
import { useProductsStore } from "../../Zustand/Store.js";
import { useCategoriesStore } from "../../Zustand/Store.js";
import { useLanguage } from "../../Utils/LanguageContext.js";
import { RevealLeft } from "../../RevealAnimationLeft.js";

const Products = () => {
  const debounceTimeout = useRef(null);
  const { increaseCartItem, setCartItems } = useContext(CartContext);
  const [searchInput, setSearchInput] = useState("");
  const { searchName, updateSearchName } = useProductsStore();

  const [currentPage, setCurrentPage] = useState(1);
  const { selectedPageNumber, updateSelectedPageNumber } = useProductsStore();
  const { selectedCategoriesId, updateSelectedCategoriesId } =
    useProductsStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sidePanelWidth, setSidePanelWidth] = useState(400);

  const { getAllProducts } = useProductsStore();
  const { loading, products, productCount } = useProductsStore();
  const { categories } = useCategoriesStore();

  const { language } = useLanguage();

  useEffect(() => {
    getAllProducts(selectedPageNumber, selectedCategoriesId, searchName);
  }, [getAllProducts, selectedPageNumber, selectedCategoriesId, searchName]);

  const handleSearchInputChange = (event, newValue) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (typeof newValue === "object" && newValue !== null) {
        setSearchInput(newValue.name || "");
        updateSearchName(newValue);
        // console.log("Selected object:", newValue);
      } else {
        setSearchInput(newValue || "");
        // console.log("Typed value:", newValue);
        updateSearchName(newValue);
      }
    }, 3000);
  };

  const updateSideBar = () => {
    if (window.innerWidth > 959) {
      setSidePanelWidth(400);
    } else if (window.innerWidth < 750) {
      setSidePanelWidth(400);
    } else {
      setSidePanelWidth(0);
    }
  };

  useEffect(() => {
    updateSideBar();
    window.addEventListener("resize", updateSideBar);
    return () => {
      window.removeEventListener("resize", updateSideBar);
    };
  }, []);

  const openNav = () => {
    setSidePanelWidth(400);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    updateSelectedCategoriesId(event.target.value);
  };

  const handleChangeEmpty = (event) => {
    setSelectedCategory("all");
    updateSelectedCategoriesId();
  };

  // Add To Cart Section
  const addToCart = (product) => {
    const currentItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = currentItems.find((item) => item.id === product._id);

    if (!existingItem) {
      const newItem = {
        id: product._id,
        name: product.name,
        name_AR: product.name_AR,
        price: product.price,
        quantity: 1,
        slug: product.slug,
        image: `${process.env.REACT_APP_IMAGE_PATH}${product.image}`,
        totalPrice: product.price,
      };

      currentItems.push(newItem);
      localStorage.setItem("cart", JSON.stringify(currentItems));
      showToast(
        language === "en"
          ? `${product.name} added successfully to your bag`
          : `${product.name_AR} تمت إضافتها بنجاح إلى حقيبتك`
      );
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

  // Toastify Section
  const showToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <Helmet>
        <title>Lalezar Spices - Exquisite Spice Collection</title>
        <meta
          name="description"
          content="Discover the artistry of handcrafted spices at Lalezar Spices. Elevate your culinary creations with our premium spices made with care and expertise."
        />
        <meta
          name="keywords"
          content="Lalezar Spices, spices, spice collection, gourmet spices, cooking, culinary, seasoning, premium spices, international spices, organic spices, handmade spices, exotic spices, spice blends, herbs, chili peppers, saffron, cumin, cardamom, paprika, curry powder, culinary herbs, artisanal spices, spice shop, online spice store"
        />
      </Helmet>
      <div className={StyleProducts.big}>
        <div
          id="mySidepanel"
          className={StyleProducts.sidepanel}
          style={{
            width: sidePanelWidth + "px",
            height: "100%",
          }}
        >
          <div>
            <section
              className={
                language == "en"
                  ? StyleProducts.sideBarTitle
                  : StyleProducts.sideBarTitleAr
              }
            >
              <Icon></Icon>
              <h1>{language === "en" ? "Categories" : "الفئات"}</h1>
            </section>
            {/* <Reveal> */}
            <section className={StyleProducts.searchArticle}>
              <RevealLeft>
                <h3 className={language === "en" ? "" : StyleProducts.find}>
                  {language === "en"
                    ? "Find what you're looking for"
                    : "اعثر على ما تبحث عنه"}
                </h3>

                <Stack
                  className={StyleProducts.stack}
                  sx={{ padding: "10px 0px" }}
                >
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    // options={products.map((product) => ({
                    //   name: product.name,
                    // }))}
                    options={[]}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        className={`${StyleProducts.searchInput}`}
                        {...params}
                        label={language === "en" ? "Search input" : "ابحث"}
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                    onChange={handleSearchInputChange}
                    onInputChange={handleSearchInputChange}
                  />
                </Stack>
              </RevealLeft>
            </section>
            {/* </Reveal> */}

            {/* <Reveal> */}
            <div
              className={
                language === "en"
                  ? StyleProducts.radioInput
                  : StyleProducts.radioInputAr
              }
            >
              <RevealLeft>
                <h3
                  style={{ padding: "0px 20px", marginBottom: "10px" }}
                  className={language === "en" ? "" : StyleProducts.categ}
                >
                  {language === "en" ? "Categories" : "الفئات"}
                </h3>
                <label
                  className={
                    language == "en"
                      ? StyleProducts.label
                      : StyleProducts.labelAr
                  }
                >
                  <input
                    type="radio"
                    id="all"
                    name="value-radio"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={handleChangeEmpty}
                  />
                  <p className={StyleProducts.text}>
                    {language === "en" ? "All" : "جميع الفئات"}
                  </p>
                </label>
                {loading ? (
                  <div className={StyleProducts.containerLoadingCata}>
                    <div className={StyleProducts.loadingIndicatorCata}></div>
                    <div className={StyleProducts.loadingIndicatorCata}></div>
                    <div className={StyleProducts.loadingIndicatorCata}></div>
                  </div>
                ) : (
                  categories.map((category) => (
                    <label
                      className={
                        language == "en"
                          ? StyleProducts.label
                          : StyleProducts.labelAr
                      }
                    >
                      <input
                        type="radio"
                        id={category._id}
                        name="value-radio"
                        value={category._id}
                        checked={selectedCategory === category._id}
                        onChange={handleChange}
                      />
                      <p className={StyleProducts.text}>
                        {language === "en"
                          ? `${category.name}`
                          : `${category.name_AR}`}
                      </p>
                    </label>
                  ))
                )}
              </RevealLeft>
            </div>
            {/* </Reveal> */}
          </div>
        </div>

        {sidePanelWidth === 400 ? (
          <span className={StyleProducts.openbtn} onClick={closeNav}>
            <ArrowBackIosIcon
              style={{
                color: "#c86823",
                borderRight: "1px solid rgb(110, 110, 110)",
              }}
            ></ArrowBackIosIcon>
          </span>
        ) : (
          <button className={StyleProducts.openbtn} onClick={openNav}>
            <ArrowForwardIosIcon
              style={{ color: "#c86823" }}
            ></ArrowForwardIosIcon>
          </button>
        )}

        <div className={StyleProducts.content}>
          <div className={StyleProducts.cartContainer}>
            {loading ? (
              <div className={StyleProducts.containerLoading}>
                <div className={StyleProducts.loadingIndicator}></div>
                <div className={StyleProducts.loadingIndicator}></div>
                <div className={StyleProducts.loadingIndicator}></div>
              </div>
            ) : (
              products.map((product) => (
                <Reveal key={product._id}>
                  <div className={StyleProducts.oneCart}>
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
                        className={StyleProducts.imgCart}
                        alt={product.name}
                      />
                      <div>
                        <section
                          className={`${StyleProducts.infoCart} ${
                            language === "ar" ? StyleProducts.infoCartAR : ""
                          }`}
                        >
                          <strong
                            style={{
                              fontSize: "20px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
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
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
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
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(productCount / 10)}
                page={currentPage}
                onChange={(event, page) => {
                  setCurrentPage(page);
                  updateSelectedPageNumber(page);
                }}
                variant="outlined"
                sx={{
                  "& .MuiPaginationItem-root:hover": {
                    bgcolor: "#c86823",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    bgcolor: "#c86823",
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Products;
