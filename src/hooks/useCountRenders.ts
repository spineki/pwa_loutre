import { useRef } from "react";

/**
 * Debug hook to get the number of component rerenders
 * @param name the name to display in the console
 * @param only if only is given, console.log will only be called in name === only
 * This is useful if you only whant the number of rerenders of one component in a list
 */
export const useCountRender = (name: string, only?: string) => {
  const counter = useRef(0);
  counter.current++;
  if ((only && name == only) || !only) {
    console.log(`${name} rendered ${counter.current} times`);
  }
};
