import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { addBook, getBook, setUser } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MenuItem } from '@mui/material';

import { format } from "date-fns";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const allstatus = ["Completed", "In Progress", "Started"]; // Categories for the dropdown
  const categories = ["Work", "Personal", "Learning", "Other"]; // Categories for the dropdown
  const priorities = ["Medium", "High", "Low"]; // Categories for the dropdown
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const test = false;
  const genres = ['Fiction', 'Non-Fiction', 'Romance', 'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Biography'];

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskTitle: "",
    priority: "Medium",
    duedate: "",
    taskdetails: "",
    taskstartedAt: new Date().toLocaleString(),
    taskendedAt: "",
    taskprogress: 0,
    taskstatus: "Started",
    taskCategories: "",
    username: "",
    userid: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userdata = JSON.parse(localStorage.getItem("Profile"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch(setUser(null));
    localStorage.removeItem("Profile");

    navigate("/Login");
  };

  const handletitleChange = (e) => {
    // dispatch(setUser(null))
    // dispatch(getBook(userdata))

    if (e.target.value !== "") {
      let taskupdated = props.duptasks.filter((d) =>
        d.taskTitle.includes(e.target.value)
      );
      // dispatch(setTaskNull())
      // dispatch(setTask(taskupdated));
    } else {
      // dispatch(setTaskNull())
      // dispatch(setTask(props.duptasks));
    }
  };

  const handleCategoriesChange = (e) => {
    // let userdata=JSON.parse(localStorage.getItem('Profile'))
    // dispatch(getBook(userdata))
    if (e.target.value !== "") {
      let taskupdated = props.duptasks.filter((d) =>
        d.taskstatus.includes(e.target.value)
      );

      // dispatch(setTask(taskupdated));
    } else {
      // dispatch(setTask(props.duptasks));
    }
  };

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    // setSelectedDateTime(inputDate);

    // Format the date into "MM/DD/YYYY, hh:mm:ss A"
    if (inputDate) {
      const formatted = format(new Date(inputDate), "M/d/yyyy, h:mm:ss a");
      setFormData({ ...formData, duedate: formatted });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // formData["username"] =
    //   props?.userInfo !== null ? props.userInfo.user?.result?.username : "";
    // formData["userid"] =
    //   props?.userInfo !== null ? props?.userInfo?.user.result._id : "";

    dispatch(
      addBook(
        formData.author,
        formData.title,
        formData.year,
        formData.genre,
        formData.description
      )
    );
    handleClose();
  };

  const getId = () => {
    let ids = props.tasks.map((d) => d.id);
    return Math.max(...ids);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  return (
    <AppBar
      position="static"
      sx={{
        width: isMobile
          ? "180%"
          : isTablet
          ? "135%"
          : isLargeScreen
          ? "100%"
          : "100%",
        margin: "0 auto",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Book Store
        </Typography>
        {test ? (
          <>
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {props.userdata && (
                <>
                  <MenuItem>
                    <TextField
                      label="Task Title"
                      name="taskTitle"
                      size="small"
                      fullWidth
                      onChange={props.handletitleChange}
                      style={{ backgroundColor: "white" }}
                    />
                  </MenuItem>
                  <MenuItem>
                    <FormControl fullWidth>
                      <Select
                        value=""
                        onChange={props.handleCategoriesChange}
                        displayEmpty
                        size="small"
                        style={{ backgroundColor: "white" }}
                      >
                        <MenuItem value="" disabled>Select Status</MenuItem>
                        {props.allstatus.map((cat) => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MenuItem>
                  <MenuItem onClick={props.handleOpen}>Create Task</MenuItem>
                </>
              )}
              <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
            </Menu> */}
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {userdata !== null ? (
              <Button size="small" onClick={handleOpen} variant="contained">
                Add book
              </Button>
            ) : (
              ""
            )}
            {userdata !== null ? (
              <Button size="small" onClick={handleLogout} variant="contained">
                Logout
              </Button>
            ) : (
              ""
            )}
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Book</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <label>Title</label>

              <TextField
                label="title"
                name="title"
                fullWidth
                margin="normal"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <label>Author</label>

              <TextField
                name="author"
                fullWidth
                margin="normal"
                value={formData.author}
                onChange={handleChange}
                required
              />
              <label>Genre</label>

              <TextField
                select
                name="genre"
                label="Genre"
                fullWidth
                margin="normal"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </TextField>
              <label>Publish Year</label>

              <TextField
                name="year"
                fullWidth
                margin="normal"
                value={formData.year}
                onChange={handleChange}
                required
              />

              <label>Description</label>

              <TextField
                name="description"
                fullWidth
                margin="normal"
                value={formData.description}
                onChange={handleChange}
                required
              />

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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
