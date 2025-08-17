import React from "react";
import "./Appointmentcards.css";
import { useState } from "react";
import SingleAppointment from "../../components/SingleAppointment/SingleAppointment";
import { Typography, Box } from "@mui/material";

// import './Task.css'
const AppointmentCards = (props) => {
  const [loading, setloading] = useState(false);
  return (
    <>
      <div className="container mt-4">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", color: "#2c3e50" }}
        >
          Welcome to Doctor Booking
        </Typography>

        {props.tasks?.length > 0 && loading === false ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 3,
              mt: 3,
            }}
          >
            {props.tasks.map((task, index) => (
              <SingleAppointment
                key={index}
                task={task}
                currentUser={props.currentUser}
              />
            ))}
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 4, color: "gray" }}
          >
            No Doctors Available
          </Typography>
        )}
      </div>
    </>
  );
};

export default AppointmentCards;
