import { render } from "@testing-library/react";

import StoreProvider from "@/contextProviders/StoreProvider";

const ProviderWrapper = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

// Custom render method with the Redux store provider wrapper
// May have to update in the future with more provider wrappers as the project grows
const customRender = (ui, options) =>
  render(ui, { wrapper: ProviderWrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
