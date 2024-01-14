//courtesy https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Share_data_between_apps

import { useCallback, useEffect, useState } from "react";

import { dateToPathCompatibleIsoFormat } from "../utils/time";
import { importRecipesFromFileContent } from "../models/controllers";

// I was not able to find a typescript type for this, so doing it by hand
interface LaunchParams {
  targetUrl: string;
  files: Array<FileSystemFileHandle>;
}
interface LaunchQueue {
  setConsumer: (consumer: (launchParams: LaunchParams) => void) => void;
}

function createTxtFileFromObject(fileName: string, object: object): File {
  const jsonContent = JSON.stringify(object, null, 2);
  const file = new File([jsonContent], `${fileName}.txt`, {
    type: "text/plain",
  });
  return file;
}

function getAllRecipesFileName() {
  const now = new Date();
  const formattedDate = dateToPathCompatibleIsoFormat(now);
  const fileName = `all_recipes_${formattedDate}`;
  return fileName;
}

export function useSharing() {
  const [browserCanShareFiles, setBrowserCanShareFiles] = useState(true);

  useEffect(() => {
    if (!navigator.share || !navigator.canShare) {
      setBrowserCanShareFiles(false);
      return;
    }

    // Create some test data with a file, to check if the browser supports sharing it.
    const testFile = createTxtFileFromObject("test", { test: "test" });
    const data = { files: [testFile] };

    setBrowserCanShareFiles(navigator.canShare(data));
  }, []);

  const shareFile = useCallback(
    async (object: object) => {
      if (browserCanShareFiles) {
        try {
          const fileName = getAllRecipesFileName();
          const file = createTxtFileFromObject(fileName, object);
          if (navigator.canShare({ files: [file] })) {
            const data = {
              title: fileName,
              files: [file],
            };

            await navigator.share(data);
          }
        } catch (err) {
          alert(`The file could not be shared: ${err}`);
        }
      } else {
        alert("Browser cannot share file");
      }
    },
    [browserCanShareFiles]
  );

  const downloadFile = useCallback((object: object) => {
    const link = document.createElement("a");
    const fileName = getAllRecipesFileName();
    link.download = fileName;
    const file = createTxtFileFromObject(fileName, object);
    link.href = window.URL.createObjectURL(file);
    link.click();
    link.remove();
  }, []);

  const importFile = useCallback(async (): Promise<
    string | { error: unknown }
  > => {
    try {
      const [handle] = await window.showOpenFilePicker({ multiple: false });
      const file = await handle.getFile();
      const content = await file.text();

      return content;
    } catch (error: unknown) {
      console.error("An error occured while opening file from Picker");
      return { error };
    }
  }, []);

  const receiveFile = useCallback(async () => {
    if ("launchQueue" in window) {
      const launchQueue = window.launchQueue as LaunchQueue;

      // adding a consumer to handle file import
      launchQueue.setConsumer(async (launchParams: LaunchParams) => {
        if (launchParams.files && launchParams.files.length) {
          for (const fileHandle of launchParams.files) {
            // getting file content
            const file = await fileHandle.getFile();
            const fileText = await file.text();

            //saving to database
            await importRecipesFromFileContent(fileText);
          }
        }
      });
    }
  }, []);

  return {
    browserCanShareFiles,
    downloadFile,
    importFile,
    receiveFile,
    shareFile,
  };
}
