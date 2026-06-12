import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, ShieldAlert, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import heroImage from "@/assets/hero-cyber.jpg";

const UnderConstruction = () => {
  // Estados locales para los inputs
  const [impostorDetails, setImpostorDetails] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [comments, setComments] = useState("");

  // Estados para el manejo de alertas visuales y de red
  const [validationError, setValidationError] = useState("");
  const [isLocalSuccess, setIsLocalSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setServerError("");
    setIsLocalSuccess(false);

    // Validación básica para evitar envíos vacíos
    if (!impostorDetails.trim()) {
      setValidationError("El nombre o entidad del impostor es obligatorio.");
      return;
    }
    if (!contactInfo.trim()) {
      setValidationError("El número, correo o usuario de contacto es obligatorio.");
      return;
    }
    if (!comments.trim()) {
      setValidationError("Los comentarios o descripción del caso son obligatorios.");
      return;
    }

    // Encendemos el estado de carga
    setIsLoading(true);

    try {
      // Consumo del endpoint POST usando
      const response = await fetch("https://examen-backend-production-b0cc.up.railway.app/api/Fraud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          impostorDetails: impostorDetails,
          contactInfo: contactInfo,
          comments: comments,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Indicamos éxito real al usuario
        setIsLocalSuccess(true);
        setImpostorDetails("");
        setContactInfo("");
        setComments("");
      } else {
        throw new Error("El servidor no pudo procesar el reporte.");
      }
    } catch (error) {
      // Mensaje de error controlado
      setServerError("No se pudo conectar con el Backend. Verifique que su API .NET esté corriendo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="relative flex-1 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <section className="container relative z-10 mx-auto px-4 py-12 max-w-2xl">
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl">
            
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Reportar Intento de Fraude
              </h1>
            </div>

            {/* Mensaje de error de validación local */}
            {validationError && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{validationError}</p>
              </div>
            )}

            {/* Mensaje de error de conexión con la API */}
            {serverError && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{serverError}</p>
              </div>
            )}

            {/* Mensaje de éxito real */}
            {isLocalSuccess && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">¡Reporte enviado y guardado exitosamente en el sistema!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-800">Detalles sobre el impostor</h2>
                <p className="text-xs text-slate-400">Comparta lo que sepa sobre quién decía ser el estafador.</p>
                <label className="block text-sm font-medium text-slate-700">
                  Nombre de la persona, empresa o entidad que decía ser el impostor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  disabled={isLoading}
                  value={impostorDetails}
                  onChange={(e) => setImpostorDetails(e.target.value)}
                  placeholder="Ej: Juan Pérez o Banco Falso"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Número, correo o usuario desde el que contactó <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  disabled={isLoading}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Ej: 11111111, correo@falso.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-slate-800">Comentarios</h2>
                <p className="text-xs text-slate-400">
                  Describa lo que ocurrió con el mayor detalle posible.
                </p>
                <textarea
                  disabled={isLoading}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Escriba los detalles del incidente..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all shadow-md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando reporte...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Reporte Real
                    </>
                  )}
                </button>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Volver
                </Link>
              </div>
            </form>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UnderConstruction;