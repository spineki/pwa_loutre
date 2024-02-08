import { useTranslation } from "react-i18next";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { saveUserPreferedLanguage } from "../database/controllers/preferencesController";
import { resources } from "../locales/languages";

const languages = Object.keys(resources).toSorted();

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  return (
    <Select
      value={i18n.language}
      label={t("Language")}
      variant="standard"
      onChange={async (selection) => {
        await i18n.changeLanguage(selection.target.value);
        await saveUserPreferedLanguage(selection.target.value);
      }}
    >
      {languages.map((language) => (
        <MenuItem key={language} value={language}>
          {language}
        </MenuItem>
      ))}
    </Select>
  );
}
