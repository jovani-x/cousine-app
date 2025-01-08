import { Breakpoint } from "@mui/material";

export type ResponsiveStyleValue<T> =
  | T
  | Array<T | null>
  | {
      [key in Breakpoint]?: T | null;
    };
