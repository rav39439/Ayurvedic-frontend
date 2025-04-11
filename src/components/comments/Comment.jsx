

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getComment } from '../../redux/Actions'
import { useSelector } from 'react-redux'
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
    Stack,
    Divider
  } from "@mui/material";
  import { Star, StarBorder } from "@mui/icons-material";
const Comment = () => {
    const data=useParams()
    const dispatch=useDispatch()
    let comments=useSelector(state=>state.commentsReducer)
    
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = parseInt(rating);
      
        for (let i = 0; i < 5; i++) {
          stars.push(i < fullStars ? <Star key={i} color="primary" /> : <StarBorder key={i} />);
        }
      
        return <Box>{stars}</Box>;
      };
      
useEffect(()=>{
    dispatch(getComment(data.id))

    console.log(comments)
},[dispatch,data.id])
  return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
          <Typography variant="h5" gutterBottom>
            Reader Reviews
          </Typography>
    
          {comments.comments?.length > 0 ? (
            comments.comments.map((comment) => (
              <Card key={comment.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar>{comment.username[0]?.toUpperCase()}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {comment.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {comment.created_at}
                      </Typography>
                    </Box>
                  </Stack>
    
                  <Divider sx={{ my: 1 }} />
    
                  <Box mt={1}>
                    {renderStars(comment.rating)}
                    <Typography variant="body1" mt={1}>
                      {comment.comment}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No comments found.
            </Typography>
          )}
        </Box>
      );
  
}

export default Comment