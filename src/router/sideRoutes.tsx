import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { RoutePath } from "./routes.ts";

export type SideRouteType = {
  url: string;
  text: string;
  IconTag: JSX.Element;
};

export const routes: SideRouteType[] = [
  {
    url: RoutePath.Home,
    text: "Home",
    IconTag: <HomeIcon />,
  },
  {
    url: RoutePath.Collection,
    text: "My Recipe Collection",
    IconTag: <AutoStoriesIcon />,
  },
  {
    url: RoutePath.Search,
    text: "Find a Recipe",
    IconTag: <SearchIcon />,
  },
];
