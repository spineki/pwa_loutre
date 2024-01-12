import { useTranslation } from "react-i18next";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";


interface RecipeTabsProps {
    currentTabIndex: number,
    handleTabsChange: (tabIndex: number) => void
}


export function RecipeTabs(props: RecipeTabsProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const { currentTabIndex, handleTabsChange } = props;

    return (
        <Tabs
            style={{
                width: "100%",
                backgroundColor: theme.palette.background.default,
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
            }}
            value={currentTabIndex}
            onChange={(event: React.SyntheticEvent, newValue: number) => handleTabsChange(newValue)}
            textColor="secondary"
            indicatorColor="secondary"
            centered
        >
            <Tab label={t("Ingredients")} />
            <Tab label={t("Recipe")} />
            <Tab label={t("Comments")} />
        </Tabs>
    );

}