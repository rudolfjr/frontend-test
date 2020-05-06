import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Node Modules
import {Container, Row, Col, Image} from 'react-bootstrap';
import { RiMovieLine } from 'react-icons/ri';
import { FaLinkedinIn, FaGithub, FaHome } from 'react-icons/fa';

// Services
import api from '../../services/api';

// components


// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function Movie({match}) {

  const {id} = match.params;
  const [filme, setFilme] = useState([]);

  useEffect(() => {

    async function getFilme(){

      const response = await api.get(`?apikey=7c16cdd1&i=${id}`);
      //console.log(response.data);
      setFilme(response.data);
        
    }
    getFilme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    {(filme.Title !== undefined && filme.Title.length) ? (
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
      
            </div>
            
            <p>
              <Link to="/" className="btn btn-danger">Voltar</Link>
            </p> 
          </Col>
          
          <Col xs={12} sm={8}>
            <Row>
              <Col>
                <h1 className="title">{filme.Title}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="movieBox">
                  <Row>
                    <Col xs={12} md>
                      <p>
                        <Image src={filme.Poster} fluid />
                      </p>
                    </Col>
                    <Col xs={12} md>
                        <legend><strong>Sinopse</strong></legend>
                        <p className="mt-2 mb-2 plot">{(filme.Plot !== "N/A") ? filme.Plot : 'Sinopse não informada'}</p>
                        <p><strong>Classificação Indicativa:</strong> {(filme.Rated !== "N/A") ? filme.Rated : 'Não Informada'}
                        </p>
                        <hr/>
                        <legend><strong>Informações</strong></legend>
                        <p><strong>Lançamento:</strong> {(filme.Released !== "N/A") ? filme.Released : 'Sem informação'}</p>
                        <p><strong>Gêneros:</strong> &nbsp;
                          {(filme.Genre !== undefined && filme.Genre.length) ? ((filme.Genre).split(',')).map((result, index) => (
                            <span className="genres" key={result}>{(index === 0) ? '' : ','}{result}</span>
                          )) : 'Sem informação'}
                        </p>
                        <p><strong>Diretor: </strong>{filme.Director}</p>
                        <p><strong>Produzido por:</strong> {(filme.Production !== "N/A") ? filme.Production : 'Sem informação'}</p>
                        <p><strong>Escritor(es):</strong> {(filme.Writer !== "N/A") ? filme.Writer : 'Sem informação'}</p>
                        <p><strong>Ator/Atriz: </strong>{(filme.Actors !== "N/A") ? filme.Actors : 'Sem informação'}</p>
                        <hr/>
                        <legend><strong>Dados Técnicos</strong></legend>
                        <p><strong>Idiomas: </strong>{filme.Language}</p>
                        <p><strong>País: </strong>{filme.Country}</p>
                        <p><strong>Site do Filme:</strong> {(filme.Website !== "N/A") ? filme.Website : 'Sem informação'}</p>
                        <p><strong>Lançamento do DVD:</strong> {(filme.DVD !== "N/A") ? filme.DVD : 'Sem informação'}</p>
                        
                        
                    </Col>
                  </Row>
                  <Row>
                      <Col>
                        <hr/>
                        <legend><strong>Premiações, Avaliações e Bilheteria</strong></legend>
                        <p><strong>Bilheteria:</strong> {(filme.BoxOffice !== "N/A") ? <span className="money">{filme.BoxOffice}</span> : 'Sem informação'}</p>
                        
                        <p><strong>Premiações: </strong>{(filme.Awards !== "N/A") ? filme.Awards : 'Sem informação'}</p>
                        <p className="mb-2"><strong>Avaliações:</strong></p>
                        <Row>
                          {(filme.Ratings !== undefined && filme.Ratings.length) ? ((filme.Ratings)).map((result, index) => (
                            <Col className="genres mb-3" key={result.Source}>
                              <p>{result.Source}</p>
                              <h3>{result.Value}</h3></Col>
                          )) : <p>Sem informação</p>}
                        </Row>
                      </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
          
        </Row>
      </Container>
    ) : ''}
    </>
  );
}

export default Movie;