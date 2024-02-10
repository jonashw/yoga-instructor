import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { PoseDataProvider } from './PoseDataContext.tsx';
import RoutineRoute from './RoutineRoute.tsx';
import PoseListRoute from "./PoseListRoute.tsx";
import RoutineListRoute from './RoutineListRoute.tsx';
import YogaAppBar from './YogaAppBar.tsx';
import { Box } from '@mui/material';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <Box>
        <YogaAppBar />
        <Outlet />
      </Box>,
    children: [
      {
        index: true,
        element: <RoutineListRoute/>
      },
      {
        path: "/poses",
        element: <PoseListRoute/>,
      },
      {
        path: "/routine/:routineId",
        element: <RoutineRoute/>,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <PoseDataProvider>
        <RouterProvider router={router} />
      </PoseDataProvider>
  </React.StrictMode>
);