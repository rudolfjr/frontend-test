import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Node Modules
import axios from 'axios';
import {Container, Row, Col, Image, Button, Form} from 'react-bootstrap';
import { RiMovieLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaImdb, FaHome } from 'react-icons/fa';

// Services
import api from '../../services/api';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {

  const [filmes, setFilmes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [busca, setBusca] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [buscou, setBuscou] = useState(false);

  useEffect(() => {

    async function getFilmes(){
        axios.all([
          await api.get(`?apikey=7c16cdd1&i=tt7286456`),
          await api.get(`?apikey=7c16cdd1&i=tt8579674`),
          await api.get(`?apikey=7c16cdd1&i=tt8946378`),
          await api.get(`?apikey=7c16cdd1&i=tt6751668`),
          await api.get(`?apikey=7c16cdd1&i=tt0137523`),
          await api.get(`?apikey=7c16cdd1&i=tt0903747`)
        ]).then(response => {
        //  console.log(response);
          response.map(dados => 
            setFilmes(filmes => [...filmes, dados.data])
          );
        });
    }
    getFilmes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleBuscaFilme(e){
    e.preventDefault();

    try{
        await api.get(`?apikey=7c16cdd1&i=tt0903747&s=${busca}`).then(response => {
            setFilmes(response.data.Search);
            setBuscou(true);
        });     

    }catch(err){
        alert('Filme/Série não encontrado, tente novamente.');
    }
  }


  return (
    <>
    <Container>
      <Row>
        <Col xs={12} sm={4}>

          <div className="boxMenu">
            <div className="logo">
              <RiMovieLine size={24} color="#E02041" /> Cine Pipoca
            </div>

            <ul>
              <li><a href="/"><FaHome /> Home</a></li>
              <li><a href="https://www.linkedin.com/in/rudolfkrokerjr/"><FaLinkedinIn /> Linkedin</a></li>
              <li><a href="https://github.com/rudolfjr"><FaGithub /> GitHub</a></li>
            </ul>
 
            <Form onSubmit={handleBuscaFilme}>
              <Row>
                <Col xs={9}>
                  <Form.Control type="text" placeholder="Busque por Filme/Série" value={busca} onClick={e => setBuscou(false)} onChange={ e => setBusca(e.target.value)} />
                </Col>
                <Col xs={3}>
                  <Button variant="danger" type="submit" >
                    <FiSearch size={16} color="#fff" />
                  </Button>
                </Col>
              </Row>              
            </Form>
     
          </div>

          {(buscou) ? (
          <div className="buscaFeita">
            <h4>Você buscou por: <strong>{busca}</strong></h4>
          </div>          
          ) : ''}

        </Col>
        <Col xs={12} sm={8}>
          <Row>
            <Col>
              <h1 className="title">Filmes sugeridos para você</h1>
            </Col>
          </Row>
          <Row>
            {(filmes !== undefined && filmes.length) ? filmes.map(filme => (
              <Col xs={12} md={6} lg={4} key={filme.imdbID}>
                <Link to={'movie/' + filme.imdbID} className="blocoFilme">
                  <h2>{filme.Title}</h2>
                  <Image src={filme.Poster} fluid />
                  <div className="nota">
                    <FaImdb size={24} color="#E02041" />{filme.imdbRating}
                  </div>
                  <div className="data">
                    Lançamento: {filme.Year} | {(filme.Type === "movie" ? "Filme" : "Série")}
                  </div>
                  <p>

                  </p>
                </Link>
              </Col>
            )) : ''}
          </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Home;