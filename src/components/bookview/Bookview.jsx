import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import * as api from "../../redux/api"; // Always place imports at the top

import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Divider
  } from '@mui/material';

  
const Bookview = () => {
        const data=useParams()
        const dispatch=useDispatch()

        let books=useSelector(state=>state.BookReducer)

        let filtered=books.tasks.filter(b=>b.id==data.id)
        const [book, setBook] = useState(filtered[0]);


        useEffect(() => {
            const fetchBook = async () => {
              try {
                const d = await api.getbookbyId(data.id);
                console.log(d)
                setBook(d.data);
              } catch (error) {
                console.error("Error fetching book:", error);
              }
            };
          
            fetchBook();
            
            // Optional: remove this unless you're using `filtered`
            // console.log(filtered);
          }, [data.id]);
        

  return (
    <Box
    sx={{
      position: 'relative',
      display: 'block', // change to block to allow full width
      margin: '20px auto',
      maxWidth: 600, // ⬅️ increased width
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.25)',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#fafafa',
    }}
  >
    <Card
      sx={{
        width: '100%',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" gutterBottom>
          {book?.title}
        </Typography>
  
        <Divider sx={{ my: 2 }} />
  
        <BookRow label="Author" value={book.author} />
        <BookRow label="Genre" value={book.genre} />
        <BookRow label="Published Year" value={book.published_year} />
        <BookRow label="Description" value={book.description} multiline />
      </CardContent>
    </Card>
  </Box>

  )
};
const BookRow = ({ label, value, multiline }) => (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', minWidth: 120 }}>
        {label}:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          whiteSpace: multiline ? 'normal' : 'nowrap',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          flex: 1,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );


export default Bookview