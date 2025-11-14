"use client";

import { usePathname } from "next/navigation";
import NavbarComponent from "../components/Navbar";
import FooterComponent from "../components/Footer";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // hide navbar/footer di admin
  const hideLayout = pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <NavbarComponent />}

      <main>{children}</main>

      {!hideLayout && <FooterComponent />}
    </>
  );
}
