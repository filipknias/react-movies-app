import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from '@/pages/Home';
import { Provider } from "@/components/ui/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Container, Theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieDetails from '@/pages/MovieDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
    },
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Theme appearance="light">
          <Container py={20}>
            <BrowserRouter>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/movies/:id" element={<MovieDetails />} />
              </Routes>
            </BrowserRouter>
          </Container>
        </Theme>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
