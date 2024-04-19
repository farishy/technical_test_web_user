import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import Groups2Icon from "@mui/icons-material/Groups2";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Navbar from "../../components/AppLayout/Navbar";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 87.8vh;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-image: url("https://trbahadurpur.com/wp-content/uploads/2021/01/background-11.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const CardMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 2px dashed white;
  border-radius: 1rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-color: #b11d09;
  color: white;
  text-align: center;

  :hover {
    background-color: #9f1a08;
    cursor: pointer;
  }
`;

const MENU = [
  {
    name: "Absensi",
    icon: <SensorOccupiedIcon sx={{ fontSize: "4rem" }} />,
    route: "/absensi",
  },
  {
    name: "Master Karyawan",
    icon: <Groups2Icon sx={{ fontSize: "4rem" }} />,
    route: "/master-karyawan",
  },
  {
    name: "Master Absensi",
    icon: <AssignmentIndIcon sx={{ fontSize: "4rem" }} />,
    route: "/master-absensi",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container>
        <div className="d-flex gap-1 mb-1">
          <h1 style={{ fontSize: "3rem", fontWeight: "bolder" }}>
            Menu Dashboard
          </h1>
        </div>
        <div className="d-flex gap-2">
          {MENU.map((item) => (
            <CardMenu onClick={() => navigate(item?.route)}>
              {item?.icon}
              <h5>{item?.name}</h5>
            </CardMenu>
          ))}
        </div>
      </Container>
    </>
  );
}
