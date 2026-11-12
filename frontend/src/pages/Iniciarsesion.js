import React, { useState } from "react";
import "../styles/components/pages/Iniciarsesion.css";

const Iniciarsesion = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.error) {
                setError(data.message || "Email o contraseña incorrectos");
                setCargando(false);
                return;
            }

            // Guardar token y usuario
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            // Recargar para que el Header se actualice
            window.location.reload();

        } catch (err) {
            console.error(err);
            setError("Error de conexión con el servidor");
            setCargando(false);
        }
    };

    return (
        <div className="inicio-sesion">

            <h2>Iniciar sesión</h2>

            {error && (
                <div style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                {/* CORREO */}
                <div className="campo">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="ejemplo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* CONTRASEÑA */}
                <div className="campo">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* BOTON INICIAR */}
                <button
                    type="submit"
                    className="btn-iniciar"
                    disabled={cargando}
                >
                    {cargando ? "Ingresando..." : "INICIAR SESIÓN"}
                </button>

            </form>

            {/* CREAR CUENTA */}
            <p className="texto-registro">
                ¿No tenés una cuenta?
            </p>

            <button
                className="btn-crear-cuenta"
                onClick={props.abrirRegistrarse}
            >
                Crear una cuenta
            </button>

        </div>
    );
};

export default Iniciarsesion;