import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';


function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleados, setEmpleados] = useState([]);

  const add = () => {
    axios
      .post("http://localhost:3001/create", {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        //alert("Empleado registrado!");
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!!</strong>",
          html: "<i>El empleado <strong>" + nombre + "</strong> fue registrado con exito!</i>",
          icon: 'success',
          timer:3000
        }).catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
          });
        });
      });
  };

  const update = () => {
    axios
      .put("http://localhost:3001/update", {
        id: id,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        //alert("Updated!");
        limpiarCampos()
        Swal.fire({
          title: "<strong>Actualizacion exitosa!!</strong>",
          html: "<i>El empleado <strong>" + nombre + "</strong> fue actualizado con exito!</i>",
          icon: 'success',
          timer:3000
        }).catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
          });
        });
      });
  };

  const deleteEmple = (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      html: "<i>Realmente desea eliminar a <strong>" + val.nombre + "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`http://localhost:3001/delete/${val.id}`)
        .then(() => {
          getEmpleados();
          //alert("Updated!");
          limpiarCampos();
          Swal.fire({
            text: val.nombre + " fue eliminado",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }).catch(function(error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error))
          });
        });
      }
    });
  };

  const limpiarCampos = () => {
    setAnios(0);
    setNombre("");
    setCargo("");
    setEdad(0);
    setPais("");
    setId("");
    setEditar(false);
  }

  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = () => {
    axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTION DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              value={nombre}
              placeholder="Ingrese un nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number"
              onChange={(e) => setEdad(e.target.value)}
              className="form-control"
              value={edad}
              placeholder="Ingrese una edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:
            </span>
            <input
              type="text"
              onChange={(e) => setPais(e.target.value)}
              value={pais}
              className="form-control"
              placeholder="Ingrese un pais"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:
            </span>
            <input
              type="text"
              onChange={(e) => setCargo(e.target.value)}
              value={cargo}
              className="form-control"
              placeholder="Ingrese un cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia:
            </span>
            <input
              type="number"
              onChange={(e) => setAnios(e.target.value)}
              value={anios}
              className="form-control"
              placeholder="Ingrese los años"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar? 
            <div>
            <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
            <button className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
            </div>
            :
            <button className="btn btn-success" onClick={add}>
            Registrar
          </button>
          }
        
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((val, key) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                    >
                      Editar
                    </button>
                    <button type="button" onClick={() => {deleteEmple(val)}} className="btn btn-danger">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
