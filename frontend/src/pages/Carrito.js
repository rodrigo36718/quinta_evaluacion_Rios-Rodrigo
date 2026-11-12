import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/pages/Carrito.css";

const Carrito = ({ carrito, setCarrito }) => {

    const navigate = useNavigate();

    const eliminarDelCarrito = (indice) => {
        setCarrito((carritoActual) =>
            carritoActual.filter((_, i) => i !== indice)
        );
    };

    const precioTotal = carrito.reduce(
        (total, producto) => total + producto.precio,
        0
    );

    return (
        <main className="carrito-page">

            <section className="carrito-seccion">

                <div className="carrito-contenido">

                    <button
                        className="volver-delivery"
                        onClick={() => navigate("/Delivery")}
                    >
                        ← VOLVER A DELIVERY
                    </button>

                    <div className="carrito-titulo">
                        <h1>Tu carrito</h1>

                        <span>
                            {carrito.length}{" "}
                            {carrito.length === 1
                                ? "pedido"
                                : "pedidos"}
                        </span>
                    </div>

                    {carrito.length === 0 ? (

                        <div className="carrito-vacio">

                            <span>🛒</span>

                            <h2>Tu carrito está vacío</h2>

                            <p>
                                Agregá un pedido para comenzar.
                            </p>

                            <button
                                onClick={() => navigate("/Delivery")}
                            >
                                VER RESTAURANTES
                            </button>

                        </div>

                    ) : (

                        <>
                            <div className="carrito-productos">

                                {carrito.map((producto, indice) => (

                                    <div
                                        className="producto-carrito"
                                        key={indice}
                                    >

                                        <div>
                                            <h3>
                                                {producto.nombre}
                                            </h3>

                                            <p>
                                                Pedido de delivery
                                            </p>
                                        </div>

                                        <div className="producto-derecha">

                                            <strong>
                                                $
                                                {producto.precio.toLocaleString(
                                                    "es-AR"
                                                )}
                                            </strong>

                                            <button
                                                onClick={() =>
                                                    eliminarDelCarrito(indice)
                                                }
                                            >
                                                ELIMINAR
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                            <div className="carrito-final">

                                <div className="total">

                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        $
                                        {precioTotal.toLocaleString(
                                            "es-AR"
                                        )}
                                    </strong>

                                </div>

                                <button className="comprar">
                                    COMPRAR
                                </button>

                            </div>

                        </>

                    )}

                </div>

            </section>

        </main>
    );
};

export default Carrito;