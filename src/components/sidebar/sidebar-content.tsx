import Image from "next/image";
import { SidebarLink } from "./sidebar";

const SidebarContent = ({ links }: { links: Link[] }) => (
  <div className="mt-6 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    <Image
      src="/assets/images/logo.png"
      className="w-16 flex-shrink-0 rounded-full"
      width={500}
      height={500}
      alt="Avatar"
    />
    <div className="mt-8 flex flex-col gap-3">
      {links.map((link, idx) => (
        <SidebarLink key={idx} link={link} />
      ))}
    </div>
  </div>
);

export default SidebarContent;
