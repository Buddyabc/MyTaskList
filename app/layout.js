import { ContextProvider } from "@/Components/Clients";
import "../Style/app.scss";
import Header from "./Header";

export const metadata={
      title : "Todo-App",
      description : "dynamic site made in NextJS"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ContextProvider>
          <>
        <Header/>
        {children}
          </>
        </ContextProvider>
        </body>
    </html>
  )
}
