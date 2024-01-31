import { useRef } from "react";

export const useCountRender = (name: string, only?: string) => {
  const counter = useRef(0);
  counter.current++;
  if ((only && name == only) || !only) {
    console.log(`${name} rendered ${counter.current} times`);
  }
};
