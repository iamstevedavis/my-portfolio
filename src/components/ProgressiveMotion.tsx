import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { motion as framerMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type MotionTag = "div" | "span" | "h1" | "p" | "a" | "li";

function createProgressiveMotion<Tag extends MotionTag>(tag: Tag) {
  const Component = framerMotion[tag] as ComponentType<HTMLMotionProps<Tag>>;

  function ProgressiveMotion(props: HTMLMotionProps<Tag>) {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setEnabled(!preference.matches);
      update();
      preference.addEventListener("change", update);
      return () => preference.removeEventListener("change", update);
    }, []);

    return (
      <Component
        {...props}
        // SSR and the first hydration render stay visible. Remount only after
        // hydration so Framer applies the original animation starting state.
        key={enabled ? "animated" : "static"}
        initial={enabled ? props.initial : false}
        animate={enabled ? props.animate : undefined}
        whileInView={enabled ? props.whileInView : undefined}
        whileHover={enabled ? props.whileHover : undefined}
        whileTap={enabled ? props.whileTap : undefined}
      />
    );
  }

  ProgressiveMotion.displayName = `ProgressiveMotion.${tag}`;
  return ProgressiveMotion;
}

export const motion = {
  div: createProgressiveMotion("div"),
  span: createProgressiveMotion("span"),
  h1: createProgressiveMotion("h1"),
  p: createProgressiveMotion("p"),
  a: createProgressiveMotion("a"),
  li: createProgressiveMotion("li"),
};
