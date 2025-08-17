import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../redux/api"; // Always place imports at the top

import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import {
  Cancel,
  Confirmappointment,
  fixappointment,
} from "../../redux/Actions";

const AppointmentView = (props) => {
  const data = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [lockedotp, setlockedOtp] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointdata, setappointmentdata] = useState(null);
  useEffect(() => {
    const fetchBook = async () => {
      let user = JSON.parse(localStorage.getItem("Profile"));
      setUser(user);

      try {
        const d = await api.getdoctorsbyId(data.id);
        setappointmentdata(d.data);
        console.log(d.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, []);
  const handleSlotClick = async (slot) => {
    console.log("Slot clicked:", slot.id);
    const result = await fixappointment({
      slotId: slot.id,
      userPhone: user.result.phoneNumber
        ? user.result.phoneNumber
        : user.result.email,
    });
    setSelectedSlot(slot);

    if (result) {
      setlockedOtp(result.slot?.otpcode || "");
    }

    if (result?.slots) {
      setappointmentdata({ ...appointdata, slots: result?.slots }); 
    }
    setOpenDialog(true);
  };

  const handleBook = async (slot) => {
    console.log("Booking slot:", selectedSlot.id, "with OTP:", otp);
    const result = await Confirmappointment({
      slotId: selectedSlot.id,
      enteredCode:otp
    });
    console.log(result)
    setappointmentdata({ ...appointdata, slots: result?.slots }); 

    setOpenDialog(false);
    setOtp("");
  };

  const handleCancel = async (slotId) => {
    console.log("Cancelling slot:", selectedSlot.id, "with OTP:", otp);

    const result = await Cancel({
      slotId: selectedSlot.id,
      doctorId: appointdata.doctor._id,
    });

    setappointmentdata({ ...appointdata, slots: result?.slots });
    setOpenDialog(false);
    setOtp("");
  };

  if (!appointdata) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Card
        sx={{
          width: "95%",
          margin: "16px auto",
          borderRadius: "16px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
          textAlign: "left",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {/* Left Side - Doctor Info */}
          <CardContent sx={{ flex: 1 }}>
            {/* Doctor Name */}
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#2c3e50" }}
            >
              {appointdata.doctor.name}
            </Typography>

            {/* Specialization */}
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
              {appointdata.doctor.specialization}
            </Typography>

            {/* Availability Modes */}
            <Typography variant="body2" sx={{ fontWeight: "500" }}>
              Modes:{" "}
              <span style={{ fontWeight: "normal" }}>
                {appointdata.doctor.modes.join(", ")}
              </span>
            </Typography>

            {/* Email */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              📧 {appointdata.doctor.email}
            </Typography>

            {/* Joined Date */}
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 1, color: "gray" }}
            >
              Joined on:{" "}
              {new Date(appointdata.doctor.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>

          {/* Vertical Divider */}
          <Divider orientation="vertical" flexItem />

          {/* Right Side - About Doctor */}
          <Box sx={{ flex: 1, p: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
            >
              About Doctor
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              This is a test description about the doctor. You can add more
              details here, like experience, background, or achievements.
            </Typography>
          </Box>
        </Box>

        {/* Divider for Slots */}
        <Divider sx={{ my: 2 }} />

        {/* Slots Section */}
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: "#2c3e50" }}
          >
            Slots
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {appointdata?.slots && appointdata?.slots.length > 0 ? (
              appointdata.slots.map((slot, index) => {
                const isDisabled =
                  slot.status === "locked" || slot.status === "booked";

                return (
                  <Chip
                    key={index}
                    label={
                      <>
                        {new Date(slot.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(slot.end).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {isDisabled && (
                          <span
                            style={{
                              marginLeft: 6,
                              fontSize: "0.75rem",
                              color: "red",
                            }}
                          >
                            (Booked)
                          </span>
                        )}
                      </>
                    }
                    color="primary"
                    variant={isDisabled ? "filled" : "outlined"}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      px: 1,
                      opacity: isDisabled ? 0.3 : 1,
                      cursor: isDisabled ? "not-allowed" : "pointer",
                    }}
                    disabled={isDisabled}
                    clickable={!isDisabled}
                    onClick={() => !isDisabled && handleSlotClick(slot)}
                  />
                );
              })
            ) : (
              <Typography variant="body2" color="text.secondary">
                No slots available
              </Typography>
            )}
          </Box>
        </Box>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Appointment</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Your otp to confirm appointment is {lockedotp}. This code will last
            for 5 mins. Enter this OTP to confirm your slot:
          </Typography>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCancel(selectedSlot.slotId)}
            color="error"
          >
            Cancel Appointment
          </Button>
          <Button
            onClick={() => handleBook(selectedSlot.slotId)}
            color="primary"
            variant="contained"
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppointmentView;
