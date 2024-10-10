"use client";
import { FC, ReactNode, useState } from "react";
import { Sidebar, SidebarBody } from "@/components/sidebar/sidebar";
import SidebarContent from "@/components/sidebar/sidebar-content";
import { IconBrandTabler } from "@tabler/icons-react";
import { Bean, Building, FileQuestion, UserRoundCheck } from "lucide-react";
import { SidebarLink } from "@/components/sidebar/sidebar";
import { ToggleTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
  contentAtCenter?: boolean;
}

export const metadata = {
  title: "Farmacie Dashboard",
  description: "Agronomics Farmacie Dashboard",
};

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  contentAtCenter,
}: any) => {
  const [open, setOpen] = useState(false);
  const dashboardLinks = [
    {
      label: "Products",
      href: "/products",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Seeds",
      href: "/seeds",
      icon: (
        <Bean className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Managers",
      href: "/managers",
      icon: (
        <UserRoundCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Franchises",
      href: "/franchises",
      icon: (
        <Building className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Suggestions",
      href: "/suggestions",
      icon: (
        <FileQuestion className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-[100vh]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <SidebarContent links={dashboardLinks} open={open} />
          <div>
            <ToggleTheme />
            <SidebarLink
              className="!px-0"
              link={{
                label: "",
                href: "#",
                icon: (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="h-8 w-8 border-[2px] border-primary flex-shrink-0 rounded-full outline-none focus:outline-none">
                        <AvatarImage src="/assets/images/user.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="right"
                      className="mb-3 ml-2 py-2"
                    >
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex flex-1">
        <div
          className={cn(
            "p-2 md:px-10 md:py-8 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-farmacieWhite dark:bg-farmacieLightPrimary flex flex-col gap-2 flex-1 w-full min-h-full",
            contentAtCenter && "justify-center items-center"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
