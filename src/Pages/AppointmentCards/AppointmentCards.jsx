import React from "react";
import "./Appointmentcards.css";
import { useState } from "react";
import SingleAppointment from "../../components/SingleAppointment/SingleAppointment";

import { Typography, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useEffect } from "react";

// import './Task.css'
const AppointmentCards = (props) => {
  const [loading, setloading] = useState(false);
  const [isDoctor,setIsDoctor]=useState(false)
  const [selectedDoctor,setSelectedDoctor]=useState(null)
const user = JSON.parse(localStorage.getItem('Profile'));

 const [specializationFilter, setSpecializationFilter] = useState("");
  const [modeFilter, setModeFilter] = useState("");

  // Filter tasks based on selected specialization and mode
  const filteredTasks = props.tasks?.filter((task) => {
    const specializationMatch = specializationFilter ? task.specialization === specializationFilter : true;
    const modeMatch = modeFilter ? task.modes?.includes(modeFilter) : true;
    return specializationMatch && modeMatch;
  });

  // Check if user is doctor and select doctor object when tasks arrive
  useEffect(() => {
    console.log(props?.tasks)
    if (!user) return;

    if (user?.result?.specialization) {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
      return;
    }
    if (typeof(props?.tasks)!=='undefined' && props?.tasks?.length > 0) {
      const filtered = props.tasks.filter((d) => d._id === user.result._id);
      setSelectedDoctor(filtered[0] || null);
    }
  }, [props?.tasks, user]);
const specializations = [...new Set(props.tasks?.map((t) => t.specialization))];
  const modes = ["Online","Offline"];
  return (
    <>
    { 
    !isDoctor?(
      <div className="container mt-4">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", color: "#2c3e50" }}
        >
          Welcome to Doctor Booking
        </Typography>
 {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Specialization</InputLabel>
          <Select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            label="Specialization"
          >
            <MenuItem value="">All</MenuItem>
            {specializations.map((spec, idx) => (
              <MenuItem key={idx} value={spec}>{spec}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Mode</InputLabel>
          <Select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            label="Mode"
          >
            <MenuItem value="">All</MenuItem>
            {modes.map((m, idx) => (
              <MenuItem key={idx} value={m}>{m}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>



        {filteredTasks?.length > 0 && loading === false ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 3,
              mt: 3,
            }}
          >
           {filteredTasks.map((task, index) => (
    <Box key={index} sx={{ position: "relative" }}>
      <SingleAppointment task={task} currentUser={props.currentUser} />
      
      {task.slots.length === 0 && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bgcolor: "error.main",
            color: "white",
            px: 1,
            borderRadius: 1,
            fontSize: "0.7rem",
          }}
        >
          Doctor Not Logged In / Available
        </Typography>
      )}
    </Box>
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

):

/////////////////////////////////////////////////

 <div className="container mt-4">
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      sx={{ fontWeight: "bold", textAlign: "center", color: "#2c3e50" }}
    >
      Doctor Dashboard
    </Typography>

    <Box
      sx={{
        p: 3,
        mb: 3,
        bgcolor: "primary.light",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Doctor Details
      </Typography>
      <Typography>Name: {selectedDoctor?.name}</Typography>
      <Typography>Email: {selectedDoctor?.email}</Typography>
      <Typography
        variant="subtitle2"
        sx={{ mt: 1, color: "green", fontWeight: "bold" }}
      >
        Doctor has logged in
      </Typography>
    </Box>

    {selectedDoctor?.slots?.length > 0 ? (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: 3,
        }}
      >
        {selectedDoctor?.slots.map((task, index) => (
          <Box key={index} sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, width: 250 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              StartTime: {task?.startTime}
              Endtime: {task?.startTime}

            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: task?.slots?.length === 0 ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              { task.status }

             

            </Typography>
             {
                task.status=='booked'?
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              BookedBy: {task?.phoneNumber}

            </Typography>:""
              }
          </Box>
        ))}
      </Box>
    ) : (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "gray" }}>
        No Slots Available
      </Typography>
    )}
  </div>


}
    </>
  );
};

export default AppointmentCards;
