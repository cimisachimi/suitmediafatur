"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Ideas', href: '/ideas' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 10);
      setVisible(currentScrollY < lastScrollY || currentScrollY <= 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`
        fixed left-0 w-full z-50 transition-all duration-300 ease-in-out
        ${scrolled ? 'bg-primary/90 backdrop-blur-sm shadow-md' : 'bg-primary'}
        ${visible ? 'top-0' : '-top-24'}
      `}
    >
      <nav className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          Suitmedia
        </Link>
        
        {/* Menu Items */}
        <div className="flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`
                text-black transition-colors duration-200 pb-1
                ${pathname === item.href 
                  ? 'font-bold border-b-2 border-black' 
                  : 'hover:text-gray-200'
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}