// Home.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveRecipe } from "../utils/APIRoutes";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  card: {
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
  cardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderRadius: "8px 8px 0 0",
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  saveButton: {
    alignSelf: "flex-end",
    marginTop: "auto",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    fontSize: "0.75rem",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const savedRecipes = useSelector((state) => state.searchedRecipes);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const API_KEY = "5d90253e598c46f493479440cf4556fa";
  const SEARCH_RECIPE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=12`;
  const RANDOM_RECIPE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=12`;

  const getRandom = async () => {
    const api = await axios.get(RANDOM_RECIPE_URL);
    setRandomRecipes(api.data.recipes);
  };
  useEffect(() => {
    getRandom();
  }, []);

  const searchRecipes = async (query) => {
    const response = await axios.get(SEARCH_RECIPE_URL, {
      params: {
        query: query,
      },
    });
    setSearchedRecipes(response.data.results);
  };

  const handleSave = async (id, title, image) => {
    try {
      console.log(title);
      const response = await axios.post(saveRecipe, { id, title, image });
      console.log("Recipe saved with ID:", id);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div>
      <Navbar searchRecipes={searchRecipes} />
      <div className={classes.container}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Discover Delicious Dishes
        </h1>
        <Grid container spacing={2}>
          {searchedRecipes.length > 0 &&
            searchedRecipes.map((recipe) => (
              <Grid key={recipe.id} item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link
                    to={`/details/${recipe.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={recipe.image}
                      title={recipe.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "black", fontSize: "1.2rem" }}
                      >
                        {recipe.title}
                      </Typography>
                    </CardContent>
                  </Link>
                  <Button
                    onClick={() =>
                      handleSave(recipe.id, recipe.title, recipe.image)
                    }
                    variant="contained"
                    color="primary"
                    className={classes.saveButton}
                  >
                    Save
                  </Button>
                </Card>
              </Grid>
            ))}
          {randomRecipes.length > 0 &&
            randomRecipes.map((recipe) => (
              <Grid key={recipe.id} item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link
                    to={`/details/${recipe.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={recipe.image}
                      title={recipe.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "black", fontSize: "1.5rem" }}
                      >
                        {recipe.title}
                      </Typography>
                    </CardContent>
                  </Link>
                  <Button
                    onClick={() =>
                      handleSave(recipe.id, recipe.title, recipe.image)
                    }
                    variant="contained"
                    color="primary"
                    className={classes.saveButton}
                  >
                    Save
                  </Button>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
