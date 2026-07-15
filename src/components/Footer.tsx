import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  // ফুটারের লিঙ্কগুলোর ডাটা অবজেক্ট (সহজে মেইনটেইন করার জন্য)
  const footerSections = [
    {
      title: "Explore",
      links: [
        { label: "All Events", href: "#" },
        { label: "Concerts", href: "#" },
        { label: "Workshops", href: "#" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, href: "https://www.facebook.com/lokman.hossen.697687", label: "Facebook" },
    { icon: <FaTwitter size={16} />, href: "#", label: "Twitter" },
    { icon: <FaLinkedinIn size={16} />, href: "https://www.linkedin.com/in/lokman-hossen-dev", label: "LinkedIn" },
    { icon: <FaGithub size={16} />, href: "https://github.com/lokman1313", label: "GitHub" },
  ];

  return (
    <footer className="w-full border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-600 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
        
        {/* মেইন গ্রিড লেআউট: মোবাইলে ১টি, ট্যাবে ৩টি, ল্যাপটপে ৫টি কলাম */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-12">

          {/* ব্র্যান্ড ইনফো সেকশন */}
          <div className="sm:col-span-3 md:col-span-2 flex flex-col gap-4">
            <p className="font-bold text-2xl text-black dark:text-white select-none tracking-tight">
              Event<span className="text-violet-600 dark:text-violet-500">Vibe</span>
              {/* নোট: আপনার ব্র্যান্ড কালার যদি অরেঞ্জ হয়, তবে text-orange-500 ব্যবহার করতে পারেন */}
            </p>
            <p className="text-sm max-w-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Discover, create, and share unforgettable experiences. Your ultimate platform to vibrantly connect with the best events around you.
            </p>
          </div>

          {/* লিঙ্ক সেকশনসমূহ */}
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h3 className="font-semibold text-xs text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* বটম সেকশন: কপিরাইট এবং সোশ্যাল মিডিয়া */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-900 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          
          {/* কপিরাইট টেক্সট */}
          <p className="text-xs text-center sm:text-left text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Event<span className="text-violet-600 dark:text-violet-500 font-medium">Vibe</span>. All rights reserved.
          </p>

          {/* সোশ্যাল আইকনসমূহ */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 hover:bg-violet-600 dark:bg-zinc-900 dark:hover:bg-violet-600 text-gray-500 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all duration-300 active:scale-95 border border-gray-200 dark:border-zinc-800 dark:hover:border-transparent"
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}