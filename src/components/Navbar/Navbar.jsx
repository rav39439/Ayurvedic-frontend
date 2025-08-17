import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
import { setUser } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useMediaQuery } from "@mui/material";
import {
  getPastAppointmentsByPhone,
  getUpcomingAppointmentsByPhone,
} from "../../redux/Actions";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const test = false;
  const userdata = JSON.parse(localStorage.getItem("Profile"));

  const handlePast = (e) => {
    e.preventDefault();
    dispatch(
      getPastAppointmentsByPhone({ phone: userdata.result.phoneNumber })
    );
    navigate("/showAppointments/pastappointments");
  };

  const handleUpcoming = (e) => {
    e.preventDefault();
    dispatch(
      getUpcomingAppointmentsByPhone({ phone: userdata.result.phoneNumber })
    );
    navigate("/showAppointments/upcomingappointments");
  };

  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch(setUser(null));
    localStorage.removeItem("Profile");

    navigate("/Login");
  };

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
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ayurvedic Treatment
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
              <>
                <Button size="small" onClick={handlePast} variant="contained">
                  Past Appointments
                </Button>

                <Button
                  size="small"
                  onClick={handleUpcoming}
                  variant="contained"
                >
                  Upcoming Appointments
                </Button>
              </>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
