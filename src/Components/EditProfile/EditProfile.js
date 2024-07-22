import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import Styles from "./EditProfile.module.css";
import { ToastContainer, toast } from "react-toastify";

const EditProfile = ({ userData, refetchUser }) => {
  const [firstName, setFirstName] = useState(userData && userData.firstName);
  const [lastName, setLastName] = useState(userData && userData.lastName);
  const [image, setImage] = useState();
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(userData && userData.role);
  const [email, setEmail] = useState(userData && userData.email);
  const [phoneNumber, setPhoneNumber] = useState(
    userData && userData.phoneNumber
  );
  const [oldPassword, setOldPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(screenWidth < 900 ? "column" : "row");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      setDisplay(newWidth < 900 ? "column" : "row");
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setFirstName(userData && userData.firstName);
    setLastName(userData && userData.lastName);
    setRole(userData && userData.role);
    setEmail(userData && userData.email);
    setPhoneNumber(userData && userData.phoneNumber);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "role") {
      setRole(value);
    } else if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const conditionPassword = password !== null ? password : null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}user`,
        {
          firstName: firstName,
          lastName: lastName,
          image: image,
          password: conditionPassword,
          email: email,
          id: userData && userData._id,
          checkPassword: oldPassword,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        await refetchUser();
        toast.success(`Your personal info are updated successfully 😍`);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        width: "100%",
        padding: screenWidth < 380 ? "10px" : "2rem",
        mb: "5rem",
        borderRadius: "10px",
        boxShadow: "0 0 10px #BABABA",
        "& .MuiFormControl-root": {
          mt: 2,
          mb: 2,
          ml: 0,
          mr: 0,
          width:
            screenWidth < 380 ? "10rem" : screenWidth < 550 ? "15rem" : "20rem",
        },
        "& .MuiButton-containedPrimary": {
          bgcolor: "#C86823 !important",
          padding: 0,
          mt: 2,
          mb: 2,
          height: "3.5rem",
          width: screenWidth < 550 ? "15rem" : "20rem",
        },
        "& .MuiButton-containedPrimary:hover": {
          bgcolor: "#A0471D !important",
        },
        "& .MuiStack-root": {
          padding: 0,
          margin: 0,
        },
        "& .MuiButtonBase-root": {
          borderRadius: 0,
          bgcolor: "#C86823",
          padding: "15px",
        },
        "& .MuiButtonBase-root:hover": {
          bgcolor: "#A0471D",
        },
        "& .MuiOutlinedInput-notchedOutline ": {
          border: "1.5px solid  gray !important",
          borderRadius: "4px",
        },
        "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
          border: "2px solid #C86823 !important",
          borderRadius: "4px",
        },
        "& .MuiStack-root ": {
          width:
            screenWidth < 380 ? "10rem" : screenWidth < 500 ? "15rem" : "20rem",
          margin:
            screenWidth < 900 ? 0 : screenWidth < 1100 ? "0 3rem" : "0 5rem",
          alignItems: screenWidth < 550 ? "center" : "",
        },
        "& .MuiFormControl-root , & .MuiTextField-root , & .MuiInputBase-root":
          {
            width:
              screenWidth < 380
                ? "10rem"
                : screenWidth < 500
                ? "15rem"
                : "20rem",
            minWidth: "0 !important",
          },
        "& .Mui-focused.MuiFormLabel-root ": {
          color: "#C86823 !important",
        },
        ".MuiFormLabel-root": {
          fontSize: "1.1rem",
        },
      }}
      autoComplete="on"
    >
      <ToastContainer />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Loading...</Typography>
        </div>
      ) : (
        <form
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            flexDirection={display}
            sx={{
              justifyContent: screenWidth > 900 ? "space-around" : "center",
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              <TextField
                required
                id="outlined-required1"
                label="FirstName"
                placeholder="FirstName"
                name="firstName"
                onChange={handleChange}
                value={firstName}
                autoComplete="on"
              />
              <TextField
                required
                id="outlined-required2"
                label="LastName"
                placeholder="LastName"
                name="lastName"
                onChange={handleChange}
                value={lastName}
                autoComplete="on"
              />
              <TextField
                required
                id="outlined-required3"
                label="Email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={email}
                autoComplete="on"
              />
              <TextField
                required
                id="outlined-required3"
                label="Phone"
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                value={phoneNumber}
              />
              {screenWidth > 900 ? (
                <>
                  <span
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      width: "100%",
                      display: "flex",
                      justifyContent:
                        screenWidth > 900 ? "flex-start" : "center",
                    }}
                  >
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      startIcon={<EditIcon />}
                    >
                      Submit
                    </Button>
                  </span>
                </>
              ) : (
                ""
              )}
            </Stack>
            <Stack
              sx={{
                alignItems: "center",
              }}
            >
              <FormControl
                required
                disabled
                sx={{
                  m: 1,
                  "& .MuiSvgIcon-root": {
                    color: "white",
                    "& .MuiList-root": {
                      bgcolor: "transparent",
                    },
                  },
                }}
              >
                <InputLabel htmlFor="demo-simple-select-required">
                  Role
                </InputLabel>
                <Select
                  id="demo-simple-select-required"
                  value={role}
                  label="Role *"
                  name="role"
                  onChange={handleChange}
                >
                  <MenuItem disabled>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Acountant"}>User</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password1">
                  Old Password*
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password1"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        style={{ color: "white" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Old Password"
                  name="oldPassword"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password2">
                  New Password*
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password2"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        style={{ color: "white" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <input
                  className={Styles.input}
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{
                    width:
                      screenWidth < 380
                        ? "10rem"
                        : screenWidth < 550
                        ? "15rem"
                        : "20rem",
                  }}
                />
              </FormControl>
            </Stack>
            {screenWidth < 900 ? (
              <>
                <span
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: screenWidth > 900 ? "flex-start" : "center",
                  }}
                >
                  {loading ? (
                    <LoadingButton loading variant="contained" />
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      type="submit"
                      color="primary"
                      size="large"
                      startIcon={<EditIcon />}
                    >
                      Submit
                    </Button>
                  )}
                </span>
              </>
            ) : (
              ""
            )}
          </Stack>
        </form>
      )}
    </Box>
  );
};
export default EditProfile;
