import React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import { signup } from "../../redux/Actions";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const handleDoctorToggle = (event) => {
    setIsDoctor(event.target.checked);
  };
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    control,

    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (!isDoctor) {
      console.log({
        username: data.username,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        isDoctor,
      });
      dispatch(
        signup(
          {
            username: data.username,
            email: data.email,
            password: data.password,
            isDoctor,
            phoneNumber: data.phoneNumber,
          },
          navigate
        )
      );
    } else {
      console.log({
        name: data.name,
        email: data.email,
        password: data.password,
        modes: data.modes,
        specialization: data.specialization,
        experience: data.experience,
      });
      dispatch(
        signup(
          {
            name: data.name,
            email: data.email,
            password: data.password,
            modes: data.modes,
            specialization: data.specialization,
            experience: data.experience,
            isDoctor,
          },
          navigate
        )
      );
    }

    setStatus("successfully Registered,Please login now");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <FormControlLabel
            control={
              <Switch
                checked={isDoctor}
                onChange={handleDoctorToggle}
                color="primary"
              />
            }
            label="Signup as Doctor"
            sx={{ mb: 2 }}
          />

          <Typography variant="h5" textAlign="center" gutterBottom>
            Register
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {!isDoctor ? (
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            ) : (
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}

            {isDoctor && (
              <Controller
                name="modes"
                control={control}
                rules={{ required: "modes is required" }}
                render={({ field }) => (
                  <FormControl fullWidth margin="normal" error={!!errors.modes}>
                    <InputLabel>Modes</InputLabel>
                    <Select
                      {...field}
                      label="Specialization"
                      multiple
                      value={field.value || []} // ensure it's an array
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <MenuItem value="offline">offline</MenuItem>
                      <MenuItem value="online">online</MenuItem>
                    </Select>
                    <FormHelperText>{errors.modes?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            )}

            {isDoctor && (
              <Controller
                name="specialization"
                control={control}
                rules={{ required: "Specialization is required" }}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.specialization}
                  >
                    <InputLabel>Specialization</InputLabel>
                    <Select {...field} label="Specialization">
                      <MenuItem value="cardiology">Cardiology</MenuItem>
                      <MenuItem value="dermatology">Dermatology</MenuItem>
                      <MenuItem value="neurology">Neurology</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.specialization?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            )}

            {!isDoctor && (
              <TextField
                label="Phone Number"
                type="tel"
                fullWidth
                margin="normal"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/, // simple 10-digit validation
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
            {isDoctor ? (
              <TextField
                label="Experience (in years)"
                type="number"
                fullWidth
                margin="normal"
                {...register("experience", {
                  required: "Experience is required",
                  min: { value: 0, message: "Experience cannot be negative" },
                  max: {
                    value: 60,
                    message: "Please enter a valid experience",
                  },
                })}
                error={!!errors.experience}
                helperText={errors.experience?.message}
              />
            ) : (
              ""
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={!isValid}
            >
              Register
            </Button>

            {status && (
              <Typography
                color="success.main"
                sx={{ mt: 2, textAlign: "center" }}
              >
                {status}
              </Typography>
            )}

            <Link
              to="/Login"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "10px",
                textDecoration: "none",
                color: "blue",
              }}
            >
              Already have an account? Login here
            </Link>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
