import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ArabicIcon from "@mui/icons-material/Language";
import EnglishIcon from "@mui/icons-material/Language";
import styles from "./LanguageSwitcher.module.css";

import { useLanguage } from "../../Utils/LanguageContext";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    if (newLanguage !== language) {
      toggleLanguage();
    }
  };

  return (
    <FormControl className={styles.formControl}>
      {/* <InputLabel id="language-select-label">Language</InputLabel> */}
      <select
        labelId="language-select-label"
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        className={styles.select}
      >
        <option value="en" className={styles.option}>
          <EnglishIcon className={styles.icon} />
          English
        </option>
        <option value="ar" className={styles.option}>
          <ArabicIcon className={styles.icon} />
          عربي
        </option>
      </select>
    </FormControl>
  );
};

export default LanguageSwitcher;
