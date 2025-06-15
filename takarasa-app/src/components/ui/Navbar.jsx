import React, { useState } from "react";
import { House, BookBookmark, Megaphone, User } from "@phosphor-icons/react";

export default function Navbar() {
  const [active, setActive] = useState("Beranda");

  const items = [
    { label: "Beranda", Icon: House },
    { label: "Belajar", Icon: BookBookmark },
    { label: "Informasi", Icon: Megaphone },
    { label: "Profil", Icon: User },
  ];

  return (
    <nav className="max-w-md fixed bottom-0 left-0 right-0 py-3 bg-white shadow-inner z-50">
      <ul className="flex justify-around">
        {items.map(({ label, Icon }) => (
          <li
            key={label}
            className="flex flex-col items-center py-2 cursor-pointer flex-grow"
            onClick={() => setActive(label)}
          >
            <Icon
              size={24}
              weight={active === label ? "fill" : "regular"}
              className={active === label ? "text-brand-primary" : "text-grey-20"}
            />
            <span
              className={`mt-1 text-xs font-semibold ${
                active === label
                  ? "text-brand-primary"
                  : "text-grey-20 font-normal"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}