import { useTranslation } from "react-i18next";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import { IngredientSection } from "../database/models/Recipe";
import { ColouredNumberText } from "./ColouredNumberText";

interface RecipeRequirementsProps {
  ingredientSections: IngredientSection[];
  multiplicator: number;
}

export function RecipeRequirements(props: RecipeRequirementsProps) {
  const { ingredientSections, multiplicator } = props;
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Grid container>
        <Grid item xs={0} md={4} />

        <Grid item xs={12} md={4}>
          <List>
            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
              <ListItemAvatar>
                <Avatar src="/ingredients.png" variant="square" />
              </ListItemAvatar>
              <ListItemText sx={{ flexGrow: 0 }}>
                <Typography
                  variant="h4"
                  component="h2"
                  fontFamily={"Cookie-Regular"}
                  alignSelf="center"
                >
                  {t("YourIngredients")}
                </Typography>
              </ListItemText>
            </ListItem>

            {ingredientSections.map((ingredientSection, sectionIndex) => (
              <div key={`${sectionIndex}`}>
                {ingredientSection.title && (
                  <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText>
                      <ColouredNumberText
                        text={ingredientSection.title}
                        multiplicator={multiplicator}
                      />
                    </ListItemText>
                  </ListItem>
                )}

                <List sx={{ paddingLeft: ingredientSection.title ? 2 : 0 }}>
                  {ingredientSection.ingredients.map(
                    (ingredient, recipeIndex) => (
                      <ListItem
                        key={`${sectionIndex}_${recipeIndex}`}
                        sx={{ paddingTop: 0, paddingBottom: 0 }}
                      >
                        <ListItemIcon sx={{ minWidth: 16 }}>
                          <Badge
                            badgeContent=""
                            color="primary"
                            variant="dot"
                          />
                        </ListItemIcon>

                        <ListItemText>
                          <ColouredNumberText
                            text={ingredient}
                            multiplicator={multiplicator}
                          />
                        </ListItemText>
                      </ListItem>
                    ),
                  )}
                </List>
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
      <Grid item xs={0} md={4} />
    </Box>
  );
}
