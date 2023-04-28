import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Table, Form, InputGroup } from 'react-bootstrap'

const Movie = () => {

  const [movie, setMovie] = useState([])
  const [buscar, setBuscar] = useState("")

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?s=batman&apikey=3f206c18`)
      .then(response => response.data)
      .then(data => setMovie(data.Search))
  }, [])


  const Buscar = () => {

    const buscar = document.getElementById("buscar").value

    axios.get(`https://www.omdbapi.com/?s=${buscar}&apikey=3f206c18`)
      .then(response => response.data)
      .then(data => setMovie(data.Search))

  }

  console.log(movie)

  const buscara = (e) => {
    setBuscar(e.target.value)
    //console.log(e.target.value)
  }
  let BuscarPelicula = []
  if (!buscar) {
    BuscarPelicula = movie
  } else {
    BuscarPelicula = movie.filter((response) => response.Title.toLowerCase().includes(buscar))
  }


  return (
    <div style={{backgroundColor:"#E5E8E8"}}>
      <br/>
    <div className='container'>

      <InputGroup className="mb-3">

        <Form.Control style={{ borderColor: "lightblue" }} id='buscar' size="lg" type="text" placeholder="Nombre de la Pelicula/serie" />

        <Button onClick={() => Buscar()} variant="outline-primary">Buscar Pelicula/serie</Button>
      </InputGroup>

      <Form.Control style={{ borderColor: "black", width:"400px" }} onChange={buscara} size="lg" type="text" placeholder="Buscar Peliculas cargadas" /><hr />


      <Table style={{borderColor:"lightblue"}} striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Tipo</th>
            <th>Año</th>
            <th>Imagen</th>
          </tr>
        </thead>
        {
          !movie
            ?
            <tr>
              <th colSpan={4}>
                <h1 align="center ">Error, no se encontro la Pelicula/serie</h1>
              </th>
            </tr>
            :
            <tbody align='center'>
              {
                BuscarPelicula.map((p, i) => (
                  <tr key={i}>
                    <td>{p.Title}</td>
                    <td>{p.Type}</td>
                    <td>{p.Year}</td>
                    <td><img src={p.Poster} align="center" style={{ width: "250px", height: "250px" }} /></td>
                  </tr>

                ))
              }
            </tbody>
        }
      </Table>
    </div>
    </div>
  )
}

export default Movie