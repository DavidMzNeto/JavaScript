import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findById } from "./livrosApi";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";

export function Detalhes() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchLivro() {
      try {
        const dados = await findById(id);
        setLivro(dados);
      } catch (error) {
        setErro("Erro ao carregar os detalhes do livro.");
        console.error(error.message);
      }
    }

    fetchLivro();
  }, [id]);

  if (erro) {
    return <p className="text-danger">{erro}</p>;
  }

  if (!livro) {
    return <p>Carregando...</p>;
  }

  return (
    <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        <MDBCol size="12" md="8">
          <MDBCard>
            <MDBCardImage
              src={livro.imageLinks?.thumbnail || "imagem-padrao.jpg"}
              alt={livro.title || "Capa do livro"}
              position="top"
              className="rounded"
            />
            <MDBCardBody>
              <MDBCardTitle>
                {livro.title || "Título Desconhecido"}
              </MDBCardTitle>
              <MDBCardText>
                <strong>Autor:</strong> {livro.authors || "Autor Desconhecido"}
              </MDBCardText>
              <MDBCardText>
                <strong>Descrição:</strong>{" "}
                {livro.description || "Descrição indisponível"}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
