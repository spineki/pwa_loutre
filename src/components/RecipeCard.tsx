import { memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";
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

  useEffect(() => {}, [picture]);

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
        backgroundImage: `
                linear-gradient(0deg, rgba(42,42,42,0.65) 0%, rgba(42,42,42,0.65) 35%, rgba(255,255,255,0) 55%),
                url(${picture})   
            `,
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
          paddingLeft: 1,
          paddingRight: 1,
        }}
        component={Link}
        to={getDetailsRecipeRoute(id)}
      >
        <CardContent style={{ padding: 2, paddingBottom: 0, paddingTop: 1 }}>
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
        </CardContent>
      </CardActionArea>
      <CardContent
        style={{
          padding: 0,
          paddingLeft: 0,
          marginLeft: 4,
          paddingBottom: 4,
        }}
      >
        <CardRow
          duration={time.total}
          isFavorite={isFavorite}
          onLiked={handleLike}
          onUnliked={handleUnlike}
        />
      </CardContent>
    </Card>
  );
}

export const RecipeCardMemoized = memo(RecipeCard);
