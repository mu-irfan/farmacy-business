"use client";
import { FC, ReactNode, useState } from "react";
import { Sidebar, SidebarBody } from "@/components/sidebar/sidebar";
import SidebarContent from "@/components/sidebar/sidebar-content";
import { IconBrandTabler } from "@tabler/icons-react";
import { Bean, Building, FileQuestion } from "lucide-react";
import { SidebarLink } from "@/components/sidebar/sidebar";
import { ToggleTheme } from "@/components/theme/theme-provider";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(true);
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
    <div className="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-[100vh]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <SidebarContent links={dashboardLinks} />
          <div>
            <ToggleTheme />
            <SidebarLink
              link={{
                label: "Irfan",
                href: "#",
                icon: (
                  <Image
                    src="/assets/images/user.webp"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={200}
                    height={200}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex flex-1">
        <div
          className={cn(
            "p-2 md:px-10 md:py-8 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-farmacieWhite dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full",
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
