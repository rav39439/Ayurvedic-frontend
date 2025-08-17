import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000", 
    headers: { "Content-Type": "application/json" } 
});
export const logIn=(authData)=>API.post('http://localhost:5000/api/users/login',authData);

API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).access}`;
    }
    return req;
});



export const SignUp=(authData)=>API.post('/api/users/signup',authData);
export const getalldoctors=()=>API.get(`/api/doctors/doctors`)
export const getSlots=(doctorId)=>API.get(`/api/doctors/slots/${doctorId}`)
export const getdoctorsbyId=(id)=>API.get(`/api/doctors/doctors/${id}`)

export const deletebook=(id)=>API.delete(`/api/doctors/tasks/delete/${id}`)
export const Confirmappointment=(data)=>API.post(`/api/doctors/Confirmappointment`,data)

export const fixappointment=(data)=>API.post(`/api/doctors/fixappointment`,data)
export const Cancel=(data)=>API.post(`/api/doctors/cancel`,data)
export const cancelandremove=(data)=>API.post(`/api/doctors/cancelandremove`,data)

export const getPastAppointmentsByPhone=(data)=>API.post(`/api/doctors/pastappointments`,data)
export const getUpcomingAppointmentsByPhone=(data)=>API.post(`/api/doctors/upcomingappointments`,data)

export const rescheduleAppointment=(data)=>API.post(`/api/doctors/resechedule`,data)



