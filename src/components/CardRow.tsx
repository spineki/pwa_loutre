import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RestoreIcon from "@mui/icons-material/Restore";

import { formatTime } from "../utils/time";

type Props = {
  duration: number;
  isFavorite: boolean;
  onLiked: () => void;
  onUnliked: () => void;
};

export function CardRow(props: Props) {
  const { duration, isFavorite, onLiked, onUnliked } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Chip icon={<RestoreIcon />} label={formatTime(duration)} />
      {isFavorite ? (
        <IconButton
          onMouseDown={(event) => {
            event.preventDefault();
          }}
          onClick={(event) => {
            event.preventDefault();
            onUnliked();
          }}
        >
          <FavoriteIcon style={{ color: "red" }} />
        </IconButton>
      ) : (
        <IconButton
          onMouseDown={(event) => {
            event.preventDefault();
          }}
          onClick={(event) => {
            event.preventDefault();
            onLiked();
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </Box>
  );
}
