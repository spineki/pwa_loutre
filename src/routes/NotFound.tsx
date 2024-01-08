import { useRouteError } from "react-router-dom";

export function NotFound() {
    const error = useRouteError() as any;
    console.error("NotFound:", error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}