import "@/styles/globals.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Patient Notification System",
  description: "Patient Notification System",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="h-full bg-body w-full relative">
        <ToastContainer theme="dark" />
        {children}
      </body>
    </html>
  );
}
