import React from "react";
import listStyles from "./styles.module.scss";

// isOL:
// - true: <ol>
// - false: <ul>
export const List = ({
  items,
  isOL,
  extraClassname,
  style,
}: {
  items: { id: string; content: React.ReactNode }[];
  isOL?: boolean;
  extraClassname?: string;
  style?: React.CSSProperties;
}) => {
  if (!items?.length) return null;

  const classes = `${listStyles.list} ${extraClassname ?? ""}`;
  const renderedItems = items.map(({ id, content }) => (
    <li key={id}>{content}</li>
  ));

  if (isOL) {
    return <ol className={classes}>{renderedItems}</ol>;
  }

  return (
    <ul className={classes} style={style}>
      {renderedItems}
    </ul>
  );
};
