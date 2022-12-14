import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { products } from ".././data";

const SingleProduct = () => {
    const { id } = useParams();
    const project = products[id];
    return (
        <Card sx={{ maxWidth: 1200, mx: 25, my: 5 }} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="1840"
                    image={project.img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <a href={project.link} target="_blank" rel="noreferrer">Live Site Link</a>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default SingleProduct;