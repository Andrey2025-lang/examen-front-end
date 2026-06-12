import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import heroImage from "@/assets/hero-cyber.jpg";

interface FraudReport {
  id: number;
  impostorDetails: string;
  contactInfo: string;
  comments: string;
  createdAt: string;
}

const Reports = () => {
  const [reports, setReports] = useState<FraudReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      const response = await fetch("https://localhost:7098/api/Fraud");
      
      if (!response.ok) {
        throw new Error("No se pudo obtener la información del servidor.");
      }
      
      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError("No se pudo conectar con el Backend. Verifique que su API .NET esté encendida.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setError("");
    fetchReports();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" className="relative flex-1 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <section className="container relative z-10 mx-auto px-4 py-12 max-w-5xl">
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-100">
            
            {/* Encabezado de la Sección */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Consulta Pública de Reportes
                </h1>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                Actualizar
              </button>
            </div>

            {/* 1. MENSAGE DE CARGA */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="text-sm font-medium animate-pulse">Consultando base de datos de fraudes...</p>
              </div>
            )}

            {/* 2. MENSAJE DE ERROR */}
            {error && !isLoading && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-6">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* 3. CASO ÉXITO: TABLA DE REPORTES */}
            {!isLoading && !error && (
              <>
                {reports.length === 0 ? (
                  <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">
                    <p className="text-slate-400 font-medium">No hay reportes registrados en la base de datos todavía.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs uppercase font-semibold">
                          <th className="p-4">ID</th>
                          <th className="p-4">Impostor / Entidad</th>
                          <th className="p-4">Contacto Utilizado</th>
                          <th className="p-4">Descripción del Caso</th>
                          <th className="p-4">Fecha de Reporte</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                        {reports.map((report) => (
                          <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-4 font-semibold text-slate-500">#{report.id}</td>
                            <td className="p-4 font-medium text-slate-900">{report.impostorDetails}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-mono">
                                {report.contactInfo}
                              </span>
                            </td>
                            <td className="p-4 max-w-xs truncate" title={report.comments}>
                              {report.comments}
                            </td>
                            <td className="p-4 text-xs text-slate-400">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* Botón de Retorno */}
            <div className="mt-8 pt-4 border-t border-slate-100">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al menú principal
              </Link>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;