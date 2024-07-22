import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import TextField from "@mui/material/TextField";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";
import { LoadingButton } from "@mui/lab";
import axiosInstance from "../../Utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useLanguage } from "../../Utils/LanguageContext";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { name, email, phone, message } = formData;

  const { language } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const showToast = (message) => {
    toast.success(message, {
      position: "top-left",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/gmail", formData);
      if (response) {
        showToast(`Your email sent successfully to Lalezar`);
        resetForm();
      }
    } catch (error) {
      console.log("Error ocured");
    }
  };

  return (
    <div className={styles.contactPage}>
      <ToastContainer />
      <h1
        className={`${styles.title} ${language === "ar" ? styles.titleAR : ""}`}
      >
        {language === "en" ? "Contact Us" : "تواصل معنا"}
      </h1>
      <main
        className={`${styles.contactContainer} ${
          language === "ar" ? styles.contactContainerAR : ""
        }`}
      >
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.contactForm}>
            <div className={styles.inputsHolder}>
              <TextField
                required
                fullWidth
                helperText={
                  language === "en"
                    ? "Please enter your full name"
                    : "من فضلك ادخل اسمك الكامل"
                }
                label={language === "en" ? "Name" : "الإسم"}
                id="outlined-basic"
                name="name"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                value={name}
                sx={{
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #C86823 ",
                  },
                  "& .MuiInputLabel-root.Mui-focused ": {
                    color: "#C86823 ",
                  },
                }}
              />
              <TextField
                required
                fullWidth
                helperText={
                  language === "en"
                    ? "Please Ensure it's a valid email"
                    : "يرجى التأكد من أنه بريد إلكتروني صالح"
                }
                label={language === "en" ? "Email" : "بريد إلكتروني"}
                id="outlined-basic"
                variant="outlined"
                name="email"
                onChange={(e) => handleChange(e)}
                value={email}
                sx={{
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #C86823 ",
                  },
                  "& .MuiInputLabel-root.Mui-focused ": {
                    color: "#C86823 ",
                  },
                }}
              />
              <TextField
                required
                fullWidth
                id="outlined-basic"
                helperText={
                  language === "en"
                    ? "Please enter number plus Country Code"
                    : "الرجاء إدخال الرقم بالإضافة إلى رمز البلد"
                }
                label={language === "en" ? "Phone" : "الهاتف"}
                variant="outlined"
                name="phone"
                onChange={(e) => handleChange(e)}
                value={phone}
                sx={{
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #C86823 ",
                  },
                  "& .MuiInputLabel-root.Mui-focused ": {
                    color: "#C86823 ",
                  },
                }}
              />
            </div>
            <div className={styles.msgHolder}>
              <TextField
                required
                id="outlined-multiline-static"
                label={language === "en" ? "Message" : "رسالتك"}
                multiline
                rows={10}
                variant="outlined"
                name="message"
                onChange={(e) => handleChange(e)}
                value={message}
                sx={{
                  width: "100%",
                  height: "90%",
                  "& .Mui-focused > .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #C86823 !important",
                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #C86823",
                    height: "100%",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#C86823",
                  },
                }}
              />
            </div>
            <div
              className={`${styles.btnHolder} ${
                language === "ar" ? styles.btnHolderAR : ""
              }`}
            >
              {loading ? (
                <LoadingButton />
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#A0471D",
                      color: "white",
                    },
                  }}
                >
                  {language === "en" ? "Send Message" : "أرسل"}
                </Button>
              )}
            </div>
            {error ? <p>An error occured, email wasn't sent</p> : ""}
          </div>
        </form>
        <section className={styles.contactNb}>
          <article
            className={`${styles.callUs} ${
              language === "ar" ? styles.callUsAR : ""
            }`}
          >
            <div className={styles.contactTitles}>
              <span className={styles.imgHolder}>
                {" "}
                <CallIcon />{" "}
              </span>{" "}
              <h4
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                {language === "en" ? "Call To Us" : "إتصل بنا"}
              </h4>
            </div>
            <p className={styles.textHolder}>
              {" "}
              <span className={styles.imgHolderX}> </span>
              {language === "en"
                ? "We are available 7 days a week"
                : "نحن متواجدون 7 أيام في الأسبوع."}
            </p>
            <p className={styles.textHolder}>
              {language === "en" ? "Phone:" : "الهاتف"} +961000000
            </p>
          </article>
          <article
            className={`${styles.msgUs} ${
              language === "ar" ? styles.msgUsAR : ""
            }`}
          >
            <div className={styles.contactTitles}>
              <span className={styles.imgHolder}>
                {" "}
                <MailOutlineIcon />{" "}
              </span>{" "}
              <h4
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                {language === "en" ? "Write To Us" : "اكتب لنا"}
              </h4>
            </div>
            <p className={styles.textHolder}>
              {" "}
              <span className={styles.imgHolderX}> </span>
              {language === "en"
                ? "Fill out our form and we will contact you within 24 hours"
                : "املأ النموذج الخاص بنا وسوف نتصل بك خلال 24 ساعة"}
            </p>
            <p className={styles.textHolder}>
              {language == "en" ? "Emails:" : "رسائل البريد الإلكتروني:"}{" "}
              customer@exclusive.com
            </p>
            <p className={styles.textHolder}>
              {language == "en" ? "Emails:" : "رسائل البريد الإلكتروني:"}{" "}
              support@exclusive.com
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;
