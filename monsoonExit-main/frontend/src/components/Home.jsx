import { Button, Card, CardContent, CardMedia, Grid, Typography, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [dats, setDats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from backend
  const fetchData = () => {
    axios.get('http://localhost:3001/get')
      .then((response) => {
        setDats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Delete data
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        console.log("Item deleted");
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Grid container spacing={3} justifyContent="center">
        {dats.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card 
              sx={{ 
                maxWidth: 350, 
                borderRadius: 3,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "0.3s",
                backgroundColor: "#ffffff",
                '&:hover': { 
                  transform: "scale(1.03)", 
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)" 
                } 
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  padding: 1,
                }}
                image={item.img_url}
                title={item.title}
              />
              <CardContent sx={{ textAlign: "center", paddingBottom: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: "bold", 
                    color: "#333",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2
                  }}
                >
                  {item.title}
                </Typography>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "gray", 
                    marginY: 1, 
                    fontStyle: "italic" 
                  }}
                >
                  {item.content}
                </Typography>

                <Box sx={{  display: "flex", marginTop: 2 }}>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                  <Button 
                    variant="contained" 
                   color="secondary"
                  >
                    Update
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
