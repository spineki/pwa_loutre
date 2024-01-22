import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";

import TagIcon from '@mui/icons-material/Tag';

import { database } from "../database/database";
import { sanitizeTagName } from "../database/models/Tag";


export function SearchBar() {
    const { t } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const [currentSearch, setCurrentSearch] = useState<string>("");

    // using a flag to make following useEffect only run once
    const [didLoad, setDidLoad] = useState(false);

    // executing this once to local state from url state
    useEffect(() => {
        if (didLoad) {
            return;
        }

        if (searchParams.has("recipe-name")) {
            setCurrentSearch(searchParams.get("recipe-name")!);
        } else if (searchParams.has("tag-name")) {
            setCurrentSearch("#" + searchParams.get("tag-name")!);
        }
        setDidLoad(true);
    }, [didLoad, searchParams]);


    // displaying tags that match the currentSearch if it stars with # symbol
    // filtering is done by name, a tag is kept if its name includes the search string
    // so no fuzzy search for now...
    const options = useLiveQuery(async () => {
        if (currentSearch.startsWith("#")) {
            const tagSearch = sanitizeTagName(currentSearch.substring(1));
            if (tagSearch === "") {
                return [];
            }

            const matchingTags =
                (await database.tags.orderBy("name")
                    .filter(tag => tag.name.includes(tagSearch))
                    .toArray()
                );

            return matchingTags;
        }

        return [];
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
                    filterSelectedOptions={false}
                    filterOptions={(option) => option}
                    options={options ?? []}
                    getOptionLabel={option => "#" + option.name}
                    noOptionsText={t("HelpSearch")}
                    onChange={(event, newValue) => {
                        if (newValue == null) {
                            setCurrentSearch("");
                        } else {
                            setSearchParams({ "tag-name": sanitizeTagName(newValue.name) });
                        }
                    }}
                    onInputChange={debounce((event, newValue: string) => {
                        const searchText = newValue.toLocaleLowerCase().trim();
                        // saving text to keep track of what is currently typed (to tell appart partial recipe name and tag search)
                        setCurrentSearch(searchText);

                        // only updating current recipe name search we are not typing the name of tag
                        if (!searchText.startsWith("#")) {
                            setSearchParams({ "recipe-name": searchText });
                        }

                    }, 400)}
                    renderOption={(props, item) => (
                        <li {...props} key={item.id}>
                            <Chip label={item.name} icon={<TagIcon />} />
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={
                                searchParams.has("recipe-name") ? searchParams.get("recipe-name")!
                                    : searchParams.has("tag-name") ? ("#" + searchParams.get("tag-name")!) :
                                        `${t("Search")}...`
                            }
                            fullWidth
                            InputProps={{
                                // we need this, otherwise no option will be displayed https://stackoverflow.com/questions/72854517/applying-inputadornment-to-mui-autocomplete-removes-the-options-list
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
    );

}

