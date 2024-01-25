import { useTheme } from "@mui/material/styles";
import { pgcd } from "../utils/numbers";
import { CSSProperties } from "react";

interface ExtractedToken {
  value: string;
  type: "number" | "string" | "fraction";
}

function extractNumberFromString(
  string_with_numbers: string,
): ExtractedToken[] {
  const patt = /([0-9]+\s*\/\s*[0-9]+)|([0-9]+[,.]?[0-9]*)/g;

  const found_numbers = [];
  let match = null;
  while ((match = patt.exec(string_with_numbers)) != null) {
    found_numbers.push([match.index, patt.lastIndex]);
  }
  const extracted_array: ExtractedToken[] = [];
  let last_index = 0;
  for (const occurence of found_numbers) {
    const inter_word = string_with_numbers.substring(last_index, occurence[0]);
    if (inter_word !== "") {
      extracted_array.push({ type: "string", value: inter_word });
    }

    const extracted_number = string_with_numbers.substring(
      occurence[0],
      occurence[1],
    );

    const splitting = extracted_number.split("/");
    if (splitting.length == 2) {
      extracted_array.push({
        type: "fraction",
        value: splitting[0].trim() + "/" + splitting[1].trim(),
      });
    } else {
      extracted_array.push({ type: "number", value: extracted_number });
    }

    last_index = occurence[1];
  }

  const inter_word = string_with_numbers.substring(
    last_index,
    string_with_numbers.length,
  );
  if (inter_word !== "") {
    extracted_array.push({ type: "string", value: inter_word });
  }

  return extracted_array;
}

interface ColouredNumberTextProps {
  text: string;
  multiplicator: number;
  style?: CSSProperties;
}

/**
 * Display a text containing number highlighting them and appying the multiplicator to the numbers
 * @param string_with_numbers
 * @returns
 */
export function ColouredNumberText(props: ColouredNumberTextProps) {
  const { multiplicator, style } = props;
  const theme = useTheme();

  const tokens: ExtractedToken[] = extractNumberFromString(props.text);

  const accentColor = theme.palette.secondary.main;

  return (
    <span style={{ ...style, flexShrink: 1 }}>
      {tokens.map((token: ExtractedToken, index: number) => {
        if (token.type === "number") {
          const number_to_display = parseFloat(
            (
              Math.round(multiplicator * parseFloat(token.value) * 100) / 100
            ).toFixed(2),
          );
          return (
            <span
              key={index.toString()}
              style={{ color: accentColor, flexShrink: 1 }}
            >
              {" "}
              {number_to_display}
            </span>
          );
        } else if (token.type === "fraction") {
          const splitting = token.value.split("/");
          let numerator: string | number = parseFloat(splitting[0]);
          let denominator: string | number = parseFloat(splitting[1]) * 100;

          numerator = Math.round(multiplicator * numerator * 100);

          const myPGCD = pgcd(numerator, denominator);
          numerator = (numerator / myPGCD).toFixed(0);
          denominator = (denominator / myPGCD).toFixed(0);

          if (denominator === "1") {
            return (
              <span
                key={index.toString()}
                style={{ color: accentColor, flexShrink: 1 }}
              >
                {" "}
                {numerator}
              </span>
            );
          } else {
            return (
              <span
                key={index.toString()}
                style={{ color: accentColor, flexShrink: 1 }}
              >
                {" "}
                {numerator} / {denominator}
              </span>
            );
          }
        } else {
          return (
            <span
              key={index.toString()}
              style={{ color: theme.palette.text.primary, flexShrink: 1 }}
            >
              {" "}
              {token.value}{" "}
            </span>
          );
        }
      })}
    </span>
  );
}
