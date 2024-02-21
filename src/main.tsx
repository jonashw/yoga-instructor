import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { PoseDataProvider } from './PoseDataContext.tsx';
import "./main.scss";
import { routes } from './routes.tsx';
import {  UserInteractedProvider } from './UserInteractedContext.tsx';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserInteractedProvider>
      <PoseDataProvider>
        <RouterProvider router={router} />
      </PoseDataProvider>
    </UserInteractedProvider>
  </React.StrictMode>
);