"use client";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

type Wallet = {
  address: string;
  chainType: string;
  connectorType: string;
  delegated: boolean;
  id: string | null;
  imported: boolean;
  recoveryMethod: string;
  walletClientType: string;
  walletIndex: number;
};

type WalletDrawerProps = {
  wallet: Wallet;
};

export function WalletDrawer({ wallet }: WalletDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <div className="flex items-center gap-2">
          <span>$0</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="right-0 top-0 h-full w-80 max-w-full fixed bg-white shadow-lg transition-transform duration-300 transform translate-x-full data-[state=open]:translate-x-0">
        <DrawerHeader>
          <DrawerTitle>
            Saidu's Wallet <span className="font-light text-sm">{wallet.address.slice(0, 4)}...
            {wallet.address.slice(-5)}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(wallet.address)}
              title="Copy address"
            >
              📋
            </Button>
          </DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-col gap-2">
              <p className="text-gray-500">
                You will receive payments in this wallet each time you win.
                Learn more about what you can do with your rewards.
              </p>
              <hr />
              <p className="font-bold text-2xl text-gray-950 mt-3">
                $0 <span className="text-gray-400 text-sm">USDC</span>
              </p>
              <p className="font-medium text-xl text-gray-500">Balance</p>
              <Button>Withdraw</Button>
            </div>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
