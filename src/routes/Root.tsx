import { useContext, useEffect } from "react";
import { DrawerContext } from "../contexts/drawer_context";

export const RouteRootName = "Root";

export function Root() {

    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteRootName);
    }, [setCurrentRoute])

    return (
        <>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p
                style={{ "fontFamily": "AtomicAge-Regular" }}>
                Atomic age font
            </p>
            <p
                style={{ "fontFamily": "Cookie-Regular" }}>
                Cookie font
            </p>

            <a href={`/something`}>404 page</a>
        </>
    );
}