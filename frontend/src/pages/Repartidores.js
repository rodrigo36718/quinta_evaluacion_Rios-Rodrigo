import React from "react";
import "../styles/components/pages/Repartidores.css";

const Encargos = () => {
    return (
        <main className="encargos-page">
            <section className="repartidores-hero">

                <img
                    src="/img/fondo_re.jpg"
                    alt="Trabajá como repartidor"
                />

                <div className="repartidores-overlay"></div>

                <div className="repartidores-hero-content">
                    <h1>
                        Trabajá a tu manera,<br />
                        repartí cuando quieras
                    </h1>

                    <p>
                        Sumate a nuestra plataforma y comenzá a realizar
                        entregas de manera independiente.
                    </p>
                </div>

            </section>
            <section className="informacion-repartidor">

                <div className="informacion-container">

                    <div className="informacion-texto">

                        <span className="etiqueta">
                            CONVERTITE EN REPARTIDOR
                        </span>

                        <h2>
                            Vos elegís cuándo y dónde trabajar
                        </h2>

                        <p>
                            Formá parte de nuestra comunidad de repartidores
                            y realizá entregas de acuerdo con tu disponibilidad.
                            Elegí tus horarios y conectate cuando quieras.
                        </p>

                    </div>


                    <div className="beneficios-repartidor">

                        <div className="beneficio">
                            <span className="beneficio-icono">🕐</span>

                            <div>
                                <h3>Horarios flexibles</h3>

                                <p>
                                    Trabajá en los horarios que mejor se adapten
                                    a vos.
                                </p>
                            </div>
                        </div>


                        <div className="beneficio">
                            <span className="beneficio-icono">📍</span>

                            <div>
                                <h3>Elegí tus zonas</h3>

                                <p>
                                    Realizá entregas cerca de las zonas donde
                                    te resulte más cómodo trabajar.
                                </p>
                            </div>
                        </div>


                        <div className="beneficio">
                            <span className="beneficio-icono">🏍️</span>

                            <div>
                                <h3>Tu vehículo</h3>

                                <p>
                                    Podés realizar entregas en moto, auto o
                                    bicicleta.
                                </p>
                            </div>
                        </div>


                        <div className="beneficio">
                            <span className="beneficio-icono">📱</span>

                            <div>
                                <h3>Todo desde la plataforma</h3>

                                <p>
                                    Recibí y administrá tus pedidos desde un
                                    solo lugar.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
            <section className="solicitud-repartidor">

                <div className="solicitud-container">

                    <div className="solicitud-titulo">

                        <span className="etiqueta">
                            EMPEZÁ HOY
                        </span>

                        <h2>
                            Completá tu solicitud
                        </h2>

                        <p>
                            Dejanos tus datos y nos pondremos en contacto
                            para continuar con el proceso de registro.
                        </p>

                    </div>


                    <form className="form-repartidor">

                        <div className="form-grid">

                            <div className="form-group">
                                <label>Nombre</label>

                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>Apellido</label>

                                <input
                                    type="text"
                                    placeholder="Tu apellido"
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>Correo electrónico</label>

                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>Teléfono</label>

                                <input
                                    type="tel"
                                    placeholder="11 1234 5678"
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>DNI</label>

                                <input
                                    type="text"
                                    placeholder="Tu DNI"
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>Localidad</label>

                                <input
                                    type="text"
                                    placeholder="Tu localidad"
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label>Medio de transporte</label>

                                <select required defaultValue="">
                                    <option value="" disabled>
                                        Seleccioná una opción
                                    </option>

                                    <option value="moto">
                                        Moto
                                    </option>

                                    <option value="auto">
                                        Auto
                                    </option>

                                    <option value="bicicleta">
                                        Bicicleta
                                    </option>
                                </select>
                            </div>


                            <div className="form-group">
                                <label>Disponibilidad</label>

                                <select required defaultValue="">
                                    <option value="" disabled>
                                        Seleccioná una opción
                                    </option>

                                    <option value="mañana">
                                        Mañana
                                    </option>

                                    <option value="tarde">
                                        Tarde
                                    </option>

                                    <option value="noche">
                                        Noche
                                    </option>

                                    <option value="todo-el-dia">
                                        Todo el día
                                    </option>
                                </select>
                            </div>

                        </div>


                        <div className="form-group mensaje">

                            <label>
                                ¿Querés contarnos algo más?
                            </label>

                            <textarea
                                placeholder="Escribí tu mensaje..."
                                rows="4"
                            ></textarea>

                        </div>


                        <label className="checkbox">

                            <input
                                type="checkbox"
                                required
                            />

                            <span>
                                Confirmo que los datos ingresados son correctos.
                            </span>

                        </label>


                        <button
                            type="submit"
                            className="btn-enviar-solicitud"
                        >
                            ENVIAR SOLICITUD
                        </button>

                    </form>

                </div>

            </section>

        </main>
    );
};

export default Encargos;