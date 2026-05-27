import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import appCss from "../styles.css?url";

const SITE_URL = "https://stellalounge39.vercel.app";
const SITE_NAME = "Stella Cafe & Lounge";
const SITE_DESC =
  "Kırklareli Merkez'in en seçkin cafe ve lounge deneyimi. Premium kahve, imza içecekler, gurme lezzetler ve lüks atmosfer.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-light text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Sayfa bulunamadı</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary/90"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          Sayfa yüklenemedi
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bir hata oluştu. Lütfen sayfayı yenileyin.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary/90"
          >
            Tekrar Dene
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
          >
            Ana Sayfa
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_NAME },
      { name: "description", content: SITE_DESC },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: SITE_NAME },
      { property: "og:description", content: SITE_DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/stella-logo.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "tr_TR" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_NAME },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:image", content: `${SITE_URL}/stella-logo.png` },
      // Geo
      { name: "geo.region", content: "TR-39" },
      { name: "geo.placename", content: "Kırklareli" },
      { name: "geo.position", content: "41.7351;27.2201" },
      { name: "ICBM", content: "41.7351, 27.2201" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", href: "/stella-logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/stella-logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: SITE_NAME,
          image: `${SITE_URL}/stella-logo.png`,
          url: SITE_URL,
          telephone: "+90 555 000 0000",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cumhuriyet Meydanı, No: 1",
            addressLocality: "Kırklareli Merkez",
            addressRegion: "Kırklareli",
            postalCode: "39000",
            addressCountry: "TR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "41.7351",
            longitude: "27.2201",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
              opens: "09:00",
              closes: "00:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Friday", "Saturday", "Sunday"],
              opens: "09:00",
              closes: "02:00",
            },
          ],
          servesCuisine: ["Turkish", "Italian", "International"],
          priceRange: "₺₺",
          hasMenu: `${SITE_URL}/menu`,
          sameAs: ["https://www.instagram.com/stella_cafe_lounge/"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <Outlet />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
