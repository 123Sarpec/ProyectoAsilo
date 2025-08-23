// src/App.jsx
import { useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Pacientes from "./components/pacientes"; // <- ya consume tu API
import "./App.css";

export default function App() {
  return <AppShell />;
}

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Menú del dashboard (agrega o quita lo que quieras)
  const items = [
    { name: "Inicio", to: "/" },
    { name: "Pacientes", to: "/pacientes" },
    { name: "Residentes", to: "/residentes" },
    { name: "Inventario", to: "/inventario" },
    { name: "Reportes", to: "/reportes" },
    // Si quieres más módulos, solo agrégalos aquí y abajo su <Route>
    { name: "Catálogo", to: "/catalogo" },
    { name: "Planes", to: "/planes" },
    // { name: "Ronda", to: "/ronda" },
    // { name: "Historial", to: "/historial" },
    // { name: "PRN", to: "/prn" },
    // { name: "Notificaciones", to: "/notificaciones" },
    // { name: "Auditoría", to: "/auditoria" },
    // { name: "UX Turno", to: "/ux-turno" },
  ];

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
                className={`${linkBase} ${isActive ? linkActive : linkIdle} w-full text-left`}
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
            <Route path="/residentes" element={<Residentes />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/reportes" element={<Reportes />} />
            {/* Si agregas más items arriba, crea aquí su ruta */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

/* ====== VISTAS DEL DASHBOARD (placeholders, conecta tu API luego) ====== */

function Inicio() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Resumen general</h2>
        <p className="text-gray-700">Vista rápida del estado del día.</p>
      </div>

      {/* KPIs (estáticos por ahora; luego reemplaza con datos de tu API) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Residentes" value="—" subtitle="Activos" />
        <KpiCard title="Medicamentos hoy" value="—" subtitle="Programados" />
        <KpiCard title="Pendientes" value="—" subtitle="Próximo horario" />
        <KpiCard title="Omisiones" value="—" subtitle="Últimas 24h" />
      </div>

      {/* Accesos rápidos */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-3">Accesos rápidos</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickButton to="/pacientes" label="Ver pacientes" />
          <QuickButton to="/reportes" label="Ver reportes" />
          <QuickButton to="/residentes" label="Gestionar residentes" />
          <QuickButton to="/inventario" label="Inventario" />
        </div>
      </div>
    </div>
  );
}

function Residentes() {
  return (
    <Modulo
      titulo="Residentes"
      desc="Aquí conectarás tu API para listar/crear/editar/inactivar residentes."
    />
  );
}

function Inventario() {
  return (
    <Modulo
      titulo="Inventario"
      desc="Conecta tu API para entradas (donaciones), salidas automáticas y kardex."
    />
  );
}

function Reportes() {
  return (
    <Modulo
      titulo="Reportes"
      desc="Integra tus endpoints para MAR, omisiones, consumo, stock y caducidades."
    />
  );
}

function NotFound() {
  return <div className="text-gray-600">Ruta no encontrada.</div>;
}

/* ====== UI Helpers ====== */

function KpiCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </div>
  );
}

function QuickButton({ to, label }) {
  return (
    <NavLink
      to={to}
      className="w-full text-center px-3 py-2 rounded border hover:bg-gray-50"
    >
      {label}
    </NavLink>
  );
}

function Modulo({ titulo, desc }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{titulo}</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-700">{desc}</p>
        {/* EJEMPLO para cuando conectes API:
           useEffect(() => {
             fetch('/api/tu-endpoint').then(r => r.json()).then(setData);
           }, []);
        */}
      </div>
    </div>
  );
}
