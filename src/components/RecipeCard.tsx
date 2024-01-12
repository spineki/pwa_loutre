import { useCallback } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import { Time } from "../models/Recipe";
import { CardRow } from "./CardRow";
import { partialUpdateRecipe } from "../models/controllers";
import { CardMedia } from "@mui/material";
import { Link } from "react-router-dom";


type RecipeCardProps = {
    id: number,
    isFavorite: boolean
    name: string,
    picture: string,
    time: Time,
}


export function RecipeCard(props: RecipeCardProps) {

    const { id, name, picture, time, isFavorite } = props;

    const handleLike = useCallback(async () => {
        await partialUpdateRecipe(id, { isFavorite: true });
    }, [id])

    const handleUnlike = useCallback(async () => {
        await partialUpdateRecipe(id, { isFavorite: false });
    }, [id])

    return (
        <Card elevation={2}>
            <CardActionArea component={Link} to={`${id}`}>
                <CardContent sx={{ paddingBottom: 0, paddingTop: 1 }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            fontFamily: "Cookie-Regular",
                            paddingTop: 0,
                            paddingBottom: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>
                        {name}
                    </Typography>
                </CardContent>
                <CardMedia
                    image={picture}
                    style={{
                        objectFit: "contain",
                        width: "100%",
                        aspectRatio: "14/9", // hacks, but already lost already too much time on  it
                    }}
                />
            </CardActionArea>
            <CardContent sx={{ p: 1 }} style={{ paddingBottom: 8, paddingTop: 8 }}>
                <CardRow duration={time.total} isFavorite={isFavorite} onLiked={handleLike} onUnliked={handleUnlike} />
            </CardContent>
        </Card >
    );
}
