import React from "react";
import { CardLivros } from "./card";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

export function Prateleira({ titulo, livros, moverLivro }) {
  return (
    <div className="prateleira-container">
      <h3>{titulo}</h3>
      <MDBRow>
        {livros.map((livro) => (
          <MDBCol
            size="12"
            sm="6"
            md="4"
            lg="7"
            className="mb-4"
            key={livro.id}
          >
            <CardLivros
              id={livro.id}
              thumbnail={livro.imageLinks?.thumbnail || "imagem-padrao.jpg"}
              title={livro.title || "Título Desconhecido"}
              author={livro.authors || "Autor Desconhecido"}
              Mover={() => moverLivro(livro)}
            />
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
}
