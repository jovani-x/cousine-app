import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

export type SideRouteType = {
  url: string;
  text: string;
  IconTag: JSX.Element;
};

export const routes: SideRouteType[] = [
  {
    url: "/",
    text: "Home",
    IconTag: <HomeIcon />,
  },
  {
    url: "/collection",
    text: "My Recipe Collection",
    IconTag: <AutoStoriesIcon />,
  },
  {
    url: "/find-recipe",
    text: "Find a Recipe",
    IconTag: <SearchIcon />,
  },
];
