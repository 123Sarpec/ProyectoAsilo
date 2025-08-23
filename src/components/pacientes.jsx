// src/components/pacientes.js
import { useEffect, useMemo, useState } from "react";

export default function Pacientes() {
  const BASE_URL = "https://dummyjson.com";
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${BASE_URL}/users?limit=50`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json.users || []);
      } catch (err) {
        if (err.name !== "AbortError") setError("No se pudo cargar pacientes.");
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return data;
    return data.filter((u) =>
      [u.firstName, u.lastName, u.email, u.phone, u.address?.city]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(t))
    );
  }, [q, data]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="text-xl font-semibold">Listado de Pacientes</h2>
        <div className="flex-1" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar (nombre, correo, ciudad...)"
          className="w-full sm:w-80 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && (
        <div className="p-4 bg-white rounded shadow animate-pulse">
          Cargando pacientes...
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <Th>Nombre</Th>
                <Th>Correo</Th>
                <Th>Teléfono</Th>
                <Th>Ciudad</Th>
                <Th>Edad</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t">
                  <Td>
                    <div className="flex items-center gap-2">
                      <img
                        src={u.image}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">
                        {u.firstName} {u.lastName}
                      </span>
                    </div>
                  </Td>
                  <Td>{u.email}</Td>
                  <Td>{u.phone}</Td>
                  <Td>{u.address?.city ?? "-"}</Td>
                  <Td>{u.age ?? "-"}</Td>
                  <Td>
                    <div className="flex gap-2">
                      <button className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                        Agregar
                      </button>
                      <button className="px-2 py-1 rounded bg-amber-500 text-white hover:bg-amber-600">
                        Editar
                      </button>
                      <button className="px-2 py-1 rounded bg-rose-600 text-white hover:bg-rose-700">
                        Eliminar
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <Td colSpan={6} className="text-center py-8 text-gray-500">
                    Sin resultados para “{q}”.
                  </Td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="text-left font-semibold text-gray-700 px-4 py-3">
      {children}
    </th>
  );
}
function Td({ children, className = "", ...rest }) {
  return (
    <td className={`px-4 py-3 ${className}`} {...rest}>
      {children}
    </td>
  );
}
