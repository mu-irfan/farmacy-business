// active sidebar item

export const active = (href: string, pathname: string): string =>
  (href === "/" && pathname === "/") || pathname.startsWith(href)
    ? "bg-green-600 px-4 rounded-lg py-3 !text-white"
    : "";
