import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000, gcTime: 10 * (60 * 1000) } },
}); //gc-> garbage collector if the query isnt used for 10 mins, it deletes unneccessary data..
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
