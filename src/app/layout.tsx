import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { NavigationBar } from "./_components/navigation-bar";
import { auth } from "auth";

export const metadata = {
  title: "Guess Their Networth",
  description: "Guess Their Networth",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-screen flex flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <TRPCReactProvider>
          <NavigationBar session={session} />
          <div className="flex-grow">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
