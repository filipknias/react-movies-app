import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from "@/components/ui/provider.tsx";
import { Theme } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <Theme appearance="light">
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Theme>
    </Provider>
  )
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react';
export { customRender as render };