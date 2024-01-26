// courtesy https://stackoverflow.com/a/60458593

import { useEffect, useState } from "react";

export function useProgressiveImage(src: string) {
  const [sourceLoaded, setSourceLoaded] = useState<null | string>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
}
