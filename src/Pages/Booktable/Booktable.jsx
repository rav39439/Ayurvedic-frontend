import React from 'react'
import './Booktable.css'
import  { useState } from "react";
import Bookrow from '../../components/Bookrow/Bookrow';
import { Typography } from '@mui/material';


// import './Task.css'
const Tasktable = (props) => {
  console.log(props)
    const [loading, setloading] = useState(false)
    

  return (
    <>
<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
  Welcome to BookStore
</Typography>
    <div className="container mt-4">

    {props?.tasks?.length > 0 && loading === false ? (
    <table className="table table-bordered table-striped" style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead className="table-dark">
      <tr>
        <th style={{ padding: "12px", textAlign: "center" }}>Title</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Genre</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Author</th>
        <th style={{ padding: "12px", textAlign: "center" }}>Published_uear</th>
  

        
 <th style={{ padding: "7px", textAlign: "center" }}>Post comments</th>
 <th style={{ padding: "7px", textAlign: "center" }}>View comments</th>
        
 <th style={{ padding: "7px", textAlign: "center" }}>View Book</th>

       

      </tr>
    </thead>
    <tbody>
      {props.tasks.map((task, index) => (
        <Bookrow
          key={index}
          task={task}
          addtask={props.addtask}
          currentUser={props.currentUser}
        />
      ))}
    </tbody>
  </table>
    ) : (
      <h1>No Books</h1>
    )}
  </div>
  </>

  )
}

export default Tasktable