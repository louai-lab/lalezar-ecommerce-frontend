import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";
import DashSidebar from "../../Layouts/DashSidebar/DashSidebar";
import Navbar from "../../Layouts/Navbar/Navbar";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import ProfileActivity from "../../Components/ProfileActivity/ProfileActivity";
import ProfileDetails from "../../Components/ProfileDetails/ProfileDetails";
import EditProfile from "../../Components/EditProfile/EditProfile";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Utils/AxiosInstance";
import Loading from "../Loading/Loading";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [overview, setOverview] = useState(true);
  const [edit, setEdit] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  console.log(user);

  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOverview = () => {
    setOverview(true);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    setOverview(false);
  };

  const {
    isPending: isUserPending,
    error: userError,
    data: userData,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["UserData"],
    queryFn: async () => {
      try {
        if (user) {
          const response = await axiosInstance.post(
            `${process.env.REACT_APP_BACKEND_ENDPOINT}user/byId`,
            { id: user?.id }
          );
          return response.data;
        } else {
          // If user is not available, you might want to handle this case.
          // You can return a default value or handle it as needed.
          console.log("User not available");
          return null;
        }
      } catch (error) {
        console.log("Error fetching user", error);
        throw error;
      }
    },
  });

  if (isUserPending) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>
          <Loading />
        </h1>
      </div>
    );
  }

  if (userError) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>An error occured while fetching Data</h1>
      </div>
    );
  }

  const flex = screenWidth < 600 ? "column" : "row";
  const leftSpanWidth = screenWidth < 600 ? "100%" : "55%";
  const rightSpanWidth = screenWidth < 600 ? "100%" : "40%";
  const marginLeft = user && user.role !== "Customer" ? "4rem" : "0";
  const marginRight = user && user.role !== "Customer" ? "0.3rem" : "0";
  const marginTop = user && user.role !== "Customer" ? "3rem" : "7rem";
  return (
    <div
      style={{
        marginLeft: marginLeft,
        marginRight: marginRight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>Profile Settings</title>
        <meta
          name="description"
          content="Manage your profile settings and preferences within Hotel Xpress's dashboard.
             Update personal information, security settings, and customize your user experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="All Rooms Overview" />
        <meta
          property="og:description"
          content="VManage your profile settings and preferences within Hotel Xpress's dashboard.
            Update personal information, security settings, and customize your user experience."
        />
      </Helmet>
      {user && user.role !== "Customer" ? <DashSidebar /> : <Navbar />}
      <>
        <span
          style={{
            marginTop: marginTop,
            display: "flex",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <ProfileCard
            handleOverview={handleOverview}
            overview={overview}
            handleEdit={handleEdit}
            edit={edit}
            userData={userData && userData}
          />
        </span>
        {overview && (
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: flex,
              columnGap: "10%",
            }}
          >
            {user && user.role === "Customer" ? (
              <>
                <span
                  style={{
                    display: "flex",
                    boxShadow: "0 0 10px #BABABA",
                    width: leftSpanWidth,
                    borderRadius: "10px",
                    marginBottom: "2rem",
                  }}
                >
                  <ProfileActivity userData={userData && userData} />
                </span>
                <span
                  style={{
                    display: "flex",
                    boxShadow: "0 0 10px #BABABA",
                    width: rightSpanWidth,
                    borderRadius: "10px",
                    height: "22rem",
                  }}
                >
                  <ProfileDetails userData={userData && userData} />
                </span>
              </>
            ) : (
              <span
                style={{
                  display: "flex",
                  boxShadow: "0 0 10px #BABABA",
                  width: "100%",
                  borderRadius: "10px",
                  height: "22rem",
                }}
              >
                <ProfileDetails
                  userData={userData && userData}
                  width={"100%"}
                />
              </span>
            )}
          </div>
        )}
        {edit && (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              width: "90%",
            }}
          >
            <EditProfile
              refetchUser={() => refetchUser()}
              userData={userData && userData}
              setSuccessEdit={setSuccessEdit}
            />
          </span>
        )}
      </>
    </div>
  );
};
export default ProfilePage;
