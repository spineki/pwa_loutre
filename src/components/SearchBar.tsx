import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { database } from "../models/database";
import { getDetailsRecipeRoute } from "../routes/routes";

export function SearchBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentSearch, setCurrentSearch] = useState<string>("");

    const matches = useLiveQuery(async () => {
        if (currentSearch === "") {
            return [];
        }

        if (currentSearch.startsWith("#")) {
            console.log("tags");
            alert(t("WIP"))
            // const keyword = currentSearch.substring(1);
            // const recipes = await database.recipes
            //     .orderBy("name")
            //     .filter(recipe =>  recipe.tags.includes(keyword))
            //     .toArray();
            return [];
        } else {
            const recipeNames = (
                await database.recipes
                    .orderBy("name")
                    .filter(recipe => recipe.name.toLowerCase().includes(currentSearch))
                    .limit(20)
                    .toArray()
            ).map((recipe) => ({ id: recipe.id, name: recipe.name }));
            return recipeNames;
        }
    }, [currentSearch]);

    return (
        <Grid container>
            <Grid item xs={0} md={4} />
            <Grid item xs={11} md={4}>
                <Autocomplete
                    sx={{
                        mr: 2, width: "100%"
                    }}
                    size="small"
                    disablePortal
                    includeInputInList
                    filterSelectedOptions
                    options={matches ?? []}
                    getOptionLabel={option => option.name}
                    noOptionsText={currentSearch === "" ? t("HelpSearch") : t("NoResult")}
                    onChange={(event, newValue: { id: undefined | number, name: string } | null) => {
                        setCurrentSearch(newValue?.name.toLocaleLowerCase().trim() ?? "");
                        if (newValue?.id != null) {
                            navigate(getDetailsRecipeRoute(newValue.id));
                        }
                    }}
                    onInputChange={(event, newValue) => {
                        setCurrentSearch(newValue.toLocaleLowerCase().trim());
                    }}

                    renderOption={(props, item) => (
                        <li {...props} key={item.id}>
                            <ListItemText>{item.name}</ListItemText>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={`${t("Search")}...`}
                            fullWidth
                            InputProps={{
                                // we need this, otherwise no opion will be displayed https://stackoverflow.com/questions/72854517/applying-inputadornment-to-mui-autocomplete-removes-the-options-list
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

            </Grid >
            <Grid item xs={1} md={4} />
        </Grid>
    )

}

