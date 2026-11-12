import React from "react";
import "../styles/components/pages/Inicio.css";

const HomePages = (props) => {
    return (
        <main className="home">
            <section className="bienvenidos">

                <img
                    src="/img/fondo_holder.png"
                    alt="Carri-GO delivery"
                />

                <div className="bienvenidos-overlay"></div>

                <div className="bienvenidos-content">

                    <h2>Bienvenido a Carri-GO</h2>

                    <p>
                        Una plataforma donde podés solicitar delivery,
                        realizar encargos y encontrar repartidores
                        independientes cerca de vos.
                    </p>

                </div>

            </section>
            <section className="home-principal">

                <div className="home-principal-content">

                    <div className="home-text">

                        <span className="home-etiqueta">
                            DELIVERY RÁPIDO Y SEGURO
                        </span>

                        <h1>
                            Llevá lo que necesitás,
                            <span> cuando quieras.</span>
                        </h1>

                        <p>
                            Encontrá un repartidor cerca tuyo y enviá
                            lo que necesites de forma rápida, sencilla
                            y segura.
                        </p>
                    </div>


                    <div className="home-info">

                        <h3>¿Cómo funciona?</h3>

                        <div className="home-paso">
                            <strong>1</strong>
                            <p>Indicá qué necesitás llevar.</p>
                        </div>

                        <div className="home-paso">
                            <strong>2</strong>
                            <p>Indicá la distancia y el precio.</p>
                        </div>

                        <div className="home-paso">
                            <strong>3</strong>
                            <p>Elegí un repartidor disponible.</p>
                        </div>

                        <div className="home-paso">
                            <strong>4</strong>
                            <p>Recibí tu pedido.</p>
                        </div>

                    </div>

                </div>

            </section>
            <section className="servicios">

                <h2>¿Qué necesitás?</h2>

                <div className="servicios-grid">

                    <article className="servicio">

                        <div className="servicio-icono">
                            🛵
                        </div>

                        <h3>Delivery</h3>

                        <p>
                            Pide comida y llegara a la puerta de tu casa.
                        </p>

                    </article>
                    <article className="servicio">

                        <div className="servicio-icono">
                            📦
                        </div>

                        <h3>Encargos</h3>

                        <p>
                            Pedile a un repartidor que vaya a
                            buscar algo por vos.
                        </p>
                    </article>
                    <article className="servicio">

                        <div className="servicio-icono">
                            🚴
                        </div>

                        <h3>Repartidores</h3>

                        <p>
                            Convertite en repartidor independiente
                            y elegí los pedidos que quieras realizar.
                        </p>
                    </article>

                </div>

            </section>

        </main>
    );
};

export default HomePages;