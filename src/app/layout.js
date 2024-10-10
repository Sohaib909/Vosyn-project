import theme from "@/utils/muiTheme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter } from "next/font/google";

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
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
