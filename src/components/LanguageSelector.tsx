import { useTranslation } from "react-i18next";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useEffect } from "react";
import { getUserPreferedLanguage, saveUserPreferedLanguage } from "../database/controllers/preferencesController";
import { resources } from "../locales/languages";

const languages = Object.keys(resources).toSorted();

export function LanguageSelector() {
    const { i18n, t } = useTranslation();

    // updating language preferences
    useEffect(() => {
        async function getInitialLanguage() {
            const preferedLangaguage = await getUserPreferedLanguage();
            if (preferedLangaguage === undefined) {
                await saveUserPreferedLanguage(i18n.language);
            } else {
                if (preferedLangaguage !== i18n.language) {
                    await i18n.changeLanguage(preferedLangaguage);
                }
            }
        }
        getInitialLanguage();

    }, [i18n]);

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
            {
                languages.map(language => <MenuItem key={language} value={language}>{language}</MenuItem>)
            }
        </Select>

    );


}