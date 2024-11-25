import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

export function CardLivros({ id, thumbnail, title, authors, Mover }) {
  return (
    <MDBCard>
      <MDBCardImage
        src={thumbnail}
        alt="Capa do Livro"
        position="top"

      />
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText>{authors}</MDBCardText>
        <MDBBtn onClick={() => Mover(id)}>Mover Livro</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
