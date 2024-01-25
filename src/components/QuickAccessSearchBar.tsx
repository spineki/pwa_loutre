import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";

import TagIcon from "@mui/icons-material/Tag";

import { database } from "../database/database";
import { Recipe } from "../database/models/Recipe";
import { Tag, sanitizeTagName } from "../database/models/Tag";
import { RouteAllRecipesName, getDetailsRecipeRoute } from "../routes/routes";

type Option =
  | { kind: "recipe"; payload: Recipe }
  | { kind: "tag"; payload: Tag };

export function QuickAccessSearchBar() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [currentSearch, setCurrentSearch] = useState<string>("");

  // displaying tags that match the currentSearch if it stars with # symbol
  // filtering is done by name, a tag is kept if its name includes the search string
  // so no fuzzy search for now...
  const options: Option[] | undefined = useLiveQuery(async () => {
    if (currentSearch.startsWith("#")) {
      // searching tag
      const tagSearch = sanitizeTagName(currentSearch.substring(1));
      if (tagSearch === "") {
        return [];
      }

      const matchingTags = await database.tags
        .orderBy("name")
        .filter((tag) => tag.name.includes(tagSearch))
        .toArray();

      return matchingTags.map((tag) => ({ kind: "tag", payload: tag }));
    } else {
      // searching recipe
      const recipeSearch = currentSearch.trim().toLowerCase();
      if (recipeSearch === "") {
        return [];
      }

      const matchingRecipes = await database.recipes
        .orderBy("name")
        .filter((recipe) => recipe.name.toLowerCase().includes(recipeSearch))
        .toArray();

      return matchingRecipes.map((recipe) => ({
        kind: "recipe",
        payload: recipe,
      }));
    }
  }, [currentSearch]);

  return (
    <Grid container>
      <Grid item xs={0} md={4} />
      <Grid item xs={11} md={4}>
        <Autocomplete
          sx={{
            mr: 2,
            width: "100%",
          }}
          size="small"
          disablePortal
          includeInputInList
          filterSelectedOptions={false}
          filterOptions={(option) => option}
          options={options ?? []}
          getOptionLabel={(option) =>
            option.kind === "tag"
              ? "#" + option.payload.name
              : option.payload.name
          }
          noOptionsText={t("HelpSearch")}
          onChange={(event, newValue) => {
            if (newValue == null) {
              setCurrentSearch("");
            } else {
              if (newValue.kind === "recipe") {
                navigate(getDetailsRecipeRoute(newValue.payload.id!));
              } else {
                navigate({
                  pathname: RouteAllRecipesName,
                  search: createSearchParams({
                    "tag-name": newValue.payload.name,
                  }).toString(),
                });
              }
            }
          }}
          onInputChange={debounce((event, newValue: string) => {
            const searchText = newValue.toLocaleLowerCase().trim();
            // saving text to keep track of what is currently typed (to tell appart partial recipe name and tag search)
            setCurrentSearch(searchText);
          }, 400)}
          renderOption={(props, item) => (
            <li {...props} key={item.payload.id}>
              {item.kind === "recipe" ? (
                <ListItem>{item.payload.name}</ListItem>
              ) : (
                <Chip label={item.payload.name} icon={<TagIcon />} />
              )}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={`${t("Search")}...`}
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
      </Grid>
      <Grid item xs={1} md={4} />
    </Grid>
  );
}
