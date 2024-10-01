import { ThemeProvider } from "@mui/material";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Inter } from "next/font/google";
import theme from "@/utils/muiTheme";

export const metadata = {
  title: "VosynVerse",
  description: "",
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
