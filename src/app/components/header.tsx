import Image from "next/image";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Home", href: "/" },
  { label: "Service", href: "service" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Login", href: "/login" },
  { label: "Chat", href: "/chat" },
];

export default function Header() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md rounded-full max-w-6xl mx-auto mb-8">
        <div className="text-2xl font-bold text-blue-600">FUPRE</div>
        <ul className="flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4">
        {/* Left: Image */}
        <div className="flex justify-center">
          <Image
            src="/fupre.png"
            alt="Education Illustration"
            className="w-full max-w-md drop-shadow-lg rounded-2xl"
            width={400}
            height={300}
          />
        </div>

        {/* Right: Text */}
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
            Education <span className="text-blue-500">Knowledge</span>
          </h1>
          <p className="text-gray-700 text-lg text-justify">
            Education is the foundation of personal and societal growth. Through
            dedicated learning and the pursuit of knowledge, individuals can
            unlock their full potential and contribute meaningfully to their
            communities. By fostering curiosity, critical thinking, and lifelong
            learning, education empowers people to navigate the world with
            confidence and purpose.
          </p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition-all">
            Read More
          </button>
        </div>
      </section>
    </main>
  );
}
