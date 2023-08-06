import PropTypes from "prop-types";
import Styles from "../styles/post.module.css";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";

import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import axios from "axios";
export default function AddReviewDialog(props) {
  const { onClose, open } = props;
  const [user_id, setid] = useState();
  const [token, setToken] = useState();
  const [IsLogin, setIsLogin] = useState(false);
  const [stars, setstars] = useState(0);
  const [comment, setcomment] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const [IsErr, setIsErr] = useState(false);
  const [IsSuccess, setIsSuccess] = useState(false);
  const [config, setconfig] = useState();

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    const IsLogin = localStorage.getItem("IsLogin");
    const token = localStorage.getItem("token");
    setid(id);
    setToken(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    setconfig(config);
    setIsLogin(IsLogin);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      comment,
      stars,
      user_id,
      Post_id: props?.post_id,
    };
    console.log(data);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API}/post/rating/${token}`, data)
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        setIsErr(false);
        setIsSuccess(true);
        setcomment("");
        setstars(0);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setIsErr(true);
        setIsSuccess(false);
      });
  }
  if (!IsLogin) {
    return (
      <Dialog className={Styles.model} onClose={onClose} open={open}>
        <div style={{ textAlign: "center" }}>
          <p>Sorry you need to login first</p>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </Dialog>
    );
  }
  return (
    <Dialog className={Styles.model} onClose={onClose} open={open}>
      <DialogTitle>Add Review</DialogTitle>
      <form onSubmit={(e) => onSubmit(e)} className={Styles.model}>
        <TextField
          size="small"
          label="Comment"
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
          required
        />
        <div className={Styles.Stars}>
          <IconButton onClick={() => setstars(1)}>
            {stars < 1 ? (
              <StarOutlineIcon className={Styles.Star} />
            ) : (
              <StarIcon className={Styles.Star} />
            )}
          </IconButton>
          <IconButton onClick={() => setstars(2)}>
            {stars < 2 ? (
              <StarOutlineIcon className={Styles.Star} />
            ) : (
              <StarIcon className={Styles.Star} />
            )}
          </IconButton>
          <IconButton onClick={() => setstars(3)}>
            {stars < 3 ? (
              <StarOutlineIcon className={Styles.Star} />
            ) : (
              <StarIcon className={Styles.Star} />
            )}
          </IconButton>
          <IconButton onClick={() => setstars(4)}>
            {stars < 4 ? (
              <StarOutlineIcon className={Styles.Star} />
            ) : (
              <StarIcon className={Styles.Star} />
            )}
          </IconButton>
          <IconButton onClick={() => setstars(5)}>
            {stars < 5 ? (
              <StarOutlineIcon className={Styles.Star} />
            ) : (
              <StarIcon className={Styles.Star} />
            )}
          </IconButton>
        </div>
        <Button
          type="submit"
          disabled={IsLoading}
          size="small"
          variant="contained"
        >
          Submit
        </Button>
        <p>{IsErr && "Something is wrong - try again"}</p>
        <p>{IsSuccess && "Review Added"}</p>
      </form>
    </Dialog>
  );
}

AddReviewDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  post_id: PropTypes.string.isRequired,
};

// export default function AddReviewDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <AddReviewDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
// }
