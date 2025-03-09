import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from '@/pages/Home';
import MovieDetails from '@/pages/MovieDetails';
import NotFound from '@/pages/NotFound';
import { Provider } from "@/components/ui/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Container, Theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClientConfig } from '@/config/queryClient';

const queryClient = new QueryClient(queryClientConfig);

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
                  <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
          </Container>
        </Theme>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
