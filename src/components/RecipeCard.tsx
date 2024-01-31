import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";
import { partialUpdateRecipe } from "../database/controllers/recipeController";
import { Time } from "../database/models/Recipe";
import { useCountRender } from "../hooks/useCountRenders";
import { getDetailsRecipeRoute } from "../routes/routes";
import { CardRow } from "./CardRow";

type RecipeCardProps = {
  id: number;
  isFavorite: boolean;
  name: string;
  picture?: Blob;
  time: Time;
};

type LoadState =
  | { isLoaded: false }
  | { isLoaded: true; payload: string | null };

export function RecipeCard(props: RecipeCardProps) {
  const { id, name, picture, time, isFavorite } = props;

  const [sourceLoaded, setSourceLoaded] = useState<LoadState>({
    isLoaded: false,
  });

  useCountRender(id.toString(), "1579");

  useEffect(() => {
    if (picture === undefined) {
      setSourceLoaded({ isLoaded: true, payload: "/tutorial_picture.png" });
    } else {
      const url = URL.createObjectURL(picture);
      setSourceLoaded({ isLoaded: true, payload: url });

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [picture]);

  const theme = useTheme();

  const handleLike = useCallback(async () => {
    await partialUpdateRecipe(id, { isFavorite: true });
  }, [id]);

  const handleUnlike = useCallback(async () => {
    await partialUpdateRecipe(id, { isFavorite: false });
  }, [id]);

  return sourceLoaded.isLoaded ? (
    <Card
      elevation={2}
      sx={{
        backgroundImage: `
                linear-gradient(0deg, rgba(42,42,42,0.65) 0%, rgba(42,42,42,0.65) 35%, rgba(255,255,255,0) 55%),
                url(${sourceLoaded.payload})   
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
  ) : (
    <Skeleton variant="rectangular" sx={{ height: "100%", width: "100%" }} />
  );
}

export const RecipeCardMemoized = memo(RecipeCard, (prev, next) => {
  return prev.id === next.id;
});
