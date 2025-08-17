import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getdoctorsbyId } from "../../redux/Actions";
import {
  cancelandremove,
  rescheduleappointment,
} from "../../redux/Actions";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getUpcomingAppointmentsByPhone } from "../../redux/Actions";
import { getPastAppointmentsByPhone } from "../../redux/api";
const Appointments = () => {
  // fetch appointments from redux store

  const [pickerValue, setPickerValue] = useState(""); // local datetime for input
  const [selectedISO, setSelectedISO] = useState(""); // UTC ISO for storage
  const [todayMinMax, setTodayMinMax] = useState({ min: "", max: "" });
  const appointments = useSelector(
    (state) => state.appointmentsReducer.appointments
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
    const [pastSlot, setpastSlot] = useState(null);

  const [scheduledSlot, setScheduledSlot] = useState(null);

  const [selectedTime, setSelectedTime] = useState([]);
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("Profile"));

  const dispatch = useDispatch();
  const timeOptions = [];
  for (let h = 9; h <= 16; h++) {
    const hourLabel = h <= 12 ? `${h} AM` : `${h - 12} PM`;
    timeOptions.push(hourLabel);
  }

  const handleSelect = (e) => {
    setSelectedSlot(e.target.value);
    let mappedSlot = selectedTime.find(
      (s) => `${formatTime(s.start)} - ${formatTime(s.end)}` === e.target.value
    );
    setScheduledSlot(mappedSlot)
  };
  useEffect(() => {
    const now = new Date();
    now.setHours(9, 0, 0, 0);
    const pad = (num) => num.toString().padStart(2, "0");
    const yyyy = now.getFullYear();
    const mm = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());

    const minMaxDate = `${yyyy}-${mm}-${dd}T00:00`;
    const maxDate = `${yyyy}-${mm}-${dd}T23:59`;
    setTodayMinMax({ min: minMaxDate, max: maxDate });
    const defaultValue = `${yyyy}-${mm}-${dd}T09:00`;
    setPickerValue(defaultValue);
    const utcISO = now.toISOString().replace("Z", "+00:00");
    setSelectedISO(utcISO);
  }, []);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancel = async (slot) => {
    const result = await cancelandremove({
      slotId: slot.slotId,
      appid: slot._id,
    });

    if (params.id == "upcomingappointments") {
      dispatch(
        getUpcomingAppointmentsByPhone({ phone: user.result.phoneNumber })
      );
    } else {
      dispatch(getPastAppointmentsByPhone({ phone: user.result.phoneNumber }));
    }
    setOpenDialog(false);
  };

  const rechedule = async () => {
    console.log("sssssss")
    console.log(pastSlot)
    console.log(scheduledSlot)
    console.log({
      prevSlotId: pastSlot.slotId,
      newSlotTime: scheduledSlot.id,
      userPhone: user.result.phoneNumber,
    })
    const result = await rescheduleappointment({
     prevSlotId: pastSlot.slotId,
      newSlotTime: scheduledSlot.id,
      userPhone: user.result.phoneNumber,
    });
    if (params.id == "upcomingappointments") {
      dispatch(
        getUpcomingAppointmentsByPhone({ phone: user.result.phoneNumber })
      );
    } else {
      dispatch(getPastAppointmentsByPhone({ phone: user.result.phoneNumber }));
    }
    setOpenDialog(false);
    setOtp("");
  };
  const handleReschedule = async (appoint) => {
    setpastSlot(appoint);
    console.log(appoint)
    try {
      const d = await getdoctorsbyId(appoint.doctorId);
      // setappointmentdata(d.data);
      setSelectedTime(d.slots);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
    setOpenDialog(true);
  };
  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">No appointments found</p>
      </div>
    );
  }

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {appointments.map((appoint, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    <strong>Name:</strong> {user.result.username || "No Name"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Start:</strong>{" "}
                    {appoint.start
                      ? new Date(appoint.start).toLocaleString()
                      : "N/A"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>End:</strong>{" "}
                    {appoint.end
                      ? new Date(appoint.end).toLocaleString()
                      : "N/A"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Phone:</strong> {appoint.phoneNumber || "N/A"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>DoctorId:</strong> {appoint.doctorId || "N/A"}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      display: "inline-block",
                      mt: 1,
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: "bold",
                      color:
                        appoint.status === "confirmed"
                          ? "#1e4620"
                          : appoint.status === "pending"
                          ? "#665c00"
                          : "#555",
                      backgroundColor:
                        appoint.status === "confirmed"
                          ? "#d4edda"
                          : appoint.status === "pending"
                          ? "#fff3cd"
                          : "#e0e0e0",
                    }}
                  >
                    {appoint.status || "Unknown"}
                  </Typography>
                </CardContent>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ p: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReschedule(appoint)}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancel(appoint)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Appointment</DialogTitle>
        <DialogContent>
          {/* <Typography variant="body2" sx={{ mb: 2 }}>
                Your otp to reschedule appointment is {lockedotp}. This code will last
                for 5 mins. Enter this OTP to confirm your slot:
              </Typography>
               <TextField
        label="OTP"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      /> */}

          {/* Time Selection */}
          {/* <FormControl fullWidth>
        <InputLabel>Select Time</InputLabel>
        <Select
          value={selectedTime}
          label="Select Time"
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          {timeOptions.map((time, index) => (
            <MenuItem key={index} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

          {/* <FormControl fullWidth>
            <InputLabel shrink>Select Time (Today Only)</InputLabel>
            <TextField
              type="datetime-local"
              value={pickerValue}
              onChange={handledateChange}
              fullWidth
              inputProps={{
                min: todayMinMax.min,
                max: todayMinMax.max,
              }}
            />
            {selectedTime && (
              <p>
                <strong>Selected ISO UTC:</strong> {selectedTime}
              </p>
            )}
          </FormControl> */}
          <div>
            <label>Select Slot: </label>
            <select value={selectedSlot} onChange={handleSelect}>
              <option value="" disabled>
                -- Select a slot --
              </option>
              {selectedTime.map((slot) => (
                <option
                  key={slot._id}
                  value={slot._id}
                  data-slotid={slot.slotId}
                >
                  {formatTime(slot.start)} - {formatTime(slot.end)}
                </option>
              ))}
            </select>

            {selectedSlot && (
              <div style={{ marginTop: "10px" }}>
                {/* <strong>Selected Slot:</strong> {formatTime(selectedSlot.start)}{" "} */}
                - {formatTime(selectedSlot.end)}
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCancel(selectedSlot.slotId)}
            color="error"
          >
            Cancel Appointment
          </Button>
          <Button
            onClick={() => rechedule()}
            color="primary"
            variant="contained"
          >
            Reschedule Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Appointments;
