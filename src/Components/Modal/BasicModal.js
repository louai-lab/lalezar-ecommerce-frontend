import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Styles from "./BasicModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  //   border: "2px solid #000",
  boxShadow: 2,
  p: 4,
};

export default function BasicModal({ handleDeleteComment }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Delete</Button> */}
      <button
        type="button"
        onClick={handleOpen}
        // style={{ all: "unset", cursor: "pointer" }}
        className={Styles.buttonStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          viewBox="0 0 24 24"
          //   {...props}
        >
          <path
            fill="#f00a0a"
            d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"
          ></path>
        </svg>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to Delete this Comment?
          </Typography>
          <div
            style={{
              display: "flex",
              columnGap: "20px",
              marginTop: "10px",
            }}
          >
            <Button
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
              onClick={handleDeleteComment}
            >
              Confirm
            </Button>
            <Button
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
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
