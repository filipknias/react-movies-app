import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "@/components/ui/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Container, Theme } from "@chakra-ui/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Theme appearance="light">
        <Container py={20}>
          <BrowserRouter>
              <Routes>
                <Route index element={<App />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </Theme>
    </Provider>
  </StrictMode>,
)
