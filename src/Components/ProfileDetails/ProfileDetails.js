import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useLanguage } from "../../Utils/LanguageContext";

const ProfileDetails = ({ userData }) => {
  const { language } = useLanguage();

  const formatDate = (date) => {
    const formattedDate = dayjs(date).format("DD-MM-YYYY");
    return formattedDate;
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        width: "100%",
        mb: "2rem",
        borderRadius: "10px",
        padding: "2.3rem 0 0 0",
        display: "flex",
        flexDirection: "column",
        zIndex: 0,
      }}
    >
      <Typography
        component="h3"
        variant="h3"
        fontSize="1.1rem"
        lineHeight="2.7rem"
        borderBottom="1px solid rgba(0, 0, 0, 0.12)"
      >
        <p
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            color: "#C86823",
            borderBottom: "2px solid #C86823",
            // display: "flex",
            height: "100%",
            // width: "fit-content",
            textAlign: language === "ar" ? "right" : "left", // Conditional text alignment
          }}
        >
          {language === "en" ? "User Details" : "بيانات المستخدم"}
        </p>
      </Typography>
      <Stack>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
          sx={{
            display: language === "ar" ? "flex" : "initial",
            flexDirection: language === "ar" ? "row-reverse" : "initial",
            columnGap: language === "ar" ? "5px" : "initial",
            pr: language === "ar" ? "1rem" : "0",
          }}
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            {language === "en" ? "First Name :" : ": الإسم الأول"}{" "}
          </span>{" "}
          {userData && userData.firstName}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
          sx={{
            display: language === "ar" ? "flex" : "initial",
            flexDirection: language === "ar" ? "row-reverse" : "initial",
            columnGap: language === "ar" ? "5px" : "initial",
            pr: language === "ar" ? "1rem" : "0",
          }}
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            {language === "en" ? "Last Name :" : ": الإسم الأخير"}{" "}
          </span>{" "}
          {userData && userData.lastName}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
          sx={{
            display: language === "ar" ? "flex" : "initial",
            flexDirection: language === "ar" ? "row-reverse" : "initial",
            columnGap: language === "ar" ? "5px" : "initial",
            pr: language === "ar" ? "1rem" : "0",
          }}
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            {language === "en" ? "Email :" : ": البريد الإلكتروني"}{" "}
          </span>{" "}
          {userData && userData.email}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
          sx={{
            display: language === "ar" ? "flex" : "initial",
            flexDirection: language === "ar" ? "row-reverse" : "initial",
            columnGap: language === "ar" ? "5px" : "initial",
            pr: language === "ar" ? "1rem" : "0",
          }}
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            {language === "en" ? "Phone :" : ": رقم الهاتف"}{" "}
          </span>{" "}
          {userData && userData.phoneNumber}
        </Typography>
        <Typography
          variant="p"
          component="p"
          fontSize="1rem"
          mb="1.2rem"
          mt="1rem"
          pl="1rem"
          sx={{
            display: language === "ar" ? "flex" : "initial",
            flexDirection: language === "ar" ? "row-reverse" : "initial",
            columnGap: language === "ar" ? "5px" : "initial",
            pr: language === "ar" ? "1rem" : "0",
          }}
        >
          <span
            style={{
              fontWeight: "600",
            }}
          >
            {language === "en" ? "Joined Since :" : ": إنضم منذ"}{" "}
          </span>{" "}
          {userData && formatDate(userData.createdAt)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProfileDetails;
