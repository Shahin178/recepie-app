import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2), // Add padding on all sides
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    width: "100%", // Take up all the width
    maxWidth: "800px", // Limit the width of the card
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    padding: theme.spacing(2),
  },
}));

const DetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=5d90253e598c46f493479440cf4556fa`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={recipe.image}
            title={recipe.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h4" gutterBottom>
              {recipe.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {recipe.summary.replace(/<[^>]+>/g, "")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Servings: {recipe.servings}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ready in {recipe.readyInMinutes} minutes
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Ingredients:</strong>
              <ul>
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Instructions:</strong>
              <ol>
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailPage;
