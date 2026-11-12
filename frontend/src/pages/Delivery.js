import React, { useState, useEffect } from "react";
import "../styles/components/pages/Delivery.css";

const Delivery = () => {
    const [busqueda, setBusqueda] = useState("");
    const [carrito, setCarrito] = useState([]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [platos, setPlatos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Traer platos desde el backend
    useEffect(() => {
        const traerPlatos = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/platos");
                const data = await response.json();
                setPlatos(data);
            } catch (error) {
                console.error("Error al cargar los platos:", error);
            } finally {
                setCargando(false);
            }
        };

        traerPlatos();
    }, []);

    const agregarAlCarrito = (nombre, precio) => {
        setCarrito((carritoActual) => [
            ...carritoActual,
            { nombre, precio }
        ]);
    };

    const eliminarDelCarrito = (indice) => {
        setCarrito((carritoActual) =>
            carritoActual.filter((_, i) => i !== indice)
        );
    };

    const precioTotal = carrito.reduce(
        (total, producto) => total + Number(producto.precio),
        0
    );

    const comprar = () => {
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        alert(
            `¡Pedido realizado correctamente!\n\nTotal: $${precioTotal.toLocaleString("es-AR")}`
        );

        setCarrito([]);
        setMostrarCarrito(false);
    };

    const platosFiltrados = platos.filter((plato) =>
        plato.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="delivery-page">

            <section className="hero">
                <img src="/img/fondo_delivery.jpg" alt="Delivery" />
                <div className="hero-content">
                    <h1>Pedí lo que quieras</h1>
                    <h2>llega a toda velocidad donde estés.</h2>
                </div>
            </section>

            <section className="busqueda">
                <div className="busqueda-box">
                    <input
                        type="text"
                        placeholder="Buscar plato o restaurante..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    {busqueda && (
                        <button
                            className="limpiar-busqueda"
                            onClick={() => setBusqueda("")}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <button
                    className="carrito"
                    onClick={() => setMostrarCarrito(!mostrarCarrito)}
                >
                    <span className="icono-carrito">🛒</span>
                    {carrito.length > 0 && (
                        <span className="carrito-numero">{carrito.length}</span>
                    )}
                </button>
            </section>

            {mostrarCarrito && (
                <section className="carrito-seccion">
                    <div className="carrito-contenido">
                        <div className="carrito-titulo">
                            <h2>Tu carrito</h2>
                            <span>
                                {carrito.length}{" "}
                                {carrito.length === 1 ? "pedido" : "pedidos"}
                            </span>
                        </div>

                        {carrito.length === 0 ? (
                            <div className="carrito-vacio">
                                <span>🛒</span>
                                <p>Tu carrito está vacío</p>
                                <small>Agregá un pedido para comenzar.</small>
                            </div>
                        ) : (
                            <>
                                <div className="carrito-productos">
                                    {carrito.map((producto, indice) => (
                                        <div className="producto-carrito" key={indice}>
                                            <div>
                                                <h3>{producto.nombre}</h3>
                                                <p>Pedido de delivery</p>
                                            </div>
                                            <div className="producto-derecha">
                                                <strong>
                                                    ${Number(producto.precio).toLocaleString("es-AR")}
                                                </strong>
                                                <button onClick={() => eliminarDelCarrito(indice)}>
                                                    ELIMINAR
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="carrito-final">
                                    <div className="total">
                                        <span>Total</span>
                                        <strong>
                                            ${precioTotal.toLocaleString("es-AR")}
                                        </strong>
                                    </div>
                                    <button className="comprar" onClick={comprar}>
                                        COMPRAR
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            )}

            <section className="restaurantes">
                {cargando ? (
                    <div className="sin-resultados">
                        <p>Cargando platos...</p>
                    </div>
                ) : (
                    <>
                        <div className="restaurantes-grid">
                            {platosFiltrados.map((plato) => (
                                <article className="restaurante-card" key={plato.id}>
                                    <div className="restaurante-imagen">
                                        <img
                                            src={plato.imagen || "/img/placeholder.jpg"}
                                            alt={plato.nombre}
                                        />
                                    </div>

                                    <div className="restaurante-info">
                                        <h2>{plato.nombre}</h2>
                                        <p>{plato.descripcion || plato.categoria}</p>

                                        <div className="restaurante-detalles">
                                            <span>★ 4.8</span>
                                            <span>25-35 min</span>
                                        </div>

                                        <div className="restaurante-abajo">
                                            <strong>
                                                ${Number(plato.precio).toLocaleString("es-AR")}
                                            </strong>
                                            <button
                                                onClick={() =>
                                                    agregarAlCarrito(plato.nombre, plato.precio)
                                                }
                                            >
                                                PEDIR YA
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {platosFiltrados.length === 0 && (
                            <div className="sin-resultados">
                                <p>No encontramos platos con ese nombre.</p>
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
};

export default Delivery;