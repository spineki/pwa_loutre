import { useTranslation } from "react-i18next";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import EggIcon from "@mui/icons-material/Egg";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import ShortTextIcon from "@mui/icons-material/ShortText";
import VisibilityIcon from "@mui/icons-material/Visibility";
interface RecipeTabsProps {
  currentTabIndex: number;
  handleTabsChange: (tabIndex: number) => void;
}

export function RecipeTabs(props: RecipeTabsProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const { currentTabIndex, handleTabsChange } = props;

  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Tabs
      style={{
        width: "100%",
        backgroundColor: theme.palette.background.default,
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
      }}
      value={currentTabIndex}
      onChange={(event: React.SyntheticEvent, newValue: number) =>
        handleTabsChange(newValue)
      }
      textColor="secondary"
      indicatorColor="secondary"
      centered
    >
      {smallScreen ? (
        <Tab icon={<VisibilityIcon />} />
      ) : (
        <Tab label={t("Preview")} />
      )}
      {smallScreen ? (
        <Tab icon={<EggIcon />} />
      ) : (
        <Tab label={t("Ingredients")} />
      )}
      {smallScreen ? (
        <Tab icon={<MicrowaveIcon />} />
      ) : (
        <Tab label={t("Recipe")} />
      )}
      {smallScreen ? (
        <Tab icon={<ShortTextIcon />} />
      ) : (
        <Tab label={t("Comments")} />
      )}
    </Tabs>
  );
}
