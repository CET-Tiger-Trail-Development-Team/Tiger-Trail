import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Onboarding } from "./components/Onboarding";
import { MapView } from "./components/Map";
import { ProfileView } from "./components/Profile";
import { ClubsView } from "./components/Clubs";
import { CalendarView } from "./components/Calendar";
import { FieldGuideView } from "./components/FieldGuide";
import { CampusMap } from "./components/CampusMap";

console.log("Router loaded with mentor/trail route");
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: MapView },
      { path: "onboarding", Component: Onboarding },
      { path: "profile", Component: ProfileView },
      { path: "clubs", Component: ClubsView },
      { path: "calendar", Component: CalendarView },
      { path: "guide", Component: FieldGuideView },
      { path: "campus", Component: CampusMap },
      { path: "advisor/trail", Component: MapView },
      { path: "mentor/trail", Component: MapView },
    ],
  },
]);
