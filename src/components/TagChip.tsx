import Chip from "@mui/material/Chip";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCallback } from "react";
import { partialUpdateTag } from "../models/controllers";
import { Tag } from "../models/Tag";

interface TagChipProps {
    tag: Tag
}

export function TagChip(props: TagChipProps) {
    const { id, isFavorite, name } = props.tag;


    const handleLike = useCallback(async () => {
        await partialUpdateTag(id!, { isFavorite: true });
    }, [id])

    const handleUnlike = useCallback(async () => {
        await partialUpdateTag(id!, { isFavorite: false });
    }, [id])


    return (
        <Chip
            icon={
                isFavorite ?
                    <FavoriteIcon style={{ color: "red" }} onClick={() => handleUnlike()} />
                    :
                    <FavoriteBorderIcon onClick={() => handleLike()} />
            }
            label={name}
            variant={"filled"}
        />);
}

