import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../Firebase";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import googleG from "../../Assets/G.png";
import useApi from "../../Hooks/UseApi";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLanguage } from "../../Utils/LanguageContext";

const OAuth = ({ isLogin }) => {
  const { apiCall, loading } = useApi();
  const { fetchUserData, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { language } = useLanguage();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log("result before api call", result.user.email);

      const response = await apiCall({
        url: `${process.env.REACT_APP_BACKEND_ENDPOINT}user/google`,
        method: "post",
        data: {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        },
      });

      if (response) {
        // console.log("response from backend", response);
        setUser(response);
        await fetchUserData();
      }
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingButton></LoadingButton>
      ) : (
        <Button
          variant="outlined"
          onClick={handleGoogleClick}
          startIcon={<img src={googleG} alt="googleImage" />}
          sx={{
            color: "black",
            textTransform: "none",
          }}
        >
          {isLogin
            ? language === "en"
              ? "Login with Google"
              : "تسجيل الدخول عبر جوجل"
            : language === "en"
            ? "Sign up with Google"
            : "قم بالتسجيل عبر جوجل"}
        </Button>
      )}
    </>
  );
};

export default OAuth;
