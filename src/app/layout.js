import "./globals.css";

export const metadata = {
  title: "YAML Dynamic UI",
  description: "A model-driven UI system powered by YAML",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
