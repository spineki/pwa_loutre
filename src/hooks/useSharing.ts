//courtesy https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Share_data_between_apps

import { useCallback, useEffect, useState } from "react";

function createJSonFileFromObject(fileName: string, object: object): File {
  const jsonContent = JSON.stringify(object);
  const file = new File([jsonContent], fileName, { type: "application/json" });
  return file;
}

export function useSharing() {
  const [browserCanShareFiles, setBrowserCanShareFiles] = useState(true);
  useEffect(() => {
    if (!navigator.share || !navigator.canShare) {
      setBrowserCanShareFiles(false);
      return;
    }

    // Create some test data with a file, to check if the browser supports sharing it.
    const testFile = createJSonFileFromObject("test", { test: "test" }); //new File(["foo"], "foo.txt", { type: "text/plain" });
    const data = { files: [testFile] };

    setBrowserCanShareFiles(navigator.canShare(data));
  }, []);

  const shareFile = useCallback(
    async (object: object) => {
      if (browserCanShareFiles) {
        try {
          const fileName = "all_recipes"; // todo, add date here

          const file = createJSonFileFromObject(fileName, object);
          const data = {
            title: fileName + ".json",
            files: [file],
          };
          if (navigator.canShare(data)) {
            alert("can share data");
            await navigator.share(data);
          } else {
            alert("navigator cannot share data");
          }

          alert("The file was successfully shared");
        } catch (err) {
          alert(`The file could not be shared: ${err}`);
        }
      } else {
        alert("Browser cannot share file");
      }
    },
    [browserCanShareFiles]
  );

  return { browserCanShareFiles, shareFile };
}
