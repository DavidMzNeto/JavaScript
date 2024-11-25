import React, { useState } from "react";
import { CardLivros } from "./card";
import { findAll } from "./livrosApi";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

export function PesquisaLivros() {
  const [termoDeBusca, setTermoDeBusca] = useState("");
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");

  async function buscarLivros() {
    try {
      const todosLivros = await findAll();
      const resultadosFiltrados = todosLivros.filter((livro) =>
        livro.title.toLowerCase().includes(termoDeBusca.toLowerCase())
      );
      setLivros(resultadosFiltrados);
      setErro("");
    } catch (error) {
      setErro("Erro ao buscar livros. Tente novamente mais tarde.");
      console.error(error.message);
    }
  }

  return (
    <MDBContainer className="py-5">
      <MDBRow className="justify-content-center text-center mb-4">
        <MDBCol size="12" md="8">
          <h1>Pesquisar Livros</h1>
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-center">
        <MDBCol size="12" md="8" lg="6">
          <div className="d-flex flex-column flex-md-row align-items-center">
            <MDBInput
              type="text"
              placeholder="Digite o título do livro..."
              value={termoDeBusca}
              onChange={(e) => setTermoDeBusca(e.target.value)}
              className="me-md-2 mb-2 mb-md-0 flex-grow-1"
            />
            <MDBBtn color="primary" onClick={buscarLivros}>
              Buscar
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>

      {erro && (
        <MDBRow className="justify-content-center mt-4">
          <MDBCol size="12" md="8">
            <p className="text-danger">{erro}</p>
          </MDBCol>
        </MDBRow>
      )}

      <MDBRow className="justify-content-center mt-4">
        {livros.length > 0
          ? livros.map((livro) => (
              <MDBCol
                size="12"
                sm="6"
                md="4"
                lg="3"
                className="mb-4"
                key={livro.id}
              >
                <CardLivros
                  id={livro.id}
                  thumbnail={livro.imageLinks?.thumbnail || "imagem-padrao.jpg"}
                  title={livro.title || "Título Desconhecido"}
                  author={livro.authors || "Autor Desconhecido"}
                />
              </MDBCol>
            ))
          : !erro &&
            termoDeBusca && (
              <MDBCol size="12" md="8" className="text-center">
                <p>Nenhum livro encontrado para "{termoDeBusca}"</p>
              </MDBCol>
            )}
      </MDBRow>
    </MDBContainer>
  );
}
