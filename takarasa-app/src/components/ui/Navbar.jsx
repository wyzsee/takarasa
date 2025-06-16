import React from "react";
import { House, BookBookmark, Megaphone, User } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const items = [
    { label: "Beranda", Icon: House, path: "/dashboard" },
    { label: "Belajar", Icon: BookBookmark, path: "/belajar" },
    { label: "Informasi", Icon: Megaphone, path: "/informasi" },
    { label: "Profil", Icon: User, path: "/profil" },
  ];

  return (
    <nav className="max-w-md mx-auto fixed bottom-0 left-0 right-0 py-3 bg-white shadow-inner z-50">
      <ul className="flex justify-around">
        {items.map(({ label, Icon, path }) => {

          const isActive = location.pathname === path;

          return (
            <Link to={path} key={label} className="flex flex-col items-center py-2 cursor-pointer flex-grow">
              <Icon
                size={24}
                weight={isActive ? "fill" : "regular"}
                className={isActive ? "text-brand-primary" : "text-grey-50"} // Ganti warna sesuai tema Anda
              />
              <span
                className={`mt-1 text-xs font-semibold ${
                  isActive
                    ? "text-brand-primary font-semibold"
                    : "text-grey-50 font-light"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}