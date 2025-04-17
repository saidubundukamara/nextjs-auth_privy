'use client';
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {PrivyProvider} from '@privy-io/react-auth';
import { NavBar } from "@/components/general/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const app_id = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
   const client_id = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID;
  
  return (
    <PrivyProvider
    appId={app_id}
    // clientId={client_id}
    config={{
      embeddedWallets: {
          solana: {
              createOnLogin: 'users-without-wallets',
          },
      },
  }}
    >
      <html lang="en">
        
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
    </PrivyProvider>
  );
}
