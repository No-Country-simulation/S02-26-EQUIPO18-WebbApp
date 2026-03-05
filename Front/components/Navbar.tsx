"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { trackEvent } from "@/lib/visitor";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isAuthenticated, isLoading, login, logout } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            setIsLoginModalOpen(false);
            setEmail("");
            setPassword("");
        } catch {
            // el error ya se maneja en el context con toast
        }
    };

    // const navLinks = [
    //     { href: "/", label: "Inicio" },
    //     //{ href: "/contacto", label: "Contacto" },
    //     // { href: "/terminos", label: "Terminos" },
    //     // { href: "/privacidad", label: "Privacidad" },
    // ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* logo */}
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            Total Incorporation
                        </Link>

                        {/* menu desktop */}
                        <div className="hidden md:flex items-center space-x-8">
                            {/* {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                                    onClick={() => trackEvent("navbar_click", { label: link.label })}
                                >
                                    {link.label}
                                </Link>
                            ))} */}

                            {isAuthenticated ? (
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <LogOut size={18} />
                                    Cerrar Sesion
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsLoginModalOpen(true)}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <LogIn size={18} />
                                    Login
                                </button>
                            )}
                        </div>

                        {/* boton menu mobile */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-gray-700"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-4 py-4 space-y-3">
                            {/* {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))} */}

                            {isAuthenticated ? (
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <LogOut size={18} />
                                    Cerrar Sesion
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsLoginModalOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <LogIn size={18} />
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* modal de login */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsLoginModalOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10">
                        <button
                            onClick={() => setIsLoginModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Iniciar Sesión
                        </h2>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Procesando...
                                    </>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
}
