import { useCallback } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { CardMedia, useTheme } from "@mui/material";
import { partialUpdateRecipe } from "../database/controllers/recipeController";
import { Time } from "../database/models/Recipe";
import { getDetailsRecipeRoute } from "../routes/routes";
import { CardRow } from "./CardRow";

type RecipeCardProps = {
  id: number;
  isFavorite: boolean;
  name: string;
  picture?: string;
  time: Time;
};

export function RecipeCard(props: RecipeCardProps) {
  const { id, name, picture, time, isFavorite } = props;

  const theme = useTheme();

  const handleLike = useCallback(async () => {
    await partialUpdateRecipe(id, { isFavorite: true });
  }, [id]);

  const handleUnlike = useCallback(async () => {
    await partialUpdateRecipe(id, { isFavorite: false });
  }, [id]);

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        color: theme.palette.getContrastText("rgba(42,42,42,0.6)"),
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "end",
        }}
        component={Link}
        to={getDetailsRecipeRoute(id)}
      >
        <CardMedia
          component="img"
          src={picture}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
            maskImage:
              "linear-gradient(180deg, rgb(42, 42, 42) 0%, rgba(42,42,42,0.95) 50%, rgba(255,255,255, 0.4) 80%)",
          }}
          loading="lazy"
        />

        <CardContent
          sx={{
            backgroundColor: "transparent",
            position: "relative",
            padding: 1,
            paddingBottom: 0.5,
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontFamily: "Cookie-Regular",
              paddingTop: 0,
              paddingBottom: 0,
              whiteSpace: "wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
              lineHeight: "1rem",
              p: 0,
            }}
          >
            {name}
          </Typography>
          <CardRow
            duration={time.total}
            isFavorite={isFavorite}
            onLiked={handleLike}
            onUnliked={handleUnlike}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
