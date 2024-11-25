import React, { useState } from "react";
import { findAll } from "../livros/livrosApi";
import { CardLivros } from "./card";
import { Prateleira } from "../livros/prateleira";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

export function LivroView() {
  const [livros, setLivros] = useState([]);
  const [prateleiras, setPrateleiras] = useState({
    LendoAtualmente: [],
    ListaDeDesejos: [],
    Historico: [],
  });

  function moverLivro(livro) {
    setPrateleiras((prevPrateleiras) => {
      const { LendoAtualmente, ListaDeDesejos, Historico } = prevPrateleiras;

      if (
        !LendoAtualmente.some((item) => item.id === livro.id) &&
        !ListaDeDesejos.some((item) => item.id === livro.id) &&
        !Historico.some((item) => item.id === livro.id)
      ) {
        return {
          ...prevPrateleiras,
          ListaDeDesejos: [...ListaDeDesejos, livro],
        };
      }

      if (
        ListaDeDesejos.some((item) => item.id === livro.id) &&
        LendoAtualmente.length === 0
      ) {
        return {
          ...prevPrateleiras,
          ListaDeDesejos: ListaDeDesejos.filter((item) => item.id !== livro.id),
          LendoAtualmente: [...LendoAtualmente, livro],
        };
      }

      if (LendoAtualmente.some((item) => item.id === livro.id)) {
        return {
          ...prevPrateleiras,
          LendoAtualmente: LendoAtualmente.filter(
            (item) => item.id !== livro.id
          ),
          Historico: [...Historico, livro],
        };
      }

      return prevPrateleiras;
    });
  }

  async function carregarLivros() {
    try {
      const livrosAPI = await findAll();
      setLivros(livrosAPI);
    } catch (error) {
      console.error("Erro ao carregar livros:", error.message);
    }
  }

  return (
    <MDBContainer className="py-4">
      <MDBRow>
        {/* Prateleiras */}
        {Object.entries(prateleiras).map(([categoria, livros]) => (
          <MDBCol size="12" md="4" className="mb-4" key={categoria}>
            <Prateleira
              titulo={categoria.replace(/([A-Z])/g, " $1")}
              livros={livros}
              moverLivro={moverLivro}
            />
          </MDBCol>
        ))}
      </MDBRow>

      {/* Botão de Carregar Livros */}
      <MDBRow>
        <MDBCol size="12" className="text-center">
          <button className="btn btn-primary" onClick={carregarLivros}>
            CONSULTAR
          </button>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mt-4">
        {livros.map((livro) => (
          <MDBCol size="12" md="4" lg="3" className="mb-4" key={livro.id}>
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
    </MDBContainer>
  );
}
