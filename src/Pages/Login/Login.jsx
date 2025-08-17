import { React, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = (props) => {
  const dispatch = useDispatch();
  const [errormessage, seterrormessage] = useState("");
  const [loading, setLoading] = useState(false); // Use useState for loading
  const [isDoctor, setIsDoctor] = useState(false);

  const handleDoctorToggle = (event) => {
    setIsDoctor(event.target.checked);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    // const loginData=await getLoginData(data)
    dispatch(
      login({ email: data.email, password: data.password, isDoctor }, navigate)
    );
    setTimeout(() => {
      setLoading(false);
      seterrormessage(
        typeof props.currentMessage !== "undefined" &&
          props.currentMessage !== null
          ? props.currentMessage.data.message
          : "Credentials are not valid"
      );
    }, 60000);
  };

  const sendData = (e) => {
    e.preventDefault();
    props.changeBack("Hello from child");
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
            label="Login as Doctor"
            sx={{ mb: 2 }}
          />

          <Typography variant="h5" textAlign="center" gutterBottom>
            Login
          </Typography>
          <p style={{ fontSize: "12px", color: "gray" }}>
            Disclaimer: The API response may take more than a minute due to slow
            response from render Application.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "email is required",
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
              {loading ? <span>loading</span> : "login"}
            </Button>

            {errormessage !== "" ? (
              <Typography
                color="error.main"
                sx={{ mt: 2, textAlign: "center" }}
              >
                {errormessage}
              </Typography>
            ) : (
              ""
            )}
            <Link
              to="/Register"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "10px",
                textDecoration: "none",
                color: "blue",
              }}
            >
              Don't have an account? Sign up
            </Link>
          </form>
        </CardContent>
      </Card>

      <Button onClick={sendData}>testButton</Button>
    </Box>
  );
};

export default Login;
