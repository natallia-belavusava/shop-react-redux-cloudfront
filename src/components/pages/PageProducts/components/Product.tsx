import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProduct, useAvailableProducts } from "~/queries/products";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useAvailableProduct(id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      <Grid item key={data?.id} xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            sx={{ pt: "56.25%" }}
            image={`https://source.unsplash.com/random?sig=${1}`}
            title="Image title"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {data?.title}
            </Typography>
            <Typography>{formatAsPrice(data?.price || 1)}</Typography>
            <Typography>{`count: ${data?.count}`}</Typography>
          </CardContent>
          <CardActions>
            {!!data && <AddProductToCart product={data} />}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
