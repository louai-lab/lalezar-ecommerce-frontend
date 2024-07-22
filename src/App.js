import "./App.css";
import AppRouter from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
import FavIcon from "./Assets/lalezar.png";
import { useProductsStore } from "./Zustand/Store";
import { useCategoriesStore } from "./Zustand/Store";
import { useEffect } from "react";
import { useClientsStore } from "./Zustand/Store";

const queryClient = new QueryClient();

function App() {
  const { getAllProducts } = useProductsStore();
  const { getAllCategories } = useCategoriesStore();
  const { getAllClients } = useClientsStore();

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllClients();
  }, [getAllProducts, getAllCategories, getAllClients]);

  return (
    <div className="App">
      <HelmetProvider>
        <Helmet>
          <link rel="shortcut icon" href={FavIcon} type="image/x-icon" />
          <title>Lalezar</title>
        </Helmet>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
