import { ThemeProvider } from "@/components/theme/ToggleTheme";
import { FC, ReactNode } from "react";

export const metadata = {
  title: "Farmacie Dashboard",
  description: "Agronomics Farmacie Dashboard",
};

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
