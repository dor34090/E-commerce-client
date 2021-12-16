import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import propTypes from "prop-types";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import products from "../landing/products";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Product = ({showBtn, product, description, link,buttonName, buttonLink, thumbnail}) => {
    return <div style={{padding:"10px", width:"290px"}}>
        <Link to={link || ""}>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={thumbnail}
          alt="example"
        />
    <CardContent>
    <Typography gutterBottom variant="h5" component="div">
            {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}

        </Typography>

    </CardContent>
    </CardActionArea>
    <CardActions>
    {showBtn && <Link className="btn btn-primary" to={buttonLink}>{buttonName}</Link>}
    </CardActions>
  </Card>
  </Link>
    </div>
};

Product.propTypes={
    product: propTypes.object.isRequired,
    description: propTypes.object.isRequired,
    buttonName: propTypes.string,
}

export default Product;