
import Box from '@mui/material/Box';
import Chip from "@mui/material/Chip";
import IconButton from '@mui/material/IconButton';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { formatTime } from "../utils/time";

type Props = {
    duration: number,
    isFavorite: boolean
};

export function CardRow(props: Props) {

    let { duration, isFavorite } = props;

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left" }}>
            <Chip icon={<RestoreIcon />} label={formatTime(duration)} />
            {
                isFavorite ?
                    <IconButton onClick={(event) => {
                        event.stopPropagation();
                        alert("todo: should cease being favorite");
                    }}>
                        <FavoriteIcon />
                    </IconButton>
                    :
                    <IconButton onClick={(event) => {
                        event.stopPropagation();
                        alert("todo: should become favorite")
                    }}>
                        <FavoriteBorderIcon />
                    </IconButton>
            }

        </Box>
    );
}
