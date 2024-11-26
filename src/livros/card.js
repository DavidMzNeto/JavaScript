import React from "react";
import { Link } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRow,
} from "mdb-react-ui-kit";

export function CardLivros({ id, thumbnail, title, authors, Mover }) {
  return (
    <MDBCard className="my-3">
      <MDBCardImage
        src={thumbnail}
        alt="Capa do Livro"
        position="top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>{authors}</MDBCardText>
        <MDBRow className="d-flex justify-content-between">
          <MDBBtn onClick={() => Mover(id)}>Mover Livro</MDBBtn>
          <MDBBtn tag={Link} to={`/livros/${id}`} color="info">
            Ver Detalhes
          </MDBBtn>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
