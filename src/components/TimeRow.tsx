import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import RestoreIcon from '@mui/icons-material/Restore';

import { Time } from "../database/models/Recipe";
import { formatTime } from "../utils/time";

const VerticalBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column"
}));

type Props = {
    time: Time
};

export function TimeRow(props: Props) {

    const { time } = props;
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
            <RestoreIcon fontSize="large" />
            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                <VerticalBox sx={{ m: 1 }} >
                    <Typography variant="caption">{t("Prep")}:</Typography>
                    <Typography variant="caption">
                        {formatTime(time.preparation)}
                    </Typography>
                </VerticalBox>
                <VerticalBox sx={{ m: 1 }}>
                    <Typography variant="caption">{t("Baking")}:</Typography>
                    <Typography variant="caption">
                        {formatTime(time.baking)}
                    </Typography>
                </VerticalBox>
                <VerticalBox sx={{ m: 1 }} >
                    <Typography variant="caption">{t("Total")}:</Typography>
                    <Typography variant="caption">
                        {formatTime(time.total)}
                    </Typography>
                </VerticalBox>
            </Box>
        </Box>
    );
}
