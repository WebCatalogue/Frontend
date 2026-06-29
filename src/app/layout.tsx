import type { Metadata } from "next";
import { Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/constants";
import { AppProviders } from "@/providers/app-providers";
import { ThemeProvider } from "@/themes";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: [
      { url: "/brand/logo-dark.png", type: "image/png" },
      {
        url: "/brand/logo-light.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
    ],
    apple: "/brand/logo-dark.png",
  },
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    type: "website",
    images: [{ url: "/brand/logo-dark.png", width: 512, height: 512 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:rounded-lg focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <AppProviders>
            <ToastProvider>{children}</ToastProvider>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
