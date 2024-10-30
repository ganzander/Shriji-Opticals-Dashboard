import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
