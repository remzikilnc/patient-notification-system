import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Patient Notification System",
  description: "Patient Notification System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full w-full relative">{children}</body>
    </html>
  );
}
