import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSaveRecipe } from "../utils/APIRoutes";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  savedRecipes: {
    padding: theme.spacing(2), // Add padding on all sides
  },
  recipeCard: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    transition: "box-shadow 0.3s",
    "&:hover": {
      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    },
  },
  recipeMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderRadius: "8px 8px 0 0",
  },
  recipeContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  dishName: {
    textDecoration: "none", // Remove underline
    color: "black", // Set text color
    fontSize: "1.5rem", // Set font size
  },
}));

const SavedRecipe = () => {
  const classes = useStyles();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(getSaveRecipe);
        const data = await response.json();
        setSavedRecipes(data.recipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={classes.savedRecipes}>
        {loading ? (
          <CircularProgress />
        ) : savedRecipes.length > 0 ? (
          <Grid container spacing={3}>
            {savedRecipes.map((recipe) => (
              <Grid key={recipe.id} item xs={12} sm={6} md={4}>
                <Card className={classes.recipeCard}>
                  <Link
                    to={`/details/${recipe.id}`}
                    className={classes.dishName}
                  >
                    <CardMedia
                      className={classes.recipeMedia}
                      image={recipe.image}
                      title={recipe.title}
                    />
                    <CardContent className={classes.recipeContent}>
                      <Typography
                        variant="h6"
                        align="center"
                        className={classes.dishName} // Apply the custom class to remove underline
                      >
                        {recipe.title}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center">
            No saved recipes yet.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SavedRecipe;
