import { Provider } from "react-redux";

import theme from "@/utils/muiTheme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter } from "next/font/google";

import store from "../../store";

import "./globals.css";

export const metadata = {
  title: "VosynVerse",
  description: "VosynVerse application",
};

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["cyrillic", "greek", "latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
