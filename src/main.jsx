import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import AddTransactionPage from "./pages/AddTransactionPage.jsx";

// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/tambah',
        element: <AddTransactionPage />
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
