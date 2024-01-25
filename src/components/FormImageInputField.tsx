import Compressor from "compressorjs";
import { useContext } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { MessageContext } from "../contexts/MessageContext";

interface FormTextFieldProps<T extends FieldValues> {
  control: Control<T, unknown>;
  name: Path<T>;
  label: string;
  setValue: UseFormSetValue<T>;
}

/**
 * I was not able to enforce strict typing on Paths and Values
 * Thus, make sure the given "name" matches type Blob
 * @param props
 * @returns
 */
export function FormImageInputField<T extends FieldValues>(
  props: FormTextFieldProps<T>,
) {
  const { control, label, name, setValue } = props;
  const { pushMessage } = useContext(MessageContext);

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <Button
          component="label"
          variant="contained"
          color={error ? "error" : "secondary"}
          endIcon={<CloudUploadIcon />}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={async (event) => {
              const files = event.target.files;
              if (files == null || files.length == 0) {
                return;
              }

              // ignore other pictures for now
              const file = files[0];
              // We reduce the quality of picture to reduce storage usage
              // a 20% quality seems enough from my tests, especially on phone screens
              new Compressor(file, {
                quality: 0.2,
                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                success(compressedFile) {
                  // @ts-expect-error I was not able to enforce strict typing on name as typed subset of paths
                  setValue(name, compressedFile);
                },
                error(err) {
                  pushMessage(err.message, "error");
                },
              });
            }}
          />
          {label}
        </Button>
      )}
    />
  );
}
