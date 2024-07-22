import React, { useState } from "react";
import Table from "../../Components/Table/Table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StyleDashCategories from "./DashCategories.module.css";
import { FormControl, TextField, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCategoriesStore } from "../../Zustand/Store";

function DashCategories() {
  const [isAddPopUp, setIsAddPopUp] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isDeletePopUp, setIsDeletePopUp] = useState(false);
  const [isEditPopUp, setIsEditPopUp] = useState(false);

  const { loading, categories } = useCategoriesStore();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
  };

  const [formData, setFormData] = useState({
    name: "",
    name_AR: "",
  });

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    // Check if the input type is file for handling images
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
        });
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : e.target.value,
      }));
    }
  };

  const handleOpenPopUp = () => {
    setIsAddPopUp(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}categories/create`,
        formData
      );
      if (response) {
        useCategoriesStore.setState((state) => ({
          categories: [response.data, ...state.categories],
        }));
        toast.success(`the Category added successfuly 😍`);
        setFormData({
          name: "",
          name_AR: "",
        });
        setIsAddPopUp(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error adding Category 😢`);
    }
  };

  const handleOpen = (selectedRowData) => {
    // console.log("hi")
    // console.log(selectedRowData._id)
    setIsDeletePopUp(true);
  };

  const handleClose = () => setIsDeletePopUp(false);

  const handleDelete = async (selectedRowData) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}categories/delete/${selectedRowData._id}`
      );

      if (response) {
        useCategoriesStore.setState((state) => ({
          categories: state.categories.filter(
            (category) => category._id !== selectedRowData._id
          ),
        }));
        toast.success(`The Category deleted successfuly`);
        setIsDeletePopUp(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting Category 😢`);
    }
  };

  const handleEditOpen = (selectedRowData) => {
    setIsEditPopUp(true);
    setFormData({
      name: selectedRowData.name,
      name_AR: selectedRowData.name_AR,
    });
    // console.log("hi" , selectedRowData.image)
  };
  const handleEditClose = () => {
    setIsEditPopUp(false);
    setFormData({
      name: "",
      name_AR: "",
    });
  };

  const handleUpdate = async (selectedRowData) => {
    try {
      const updatedFormData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "image") {
          updatedFormData.append(key, formData[key]);
        }
      });

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}categories/update/${selectedRowData._id}`,
        formData
      );
      if (response) {
        useCategoriesStore.setState((state) => {
          const updatedCategory = state.categories.map((category) => {
            if (category._id === selectedRowData._id) {
              return response.data;
            }
            return category;
          });
          return {
            categories: updatedCategory,
          };
        });
        toast.success(`the Category updated successfuly`);
        setIsEditPopUp(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error updating Category`);
    }
  };

  return (
    <>
      {isAddPopUp && (
        <>
          <Box
            className={StyleDashCategories.addPopUp}
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
          >
            <h1 style={{ marginBottom: "15px", color: "#c86823" }}>
              Add Category
            </h1>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
              }}
            >
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Name_AR"
                  name="name_AR"
                  value={formData.name_AR}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button
                type="submit"
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
                Submit
              </Button>
              <Button
                onClick={() => setIsAddPopUp(false)}
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
                Cancel
              </Button>
            </form>
          </Box>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1002,
            }}
            onClick={() => setIsAddPopUp(false)}
          ></div>
        </>
      )}
      {isEditPopUp && (
        <>
          <Box
            className={StyleDashCategories.addPopUp}
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
          >
            <h1 style={{ marginBottom: "20px" }}>Edit a category</h1>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
              }}
            >
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  name="name"
                  // value={formData.name}
                  defaultValue={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Name_AR"
                  name="name_AR"
                  // value={formData.name_AR}
                  defaultValue={formData.name_AR}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button
                onClick={() => handleUpdate(selectedRowData)}
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
                Update
              </Button>
              <Button
                onClick={handleEditClose}
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
                Cancel
              </Button>
            </form>
          </Box>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1002,
            }}
            onClick={handleEditClose}
          ></div>
        </>
      )}
      {isDeletePopUp && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isDeletePopUp}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          // slotProps={{
          //   backdrop: {
          //     timeout: 500,
          //   },
          // }}
        >
          <Fade in={isDeletePopUp}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Are you sure to Delete this Category?
              </Typography>
              <span style={{ color: "red" }}>
                Because of this action, you will have products without Category.
              </span>
              <Button
                onClick={() => handleDelete(selectedRowData)}
                sx={{
                  bgcolor: "#C86823",
                  color: "white",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#A0471D",
                    color: "white",
                  },
                }}
              >
                Confirm
              </Button>
              <Button
                onClick={handleClose}
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
                Cancel
              </Button>
            </Box>
          </Fade>
        </Modal>
      )}
      <div
        style={{
          marginLeft: "5rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            mb: 5,
            mt: "2rem",
            fontWeight: "bold",
          }}
        >
          Manage Categories
        </Typography>
        <Button
          onClick={handleOpenPopUp}
          endIcon={<AddIcon />}
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
          Add Category
        </Button>
        <Table
          data={categories}
          ForWhat={"categories"}
          isEdit={true}
          handleEditOpen={handleEditOpen}
          setSelectedRowData={setSelectedRowData}
          handleOpenDelete={handleOpen}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default DashCategories;
