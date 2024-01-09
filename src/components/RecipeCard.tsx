import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import { Time } from "../models/Recipe";


import { TimeBlock } from "./TimeBlock";
import ButtonBase from "@mui/material/ButtonBase";


type RecipeCardProps = {
    name: string,
    picture?: string,
    time: Time
}

export function RecipeCard(props: RecipeCardProps) {

    let { name, picture, time } = props;

    return (
        <Card elevation={2} sx={{ marginTop: 2, marginBottom: 2 }}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {name}
                </Typography>
                <ButtonBase sx={{ width: "100%" }} onClick={() => alert("test")}>
                    <CardMedia
                        sx={{ width: "auto", height: 100 }}
                        component="img"
                        image={picture}
                    />
                </ButtonBase>
            </CardContent>

            <CardActions sx={{ flex: 1 }}>
                <TimeBlock time={time} />
            </CardActions>
        </Card>
    );
}