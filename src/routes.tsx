import {
  Outlet,
  RouteObject
} from "react-router-dom";
import RoutineRoute from './RoutineRoute.tsx';
import RoutinePlayRoute from './RoutinePlayRoute.tsx';
import PoseListRoute from "./PoseListRoute.tsx";
import RoutineListRoute from './RoutineListRoute.tsx';
import YogaAppBar from './YogaAppBar.tsx';
import { Box } from '@mui/material';
import ComponentGalleryRoute from "./ComponentGalleryRoute.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Box>
      <YogaAppBar />
      <Outlet />
    </Box>,
    children: [
      {
        index: true,
        element: <RoutineListRoute />
      },
      {
        path: "/poses",
        element: <PoseListRoute />,
      },
      {
        path: "/routine/:routineId",
        element: <RoutineRoute />
      },
      {
        path: "/routine/:routineId/play",
        element: <RoutinePlayRoute />,
      },
      {
        path: "/components",
        element: <ComponentGalleryRoute />,
      },
    ]
  }
];
