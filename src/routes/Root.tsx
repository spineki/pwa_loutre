import { useContext, useEffect } from "react";

import Paper from "@mui/material/Paper";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { DrawerContext } from "../contexts/drawer_context";
import { RecipeCard } from "../components/RecipeCard";
import { Recipe } from "../models/Recipe";

export const RouteRootName = "Root";

const fakeRecipes: Recipe[] = [
    {
        id: 0,
        name: "Chicken and eggs",
        pictures: ["/logo192.png"],
        time: {
            preparation: 1,
            baking: 2,
            total: 3
        },
    },
    {
        id: 1,
        name: "Apples and Peaches",
        pictures: ["/logo512.png"],
        time: {
            preparation: 2,
            baking: 3,
            total: 4
        },
    },
];

function renderRow(props: ListChildComponentProps) {
    const { index } = props;
    let { name, pictures, time } = fakeRecipes[index];
    return (
        <RecipeCard key={index} name={name} picture={pictures[0]} time={time} />
    );
}

export function Root() {
    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteRootName);
    }, [setCurrentRoute])

    return (
        <Paper sx={{
            height: "100%",
            p: 2
        }}>
            <AutoSizer>
                {({ height, width }: { height: number, width: number }) => (
                    <FixedSizeList
                        height={height}
                        width={width}
                        itemSize={100}
                        itemCount={fakeRecipes.length}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                )}
            </AutoSizer>
        </Paper>
    );
}