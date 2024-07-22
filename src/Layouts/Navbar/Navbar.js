import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Styles from "./Navbar.module.css";
import logo from "../../Assets/logo.svg";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AuthContext } from "../../Context/AuthContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CartContext } from "../../Context/CartContext";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "../../Utils/LanguageContext";

function Navbar() {
  const [collapesed, setCollapsed] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { cartItemCount, setCartItemCount } = useContext(CartContext);
  const [profOpen, setProfileOpen] = useState(false);

  const { language } = useLanguage();

  // console.log(cartItemCount)

  // nav with active
  const navigate = useNavigate();
  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 960) {
        setCollapsed(false);
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const toggleClasses = [
    Styles.linksWrapperMobile,
    collapesed ? Styles.activeNav : "",
  ].join(" ");
  const bar1 = [Styles.line1, collapesed ? Styles.a : ""].join(" ");
  const bar2 = [Styles.line2, collapesed ? Styles.a : ""].join(" ");
  const bar3 = [Styles.line3, collapesed ? Styles.a : ""].join(" ");

  // Go to Login Page
  const goToLoginPage = () => {
    navigate("/login");
    setCollapsed(false);
  };

  // Go to Sign Up Page
  const goToSignUpPage = () => {
    navigate("/SignUp");
    setCollapsed(false);
  };

  // Go to cart page
  const goToCardPage = () => {
    navigate("/cart");
    setCollapsed(false);
  };

  return (
    <section className={Styles.heroSection}>
      <header className={Styles.header}>
        <nav className={Styles.navBar}>
          <NavLink
            to="/"
            // onClick={() => handleLinkClick(0, "/home")}
            className={Styles.logoContainer}
            aria-label="Go to homepage"
          >
            <img src={logo} height={60} alt="Lalezar Logo" />
          </NavLink>

          <ul className={Styles.linksWrapperContainer}>
            <LanguageSwitcher />

            {/* Navbar beginning */}
            <ul className={Styles.linksWrapper}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  {language === "en" ? "Home" : "الصفحة الرئيسية"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  {language === "en" ? "Products" : "المنتجات"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Blogs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  {language === "en" ? "Blogs" : "المدونات"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ContactUs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  {language === "en" ? "Contact US" : "تواصل معنا"}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/AboutUs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? Styles.active : ""
                  }
                >
                  {language === "en" ? "About Us" : "حول"}
                </NavLink>
              </li>
              {/* <div className={Styles.languageSwitcher}>
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div> */}
            </ul>
            {/* Navbar Ending */}

            {/* SignUp LogIn beginning */}
            {!user && (
              <ul className={Styles.linksWrapper}>
                <li>
                  <Stack spacing={2} direction="row"> 
                    <Button
                      onClick={goToLoginPage}
                      variant="outlined"
                      sx={{
                        color: "#C86823",
                        borderColor: "#C86823",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#C86823",
                          backgroundColor: "#C86823",
                          color: "white",
                        },
                      }}
                    >
                      Log In
                    </Button>

                    <Button
                      onClick={goToSignUpPage}
                      variant="contained"
                      sx={{
                        bgcolor: "#C86823",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "#A0471D",
                          color: "white",
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </li>
              </ul>
            )}
            {user && (
              <div className={Styles.profileWrapper}>
                <Button
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={() => setProfileOpen(!profOpen)}
                  variant="contained"
                  sx={{
                    bgcolor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    height: "2.2rem",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#A0471D",
                      color: "white",
                    },
                  }}
                >
                  {language === "en" ? "My Profile" : "صفحتي الشخصية"}
                </Button>
                {profOpen === true && (
                  <div className={Styles.profileDiv}>
                    <ul className={Styles.profile}>
                      {user.role === "Admin" && (
                        <li className={Styles.profileLi}>
                          <Button
                            variant="outlined"
                            onClick={() => navigate("/dashboard")}
                            sx={{
                              padding: "0.7rem 1.5rem",
                              borderColor: "transparent",
                              textTransform: "none",
                              color: "#C86823",
                              ":hover": {
                                borderColor: "transparent",
                              },
                            }}
                          >
                            {language === "en" ? "Dashboard" : "لوحة التحكم"}
                          </Button>
                        </li>
                      )}
                      <li className={Styles.profileLi}>
                        <Button
                          variant="outlined"
                          onClick={() => navigate("/profile")}
                          sx={{
                            padding: "0.7rem 1.5rem",
                            borderColor: "transparent",
                            color: "#C86823",
                            textTransform: "none",
                            width: "100%",
                            ":hover": {
                              borderColor: "transparent",
                            },
                          }}
                        >
                          {language === "en" ? "Profile" : "حسابي"}
                        </Button>
                      </li>
                      <li className={Styles.profileLi}>
                        <Button
                          variant="outlined"
                          onClick={() => logOut()}
                          sx={{
                            padding: "0.7rem 1.5rem",
                            borderColor: "transparent",
                            color: "#C86823",
                            textTransform: "none",
                            width: "100%",
                            ":hover": {
                              borderColor: "transparent",
                            },
                          }}
                        >
                          {language === "en" ? "Logout" : "تسجيل خروج"}
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            {/* SignUp LogIn ending */}
            <ul
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "10px",
                // backgroundColor:"blue"
              }}
            >
              <li style={{ listStyle: "none" }}>
                {/* Badge beginning */}

                <IconButton
                  aria-label="cart"
                  onClick={goToCardPage}
                  sx={{
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                >
                  <Badge
                    badgeContent={cartItemCount}
                    color="secondary"
                    sx={{
                      color: "black",
                      "& .MuiBadge-badge": { bgcolor: "#C86823" },
                      "& .MuiBadge-badge:hover": {
                        bgcolor: "#A0471D",
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </li>
            </ul>
          </ul>

          {/* ///////////////
          /////////////////

          this for burger 
          
          /////////////////
          ////////////*/}

          <ul className={toggleClasses}>
            <li>
              <NavLink
                to="/"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                {language === "en" ? "Home" : "الصفحة الرئيسية"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                {language === "en" ? "Products" : "المنتجات"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Blogs"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                {language === "en" ? "Blogs" : "المدونات"}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ContactUs"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                {language === "en" ? "Contact US" : "تواصل معنا"}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/AboutUs"
                onClick={() => setCollapsed(false)}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? Styles.active : ""
                }
              >
                {language === "en" ? "About Us" : "حول"}
              </NavLink>
            </li>
            {/* 
            <li>
              <div className={Styles.languageSwitcher}>
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </li> */}

            {!user && (
              <li>
                <Stack
                  direction="row"
                  sx={{
                    flexDirection: "column",
                    rowGap: "30px",
                    margin: "0 20px",
                  }}
                >
                  <Button
                    onClick={goToLoginPage}
                    variant="outlined"
                    sx={{
                      color: "#C86823",
                      borderColor: "#C86823",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#C86823",
                        backgroundColor: "#C86823",
                        color: "white",
                      },
                    }}
                  >
                    Log In
                  </Button>

                  <Button
                    onClick={goToSignUpPage}
                    variant="contained"
                    sx={{
                      bgcolor: "#C86823",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#A0471D",
                        color: "white",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </li>
            )}
            {user && (
              <li className={Styles.profileWrapper2}>
                <Button
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={() => setProfileOpen(!profOpen)}
                  variant="contained"
                  sx={{
                    bgcolor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    height: "2.2rem",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#A0471D",
                      color: "white",
                    },
                  }}
                >
                  {language === "en" ? "My Profile" : "صفحتي الشخصية"}
                </Button>
                {profOpen === true && (
                  <div className={Styles.profileDiv2}>
                    <ul className={Styles.profile2}>
                      {user.role === "Admin" && (
                        <li className={Styles.profileLi2}>
                          <Button
                            variant="outlined"
                            onClick={() => navigate("/dashboard")}
                            sx={{
                              padding: "1.5rem 1.5rem",
                              borderColor: "transparent",
                              height: "2rem",
                              color: "#C86823",
                              ":hover": {
                                borderColor: "transparent",
                              },
                              textTransform: "none",
                            }}
                          >
                            {language === "en" ? "Dashboard" : "لوحة التحكم"}
                          </Button>
                        </li>
                      )}
                      <li className={Styles.profileLi2}>
                        <Button
                          variant="outlined"
                          onClick={() => navigate("/profile")}
                          sx={{
                            padding: "1.5rem 1.5rem",
                            height: "2rem",
                            borderColor: "transparent",
                            color: "#C86823",
                            ":hover": {
                              borderColor: "transparent",
                            },
                            textTransform: "none",
                          }}
                        >
                          {language === "en" ? "Profile" : "حسابي"}
                        </Button>
                      </li>
                      <li className={Styles.profileLi2}>
                        <Button
                          variant="outlined"
                          onClick={() => logOut()}
                          sx={{
                            padding: "1.5rem 1.5rem",
                            height: "2rem",
                            borderColor: "transparent",
                            color: "#C86823",
                            ":hover": {
                              borderColor: "transparent",
                            },
                            textTransform: "none",
                          }}
                        >
                          {language === "en" ? "Logout" : "تسجيل خروج"}
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
          <div
            className={Styles.burgerButton}
            onClick={() => setCollapsed(!collapesed)}
          >
            <div className={bar1}></div>
            <div className={bar2}></div>
            <div className={bar3}></div>
          </div>
        </nav>
      </header>
    </section>
  );
}

export default Navbar;
