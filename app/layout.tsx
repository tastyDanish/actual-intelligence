import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConversationProvider } from "@/hooks/conversations-provider";
import { AppSettingsProvider } from "@/hooks/app-settings-provider";
import { ActualSidebar } from "@/components/actual-sidebar";
import { Toaster } from "@/components/ui/toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Actual Intelligence",
  description: "Communicate with something real and authentic",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={geistSans.className}
      suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <AppSettingsProvider>
            <SidebarProvider>
              <ConversationProvider>
                <ActualSidebar />
                <main className="min-h-dvh flex flex-col items-center w-full justify-between max-h-screen overflow-hidden">
                  {children}

                  <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-1">
                    <p>You're talking to a real person here. Be nice!</p>
                    <ThemeSwitcher />
                  </footer>
                </main>
                <Toaster />
              </ConversationProvider>
            </SidebarProvider>
          </AppSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
