import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";
import { Link as RouterLink, Link } from "react-router-dom";

export default function Products() {
  const {
    data = [
      {
        id: "test",
        title: "test-title",
        description: "test-description",
        price: 100,
        count: 1,
      },
    ],
    isLoading,
  } = useAvailableProducts();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {data.map((product, index) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card
            component={RouterLink}
            to={`product/${product.id}`}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              sx={{ pt: "56.25%" }}
              image={`https://source.unsplash.com/random?sig=${index}`}
              title="Image title"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>{formatAsPrice(product.price)}</Typography>
              <Typography>{`count: ${product.count}`}</Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
