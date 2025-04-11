import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:8000", 
    headers: { "Content-Type": "application/json" } 
});
export const logIn=(authData)=>API.post('http://localhost:8000/api/token',authData);
// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('Profile')){
//         req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('Profile')).access}`
//     }
//     return req;
// })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).access}`;
    }
    console.log(req)
    return req;
});



export const SignUp=(authData)=>API.post('/register',authData);
export const addnewbook=(data)=>API.post('/AddBook',data)
export const getallbooks=(id)=>API.get(`/getBook`)
export const getComment=(id)=>API.get(`/getReview/${id}`)
export const addComment=(comment)=>API.post(`/AddReview/${comment.bookid}`,comment)
export const getbookbyId=(id)=>API.get(`/getBookbyId/${id}`)

export const deletebook=(id)=>API.delete(`/api/tasks/delete/${id}`)
export const updatebook=(data,id)=>API.put(`/getReview/${id}`)
