import React, { useState } from "react";
import "../styles/components/pages/Registrarse.css";

const Registrarse = (props) => {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        telefono: ""
    });
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setExito("");
        setCargando(true);

        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (data.error) {
                setError(data.message || "Error al registrarse");
                setCargando(false);
                return;
            }

            setExito("¡Cuenta creada correctamente! Ya podés iniciar sesión.");
            setCargando(false);

            // Opcional: cerrar el modal de registro después de 1.5 segundos
            setTimeout(() => {
                if (props.abrirIniciarSesion) {
                    props.abrirIniciarSesion();
                }
            }, 1500);

        } catch (err) {
            console.error(err);
            setError("Error de conexión con el servidor");
            setCargando(false);
        }
    };

    return (
        <div className="registrarse">
            <h2>Crear cuenta</h2>

            {error && (
                <div style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>
                    {error}
                </div>
            )}

            {exito && (
                <div style={{ color: "green", marginBottom: "15px", textAlign: "center" }}>
                    {exito}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="campo">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Teléfono (opcional)</label>
                    <input
                        type="text"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-registrarse" disabled={cargando}>
                    {cargando ? "Creando cuenta..." : "CREAR CUENTA"}
                </button>
            </form>

            <p className="texto-login">
                ¿Ya tenés una cuenta?
            </p>

            <button
                className="btn-ir-login"
                onClick={props.abrirIniciarSesion}
            >
                Iniciar sesión
            </button>
        </div>
    );
};

export default Registrarse;