import type { Metadata } from "next";
import "./globals.css";
import Titulo from "./components/Titulo";
import ClienteProvider from "./context/ClienteContext";

export const metadata: Metadata = {
  title: "AvenidaVídeo",
  description: "Editora Indie. Publicação e Vendas de Livros",
  keywords: ["Editora", "Livros", "Avaliações de Livros"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="./logo.png" type="image/x-icon" />
      </head>
      <body>
        <ClienteProvider>
          <Titulo />
          {children}
        </ClienteProvider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  );
}
