import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import RestoreIcon from '@mui/icons-material/Restore';

import { Time } from "../models/Recipe";
import { formatTime } from "../utils/time";

const VerticalBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column"
}));

type Props = {
    time: Time
};

export function TimeBlock(props: Props) {

    let { time } = props;
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", flex: 1 }}>
            <RestoreIcon fontSize="medium" />
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", flex: 1 }}>
                <VerticalBox >
                    <Typography variant="caption">{t("Prep")}:</Typography>
                    <Typography variant="caption">
                        {formatTime(time.preparation)}
                    </Typography>
                </VerticalBox>
                <VerticalBox >
                    <Typography variant="caption">{t("Baking")}:</Typography>
                    <Typography variant="caption">
                        {formatTime(time.baking)}
                    </Typography>
                </VerticalBox>
                <VerticalBox >
                    <Typography variant="caption">{t("Total")}:</Typography>
                    <Typography variant="caption">
                        {formatTime(time.total)}
                    </Typography>
                </VerticalBox>
            </Box>
        </Box>
    );
}
