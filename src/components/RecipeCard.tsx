import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import { Time } from "../models/Recipe";
import { CardRow } from "./CardRow";


type RecipeCardProps = {
    isFavorite: boolean
    name: string,
    picture?: string,
    time: Time,
}

export function RecipeCard(props: RecipeCardProps) {

    let { name, picture, time, isFavorite } = props;

    return (
        <Card elevation={2} sx={{ marginTop: 2, marginBottom: 2 }}>
            <CardActionArea onClick={() => alert("test")}>

                <CardContent sx={{ paddingTop: 2, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ paddingLeft: 2, paddingRight: 2 }}>
                        {name}
                    </Typography>
                    <CardMedia
                        sx={{ width: "100%", height: "auto" }}
                        component="img"
                        image={picture}
                    />
                    <Box sx={{ position: "relative", "left": 4, bottom: 42 }}>
                        <CardRow duration={time.total} isFavorite={isFavorite} />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}