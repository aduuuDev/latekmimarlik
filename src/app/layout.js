import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Prague Architecture",
  description: "Professional architecture and design services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />

        {/* Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700"
        />

        {/* CSS Files */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/swiper.min.css" />
        <link rel="stylesheet" href="/css/slick.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/et-line-font.css" />
        <link rel="stylesheet" href="/css/prague-icons.css" />
        <link rel="stylesheet" href="/css/simple-line-icons.css" />
        <link rel="stylesheet" href="/css/before-after.min.css" />
        <link rel="stylesheet" href="/css/unit-test.css" />
        <link rel="stylesheet" href="/css/google_map.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
