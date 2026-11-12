import React, { useState, useEffect } from "react";
import "../styles/components/pages/Encargos.css";

const Encargos = () => {
    const [repartidores, setRepartidores] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const traerRepartidores = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/repartidores");
                const data = await response.json();
                setRepartidores(data);
            } catch (error) {
                console.error("Error al cargar los repartidores:", error);
            } finally {
                setCargando(false);
            }
        };

        traerRepartidores();
    }, []);

    return (
        <main className="encargos-page">
            <section className="encargos-hero">
                <img src="/img/fondodeencargo.jpg" alt="Servicio de encargos" />
                <div className="encargos-hero-overlay"></div>
                <div className="encargos-hero-content">
                    <h1>
                        ¿Necesitás que alguien<br />
                        vaya a buscar algo?
                    </h1>
                    <p>
                        Contratá un repartidor para realizar tu encargo
                        de forma rápida y sencilla.
                    </p>
                </div>
            </section>

            <section className="busqueda-encargos">
                <div className="busqueda-encargos-box">
                    <input
                        type="text"
                        placeholder="¿Qué necesitás que busquen?"
                    />
                </div>
            </section>

            <section className="repartidores">
                {cargando ? (
                    <p style={{ textAlign: "center", padding: "40px" }}>
                        Cargando repartidores...
                    </p>
                ) : (
                    <div className="repartidores-grid">
                        {repartidores.map((repartidor) => (
                            <article className="repartidor" key={repartidor.id}>
                                <div className="repartidor-foto">
                                    <img
                                        src={repartidor.imagen || "/img/repartidor1.jpg"}
                                        alt={repartidor.nombre}
                                    />
                                </div>

                                <div className="repartidor-info">
                                    <h3>{repartidor.nombre.toUpperCase()}</h3>
                                    <p>📍 {repartidor.zona || "Sin zona"}</p>
                                    <p>
                                        {repartidor.vehiculo === "Moto" && "🏍️ "}
                                        {repartidor.vehiculo === "Auto" && "🚗 "}
                                        {repartidor.vehiculo === "Bicicleta" && "🚲 "}
                                        {repartidor.vehiculo || "Vehículo"}
                                    </p>

                                    <div className="repartidor-bottom">
                                        <span className="estrellas">
                                            {"★".repeat(Math.round(repartidor.rating || 5))}
                                        </span>
                                        <span>15 min</span>
                                    </div>

                                    <button className="btn-elegir">
                                        Pedir encargo
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {!cargando && repartidores.length === 0 && (
                    <p style={{ textAlign: "center", padding: "40px" }}>
                        No hay repartidores disponibles en este momento.
                    </p>
                )}
            </section>
        </main>
    );
};

export default Encargos;