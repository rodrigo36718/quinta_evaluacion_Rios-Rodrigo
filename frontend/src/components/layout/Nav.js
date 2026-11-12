import '../../styles/components/layout/Nav.css';
import { NavLink } from "react-router-dom";

const Nav = (props) => {
    return (
        <nav>
            <div>
                <ul>

                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? "activo" : undefined}
                        >
                            Inicio
                        </NavLink>
                    </li>

                    <li>
                        <NavLink 
                            to="/Delivery" 
                            className={({ isActive }) => isActive ? "activo" : undefined}
                        >
                            Delivery
                        </NavLink>
                    </li>

                    <li>
                        <NavLink 
                            to="/Encargos" 
                            className={({ isActive }) => isActive ? "activo" : undefined}
                        >
                            Encargos
                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Nav;