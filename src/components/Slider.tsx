import { useState, Children, useEffect, useMemo, useCallback } from "react";

/**
 * Children.toArray
 *
 */

const Slider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [current, set] = useState<number>();

  const _children = Children.toArray(children);

  const total = useMemo(() => _children.length, []);

  const next = useCallback(() => {
    set((v) => {
      if (total == null) return undefined;
      if (v == null) return 0;
      return (v + 1) % total;
    });
  }, [total]);

  useEffect(() => {
    const timer = setInterval(next, 1000);

    return () => clearTimeout(timer);
  }, [next]);

  if (current == null) return <></>;

  const bullets = Array<string>(total).fill("○");
  bullets[current] = "●";

  return (
    <>
      {_children[current!]}
      <br />
      <ul
        style={{
          display: "flex",
          listStyle: "none",
        }}
      >
        {bullets.map((v, i) => (
          <li key={i}>
            <h1>{v}</h1>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Slider;

// Usage

/*
 * import Slider from "./components/Slider";
 *
 * function App() {
 *   return (
 *     <Slider>
 *       <h1>1</h1>
 *       <h1>2</h1>
 *       <h1>3</h1>
 *       <h1>4</h1>
 *       <h1>5</h1>
 *     </Slider>
 *   );
 * }
 *
 * export default App;
 */
