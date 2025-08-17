import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, CardActions, Box, Divider} from "@mui/material";

const SingleAppointment = (props) => {
  const navigate=useNavigate()
  return (
      <Card
      sx={{
        maxWidth: 800,
        margin: "16px auto 16px 24px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        textAlign: "left",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
            {props.task.name}
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
            {props.task.specialization}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: "500" }}>
            Modes:{" "}
            <span style={{ fontWeight: "normal" }}>
              {props.task.modes.join(", ")}
            </span>
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
             {props.task.email}
          </Typography>

          <Typography
            variant="caption"
            sx={{ display: "block", mt: 1, color: "gray" }}
          >
            Joined on: {new Date(props.task.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
          >
            About Doctor
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            This is a test description about the doctor. You can add more details
            here, like experience, background, or achievements.
          </Typography>
        </Box>
      </Box>

      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => navigate(`/viewAppoints/${props.task._id}`)}
        >
          <FaEye style={{ marginRight: "6px" }} /> View Appointments
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="success"
          onClick={() => alert(`Booking appointment with ${props.task.name}`)}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default SingleAppointment;
