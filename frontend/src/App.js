import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

import Repartidores from "./pages/Repartidores";
import Inicio from "./pages/Inicio";
import Delivery from "./pages/Delivery";
import Encargos from "./pages/Encargos";

import Iniciarsesion from "./pages/Iniciarsesion";
import Registrarse from "./pages/Registrarse";

import "./App.css";

function App() {

    const [ventana, setVentana] = useState(null);

    return (
        <div className="App">

            <BrowserRouter>

                <Header
                    abrirIniciarSesion={() => setVentana("login")}
                    abrirRegistrarse={() => setVentana("registro")}
                />

                <Nav />

                <Routes>

                    <Route
                        path="/"
                        element={<Inicio />}
                    />

                    <Route
                        path="/Delivery"
                        element={<Delivery />}
                    />

                    <Route
                        path="/Encargos"
                        element={<Encargos />}
                    />

                    <Route
                        path="/Repartidores"
                        element={<Repartidores />}
                    />

                </Routes>

                <Footer />

            </BrowserRouter>


            {/* =========================
                VENTANA EMERGENTE
            ========================= */}

            {ventana !== null && (

                <div
                    className="modal-fondo"
                    onClick={() => setVentana(null)}
                >

                    <div
                        className="modal-contenido"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* BOTON CERRAR */}

                        <button
                            className="modal-cerrar"
                            onClick={() => setVentana(null)}
                        >
                            ×
                        </button>


                        {/* INICIAR SESION */}

                        {ventana === "login" && (

                            <Iniciarsesion
                                abrirRegistrarse={() =>
                                    setVentana("registro")
                                }
                            />

                        )}


                        {/* REGISTRARSE */}

                        {ventana === "registro" && (

                            <Registrarse
                                abrirIniciarSesion={() =>
                                    setVentana("login")
                                }
                            />

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default App;