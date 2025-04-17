"use client";
import { useState, useEffect } from "react";
import { usePrivy, useLoginWithEmail } from "@privy-io/react-auth";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {useSolanaWallets} from '@privy-io/react-auth/solana';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { WalletDrawer } from "./WalletDrawer";


export function NavBar() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const { sendCode, loginWithCode, state } = useLoginWithEmail();
  const [showEmailInput, setShowEmailInput] = useState(false);
  const { ready, authenticated, user, logout } = usePrivy();
  const { createWallet } = useSolanaWallets();
  
  useEffect(() => {
    if (state.status === "error") {
      setCode(""); // clear OTP input
    }
    if (code.length === 6 && state.status === "awaiting-code-input") {
      loginWithCode({ code });
      
    }
  }, [code, state.status]);

  const disableLogout = !ready || (ready && !authenticated);

  console.log(user)

  if(authenticated && !user?.wallet){
    createWallet();
  }

  return (
    <nav className="fixed top-0 w-full h-16 bg-white shadow-sm flex items-center px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and left side */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <div className="bg-blue-600 text-white font-bold text-lg w-8 h-8 rounded flex items-center justify-center">
              BP
            </div>
            <span className="ml-1 font-semibold text-gray-800">earn</span>
          </Link>

          <div className="hidden md:flex ml-4">
            <input
              type="text"
              className="rounded-full bg-gray-100 px-4 py-2 text-sm w-64 focus:outline-none"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/bounties" className="text-gray-600 hover:text-gray-900">
            Bounties
          </Link>
          <Link href="/projects" className="text-gray-600 hover:text-gray-900">
            Projects
          </Link>
          <Link href="/grants" className="text-gray-600 hover:text-gray-900">
            Grants
          </Link>
        </div>

        {/* Account info */}
        {ready && !authenticated && (
          <Dialog>
            <DialogTrigger>Login</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="font-bold text-2xl">You're one step away</p>
                    <p className="text-sm text-gray-500">
                      From earning in global standards
                    </p>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  {!showEmailInput ? (
                    <div className="flex flex-col items-center justify-center gap-4 mt-9 ">
                      <Button
                        className={`w-3/4 ${buttonVariants({
                          variant: "secondary",
                        })}`}
                      >
                        Continue with Google
                      </Button>
                      <div className="flex flex-row">
                        <p>OR</p>
                      </div>
                      <Button
                        className={`w-3/4 ${buttonVariants({
                          variant: "default",
                        })}`}
                        onClick={() => setShowEmailInput(true)}
                      >
                        Continue with Gmail
                      </Button>
                    </div>
                  ) : (
                    <>
                      {(state.status === "initial" ||
                        state.status === "error" ||
                        state.status === "sending-code") && (
                        <div className="flex flex-col items-center justify-center gap-4 mt-9 w-full">
                          <Input
                            required
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Enter Email address"
                          />
                          <Button
                            className={`w-3/4 ${buttonVariants({
                              variant: "default",
                            })}`}
                            onClick={() => sendCode({ email })}
                          >
                            {state.status === "sending-code"
                              ? "Sending..."
                              : "Continue with Gmail"}
                          </Button>
                        </div>
                      )}
                      {(state.status === "awaiting-code-input" ||
                        state.status === "submitting-code") && (
                        <div className="flex flex-col items-center justify-center gap-4 mt-9 w-full">
                          <p className="font-bold text-gray-500">Enter OTP</p>

                          <InputOTP
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e)}
                            pattern={REGEXP_ONLY_DIGITS}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                          <Button
                            className={`w-3/4 ${buttonVariants({
                              variant: "default",
                            })}`}
                            onClick={() => loginWithCode({ code })}
                          >
                            {state.status === "submitting-code"
                              ? "Sending..."
                              : "Continue with Gmail"}
                          </Button>
                        </div>
                      )}
                      {state.status === "error" && (
                        <p className="text-sm text-red-500">
                          {state.error?.message ?? "Something went wrong"}
                        </p>
                      )}
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        {ready && authenticated && (
          <div className="flex items-center space-x-4">
            <div className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center">
              {user && (
                <WalletDrawer wallet={user.wallet} />
              )}
            
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                <p>img</p>
              </div>
              <Popover>
                <PopoverTrigger>Saidu</PopoverTrigger>
                <PopoverContent className="mt-4">
                  <div className="flex flex-col gap-3">
                    <Link href="">Profile</Link>
                    <Link href="">Edit Profile</Link>
                    <hr/>
                    
                    <Link href="">Get Help</Link>
                    <button className={`${buttonVariants({})}`} disabled={disableLogout} onClick={logout}>Logout</button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* <span className="text-sm font-medium">Saidu</span> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
