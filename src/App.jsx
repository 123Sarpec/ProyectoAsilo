// src/App.jsx
import { useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Pacientes from "./components/pacientes";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = [
    { name: "Inicio", to: "/" },
    { name: "Pacientes", to: "/pacientes" },
    { name: "Reportes", to: "/reportes" },
  ];
  const location = useLocation();

  const linkBase = "block px-3 py-2 rounded transition-colors select-none";
  const linkIdle = "text-gray-700 hover:bg-gray-100";
  const linkActive = "bg-gray-900 text-white";

  return (
    <div className="flex bg-gray-300 min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
        lg:translate-x-0 lg:static lg:transform-none`}
      >
        <div className="p-4 flex items-center justify-between ">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7h20L12 2z" />
            </svg>
            <span className="ml-2 text-xl font-bold">Asilo</span>
          </div>

          <button
            type="button"
            className="p-2 rounded hover:bg-gray-200 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`${linkBase} ${
                  isActive ? linkActive : linkIdle
                } w-full text-left`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white flex items-center justify-between p-4 shadow-md">
          <button
            className="p-2 text-2xl font-bold lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            ☰
          </button>

          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Dashboard Asilo
          </h1>
          <div className="bg-gray-600 w-11 h-10 rounded-full" />
        </header>

        <section className="p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/reportes" element={<Reportes />} />
            {/* fallback simple */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

function Inicio() {
  return <div>Contenido de Inicio</div>;
}

function Reportes() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Reportes</h2>
      <div className="bg-white p-4 rounded shadow">KPIs ejemplo…</div>
    </div>
  );
}

function NotFound() {
  return <div className="text-gray-600">Ruta no encontrada.</div>;
}

export default App;
