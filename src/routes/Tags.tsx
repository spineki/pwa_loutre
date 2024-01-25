import { useLiveQuery } from "dexie-react-hooks";
import { useContext, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import { TagChip } from "../components/TagChip";
import { DrawerContext } from "../contexts/DrawerContext";
import { getAllTags } from "../database/controllers/tagController";
import { Tag } from "../database/models/Tag";
import { RouteTagsName } from "../routes/routes";
import { groupBy } from "../utils/dataStructures";

export function Tags() {
  const { setCurrentRoute } = useContext(DrawerContext);
  useEffect(() => {
    setCurrentRoute(RouteTagsName);
  }, [setCurrentRoute]);

  const groupedTags = useLiveQuery(
    async () => {
      const tags = await getAllTags();

      const groupedTags = groupBy(tags, (tag: Tag) => tag.name.charAt(0));
      const groupedTagEntries: Array<[string, Tag[]]> = [];
      for (const entry of groupedTags.entries()) {
        groupedTagEntries.push(entry);
      }

      const sortedGroupedTags = groupedTagEntries.sort((a, b) =>
        a[0] > b[0] ? 1 : -1,
      );
      return sortedGroupedTags;
    },
    // specify vars that affect query:
    [], // dependencies
  );

  return (
    <Paper sx={{ flex: 1, p: 2 }}>
      <Grid container>
        <Grid item xs={0} md={4} />

        <Grid item xs={0} md={4}>
          <List>
            {groupedTags ? (
              groupedTags.map(([letter, tags]) => (
                <List key={letter} sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText>{letter.toUpperCase()}</ListItemText>
                  </ListItem>
                  <ListItem sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {tags.map((tag, index) => (
                      <TagChip key={index} tag={tag} />
                    ))}
                  </ListItem>
                </List>
              ))
            ) : (
              <CircularProgress />
            )}
          </List>
        </Grid>

        <Grid item xs={0} md={4} />
      </Grid>
    </Paper>
  );
}
