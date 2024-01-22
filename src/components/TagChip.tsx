import { useCallback } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import Chip from "@mui/material/Chip";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { partialUpdateTag } from "../database/controllers/tagController";
import { Tag } from "../database/models/Tag";
import { RouteAllRecipesName } from "../routes/routes";

interface TagChipProps {
    tag: Tag
}

export function TagChip(props: TagChipProps) {
    const { id, isFavorite, name } = props.tag;

    const navigate = useNavigate();

    const handleLike = useCallback(async () => {
        await partialUpdateTag(id!, { isFavorite: true });
    }, [id]);

    const handleUnlike = useCallback(async () => {
        await partialUpdateTag(id!, { isFavorite: false });
    }, [id]);


    return (
        <Chip
            icon={
                isFavorite ?
                    <FavoriteIcon style={{ color: "red" }} onClick={(event) => {
                        event.stopPropagation();
                        handleUnlike();
                    }} />
                    :
                    <FavoriteBorderIcon onClick={(event) => {
                        event.stopPropagation();
                        handleLike();
                    }} />
            }

            onClick={() => {
                navigate(
                    {
                        pathname: RouteAllRecipesName,
                        search: createSearchParams({
                            "tag-name": name
                        }).toString()
                    }
                );
            }}
            label={name}
            variant={"filled"}
        />);
}
