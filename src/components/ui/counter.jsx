import React, { useEffect, useState } from "react";
import { animate } from "framer-motion";

const Counter = ({ from = 0, to, suffix = "", duration = 2, decimals = 0 }) => {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      // fast at start, slow at end
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        const formatted = Number(latest.toFixed(decimals));
        setValue(formatted);
      },
    });

    return () => controls.stop();
  }, [from, to, duration, decimals]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};

export default Counter;
