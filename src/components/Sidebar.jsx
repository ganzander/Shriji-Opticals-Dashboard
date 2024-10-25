"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  Home,
  LayoutDashboard,
  Users,
  LogOut,
  LogIn,
  Lightbulb,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import jwt from "jsonwebtoken";

export default function Sidebar({ setSidebarOpen, sidebarOpen }) {
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkAuthToken() {
      const storedAuthToken = localStorage.getItem("AuthToken");
      if (storedAuthToken) {
        const decoded = jwt.decode(JSON.parse(storedAuthToken));
        if (decoded?.email === process.env.NEXT_PUBLIC_EMAIL) {
          setDecodedToken(decoded);
        }
      }
      setLoading(false);
    }
    if (typeof window !== "undefined") {
      checkAuthToken();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
        <h1 className="text-5xl font-semibold text-center">Loading....</h1>
      </div>
    );
  }

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow text-black dark:bg-black dark:text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <span className="text-2xl font-semibold text-black dark:text-white">
          Admin Panel
        </span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
          aria-label="Close sidebar"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-8">
        <Link
          href="#"
          className="flex items-center px-4 py-2 text-black dark:text-white"
        >
          <Home className="mr-3 h-5 w-5" />
          Home
        </Link>
        <Link
          href=""
          className="flex items-center px-4 py-2 text-black dark:text-white"
        >
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/add-item"
          className="flex items-center px-4 py-2 text-black dark:text-white"
        >
          <Plus className="mr-3 h-5 w-5" />
          Add Item
        </Link>

        <Link
          href="/add-item"
          className="flex items-center px-4 py-2 text-black dark:text-white"
        >
          <Minus className="mr-3 h-5 w-5" />
          Remove Item
        </Link>

        <Link
          href="#"
          className="flex items-center px-4 py-2 text-black dark:text-white"
        >
          <Users className="mr-3 h-5 w-5" />
          Users
        </Link>

        <Link
          href="#"
          className="flex items-center px-4 py-2 text-black dark:text-white"
        >
          <Lightbulb className="mr-3 h-5 w-5" />
          Theme
        </Link>
        {decodedToken ? (
          <Link
            href="#"
            onClick={() => {
              localStorage.removeItem("AuthToken");
              location.reload();
            }}
            className="flex items-center px-4 py-2 text-black dark:text-white"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center px-4 py-2 text-black dark:text-white"
          >
            <LogIn className="mr-3 h-5 w-5" />
            Login
          </Link>
        )}
      </nav>
    </aside>
  );
}
