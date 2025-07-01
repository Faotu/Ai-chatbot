// "use client";

// import Link from "next/link";
// import { IoLogoBuffer } from "react-icons/io";
// import { useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { FiSearch } from "react-icons/fi";

// export default function Nav() {
//   const router = useRouter();
//   const [user, setUser] = useState<{ name: string; avatar?: string } | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("/api/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data.user);
//       } catch {
//         localStorage.removeItem("token");
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     router.push("/login");
//   };

//   const firstName = user?.name?.split(" ")[0];

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="text-2xl flex font-bold text-blue-700 items-center"
//         >
//           <IoLogoBuffer className="mr-1" /> FUPRE
//         </Link>

//         {/* Search bar */}
//         <div className="flex items-center space-x-2 w-full max-w-md mx-4">
//           <div className="relative flex-grow">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full border border-gray-300 rounded px-3 py-1 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <FiSearch className="absolute top-2.5 left-2.5 text-gray-400" />
//           </div>
//           <button
//             onClick={() =>
//               router.push(`/search?q=${encodeURIComponent(search)}`)
//             }
//             className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
//           >
//             Search
//           </button>
//         </div>

//         {/* User Info */}
//         <div className="flex items-center space-x-4">
//           {!loading && user ? (
//             <div className="relative" ref={dropdownRef}>
//               <div
//                 className="flex items-center space-x-2 cursor-pointer"
//                 onClick={() => setMenuOpen(!menuOpen)}
//               >
//                 <Image
//                   src={user.avatar || "/avatar2.jpg"}
//                   alt="Avatar"
//                   width={32}
//                   height={32}
//                   className="rounded-full object-cover"
//                 />
//                 <span className="text-sm text-gray-700">Hi, {firstName}</span>
//               </div>
//               {menuOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                   >
//                     Sign Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               onClick={() => router.push("/login")}
//               className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
//             >
//               Sign In
//             </button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { IoLogoBuffer } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Home", href: "/" },
  { label: "Service", href: "/service" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Chat", href: "/chat" },
];

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const firstName = user?.name?.split(" ")[0];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl flex font-bold text-blue-700 items-center"
        >
          <IoLogoBuffer className="mr-1" /> FUPRE
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          {!loading && user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Image
                  src={user.avatar || "/avatar2.jpg"}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="text-sm text-gray-700">Hi, {firstName}</span>
              </div>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
