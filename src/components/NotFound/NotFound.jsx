import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  img {
    /* width: 350px; */
    height: 260px;
    background-color: aliceblue;
    border-radius: 50%;
  }
`;

export default function NotFound(props) {
  const { className } = props;
  return (
    <Container className={className}>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-8044872-6430781.png?f=webp"
        alt="empty"
      />
      <p className="text-secondary">No Data</p>
    </Container>
  );
}
