import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mostrans/web-components/components/base/Button";


const Container = styled.div`
  display: grid;
  padding-left: 200;
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 1rem;

  .card {
    height: 300px;
    width: 325px;
    border-radius: 1rem;
    position: relative;
    .card-content {
      padding: 1rem;
    }

    .button-delete {
      position: absolute;
      top: 0;
      right: 0;
      margin: 1rem;
      border: 1px solid red;
      background-color: white;

      :hover {
        background-color: red;
        color: white;
      }
    }

    .button-update {
      position: absolute;
      top: 0;
      right: 0;
      margin: 5rem 1rem 1rem 1rem;
      border: 1px solid #f1a123;
      background-color: white;

      :hover {
        background-color: #f1a123;
        color: white;
      }
    }
  }

  .card img {
    height: 150px;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .card p {
    font-size: small;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card h5 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default function CardProduct(props) {
  const {
    image,
    nama,
    deskripsi,
    dataValue,
    onClickDelete,
    isAdmin,
    onClickUpdate,
  } = props;
  return (
    <Container>
      <div className="card" data-value={dataValue}>
        <img src={image} alt="img_paket" />
        <div className="card-content">
          <h5>{nama}</h5>
          <p>{deskripsi}</p>
          <Button variant="text" sx={{ textTransform: "none" }}>
            Lihat Selengkapnya
          </Button>
        </div>
        {isAdmin ? (
          <div>
            <IconButton
              color="error"
              className="button-delete"
              onClick={onClickDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="warning"
              className="button-update"
              onClick={onClickUpdate}>
              <CreateIcon />
            </IconButton>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
