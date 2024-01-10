import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Image from "mui-image";

import { Time } from "../models/Recipe";
import { CardRow } from "./CardRow";


type RecipeCardProps = {
    isFavorite: boolean
    name: string,
    picture: string,
    time: Time,
}


export function RecipeCard(props: RecipeCardProps) {

    let { name, picture, time, isFavorite } = props;

    return (
        <Card elevation={2}>
            <CardActionArea>
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
                <Image src={picture} style={{
                    objectFit: "contain",
                    width: "100%",
                    aspectRatio: "14/9", // hacks, but already lost already too much time on  it
                }} />
            </CardActionArea>
            <CardContent sx={{ p: 1 }} style={{ paddingBottom: 8, paddingTop: 8 }}>
                <CardRow duration={time.total} isFavorite={isFavorite} />
            </CardContent>
        </Card >
    );
}
