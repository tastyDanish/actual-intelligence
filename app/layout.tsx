import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ConversationProvider } from "@/hooks/conversations-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
          <SidebarProvider>
            <ConversationProvider>
              <AppSidebar />
              <main className="min-h-screen flex flex-col items-center w-full justify-between max-h-screen overflow-hidden max-w-screen">
                {children}

                <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-1">
                  <p>You're talking to a real person here. Be nice!</p>
                  <ThemeSwitcher />
                </footer>
              </main>
            </ConversationProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
