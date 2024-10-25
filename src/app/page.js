"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <>
      {decodedToken ? (
        <div className="flex h-screen bg-gray-100">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Navbar setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                Dashboard
              </h1>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Total Users
                  </h2>
                  <p className="mt-2 text-3xl font-bold text-gray-800">
                    12,345
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Revenue
                  </h2>
                  <p className="mt-2 text-3xl font-bold text-gray-800">
                    $34,567
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Active Projects
                  </h2>
                  <p className="mt-2 text-3xl font-bold text-gray-800">23</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Tasks Completed
                  </h2>
                  <p className="mt-2 text-3xl font-bold text-gray-800">78%</p>
                </div>
              </div>
              <h2 className="mt-8 text-2xl font-semibold text-gray-800">
                Recent Activity
              </h2>
              <div className="mt-4 rounded-lg bg-white shadow">
                <div className="p-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/placeholder.svg?height=40&width=40"
                      alt="User avatar"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Jane Smith completed a task
                      </p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="p-4">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/placeholder.svg?height=40&width=40"
                      alt="User avatar"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        Mike Johnson commented on a project
                      </p>
                      <p className="text-sm text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
          <h1 className="text-5xl font-semibold text-center">
            You&apos;re Not Authorized
          </h1>

          <button
            className="px-4 py-2 bg-black text-white font-semibold text-xl rounded-md"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}
