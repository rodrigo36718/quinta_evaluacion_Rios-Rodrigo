import React, { useState, useEffect } from "react";
import "../../styles/components/layout/Header.css";

const Header = (props) => {
    const [usuario, setUsuario] = useState(null);

    // Revisar si hay usuario logueado al cargar
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    // Escuchar cambios de login/logout (por si se loguea en otra parte)
    useEffect(() => {
        const handleStorageChange = () => {
            const usuarioGuardado = localStorage.getItem("usuario");
            if (usuarioGuardado) {
                setUsuario(JSON.parse(usuarioGuardado));
            } else {
                setUsuario(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
        // Si querés, podés recargar o redirigir
        window.location.reload();
    };

    return (
        <header>
            <div className="holder">
                <div className="logo">
                    <img src="/img/logo.png" alt="Carri-GO" />
                    <h1>Carri-GO</h1>
                </div>

                <div className="usuario">
                    {usuario ? (
                        // ===== USUARIO LOGUEADO =====
                        <>
                            <span style={{ color: "white", marginRight: "10px", fontWeight: "bold" }}>
                                Hola, {usuario.nombre}
                            </span>
                            <button
                                className="btn-login"
                                onClick={cerrarSesion}
                            >
                                Cerrar sesión
                            </button>
                            <button className="perfil">
                                👤
                            </button>
                        </>
                    ) : (
                        // ===== USUARIO NO LOGUEADO =====
                        <>
                            <button
                                className="btn-login"
                                onClick={props.abrirIniciarSesion}
                            >
                                Iniciar sesión
                            </button>
                            <button
                                className="btn-registro"
                                onClick={props.abrirRegistrarse}
                            >
                                Registrarse
                            </button>
                            <button className="perfil">
                                👤
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;