import React, { useState, useContext, useEffect } from 'react';
import {Button, Table} from "react-bootstrap";
import { searchUserByRut } from '../../services/user.service';
import {searchCheckByRut} from '../../services/check.service';

const DiasTrabajadosReporte = () => {
    const [usuario, setUsuario] = useState(null);
    const [rut, setRut] = useState('');
    const [diasTrabajados, setDiasTrabajados] = useState(0);
    const [marcaciones, setMarcaciones] = useState([]);

    useEffect(() => {
        if (usuario) {
            searchCheckByRut(usuario.rut).then(response => {
                setMarcaciones(response.data);
            });
        }
    }, [usuario]);

    useEffect(() => {
        const diasTrabajadosSet = new Set();

        marcaciones.forEach(marcacion => {
            const fechaParts = marcacion.fecha.split('-');
            const fechaStr = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
            diasTrabajadosSet.add(fechaStr);
        });

        setDiasTrabajados(diasTrabajadosSet.size);
    }, [marcaciones]);

    const searchUser = () => {
        searchUserByRut(rut).then(response => {
            setUsuario(response.data);
        });
    }

    return (
        <div>
            <h1>Reporte de Trabajo</h1>
            <div className="form-group">
                <label>Rut</label>
                <input type="text" className="form-control" placeholder="22222222-2" value={rut} onChange={e => setRut(e.target.value)} />
                <Button variant="primary" onClick={() => searchUser()}>Buscar</Button>
            </div>
            {usuario ? (
                <div>
                    <h2>Reporte de días trabajados</h2>
                    <p>Has trabajado {diasTrabajados} días desde tu fecha de contratación ({usuario.fecha_contratacion}).</p>
                </div>
            ) : (
                <p>No se encontró un usuario con el RUT ingresado.</p>
            )}
        </div>
    );
}

export default DiasTrabajadosReporte;