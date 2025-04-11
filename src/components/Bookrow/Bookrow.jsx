import React from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { addComment } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import {

  Button,

  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";

const Taskrow = (props) => {
  const navigate=useNavigate()
  const currentDate = new Date();
  const dueDate = new Date(props.task.duedate);
  const dispatch = useDispatch();
  const rating = ["1-star", "2-star", "3-star", "4-star", "5-star"];

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: props.currentUser.user.username || "",
    comment: "",
    rating: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.taskstatus == "Completed") {
      formData.taskendedAt = new Date().toISOString();
    }
    formData["bookid"] = props.task.id;
    dispatch(addComment(formData));
    handleClose();
  };



  return (
    <tr>
      <td>
        <td>{props.task.title}</td>
      </td>

  
      <td>{props.task.genre}</td>

      <td>
        {props.task.author}
        <br />
      </td>
      <td>
        {props.task.published_year}
        <br />
      </td>

      {/*  */}
      <td>
        <FaEdit
          size={24}
          onClick={handleOpen}
          variant="contained"
          style={{ cursor: "pointer", color: "blue", fontSize: "5px" }}
        >
          Edit Task
        </FaEdit>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <TextField
                name="username"
                fullWidth
                margin="normal"
                value={props.currentUser.user.username}
                // onChange={handleChange}
                disabled
                required
              />

              <label>Comment</label>
              <TextField
                name="comment"
                fullWidth
                margin="normal"
                value={formData.comment}
                onChange={handleChange}
                required
              />

              <label>Rating</label>
              <TextField
                select
                name="rating"
                fullWidth
                margin="normal"
                value={formData.rating}
                onChange={handleChange}
                required
              >
                {rating.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>

              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Save Changes
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </td>
      <td>
    <FaEye
      size={24}
      style={{ color: "blue", cursor: "pointer" }}
      onClick={() => navigate(`/viewcomments/${props.task.id}`)}
    />


  </td>
  <td>

  <FaEye
      size={24}
      style={{ color: "blue", cursor: "pointer" }}
      onClick={() => navigate(`/viewbook/${props.task.id}`)}
    />
  </td>
    </tr>
  );
};

export default Taskrow;
