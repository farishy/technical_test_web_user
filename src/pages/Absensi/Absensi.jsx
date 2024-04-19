import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../../components/AppLayout/Navbar";
import Webcam from "react-webcam";
import LiveDateTime from "../../components/LiveDatetime/LiveDatetime";
import { formatTwoDigits } from "../../helpers/helpers";
import { DAYS } from "../../constant/constant";
import Button from "@mostrans/web-components/components/base/Button";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 91vh;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const CaptureButton = styled(Button)`
  height: 78px;
  background-color: "#007bff";
  border: "none";
  border-radius: 50%;
  margin-top: -6rem;
  font-size: 0.75rem;
`;

export default function Absensi() {
  const ref = useRef();
  const [absenImg, setAbsenImg] = useState(null);
  const [absenDatetime, setAbsenDatetime] = useState(null);
  const [videoConstraints, setVideoConstraints] = useState({
    width: 640,
    height: 480,
    facingMode: "user",
  });
  const handleResize = () => {
    const width = window.innerWidth > 640 ? 640 : window.innerWidth;
    const height = (width / 4) * 3; // Aspect ratio 4:3
    setVideoConstraints({ width, height });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const capture = useCallback(() => {
    const imageSrc = ref.current.getScreenshot();
    const datetime = new Date();

    const formattedDay = DAYS[datetime.getDay()];
    const formattedTime = `${formatTwoDigits(
      datetime.getHours()
    )}:${formatTwoDigits(datetime.getMinutes())}:${formatTwoDigits(
      datetime.getSeconds()
    )}`;
    const formattedDate = `${formatTwoDigits(
      datetime.getDate()
    )}-${formatTwoDigits(datetime.getMonth() + 1)}-${datetime.getFullYear()}`;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = "16px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(
        `${formattedDay}, ${formattedDate} ${formattedTime} WIB`,
        20,
        img.height - 20
      );
      const dataURL = canvas.toDataURL("image/png");
      setAbsenImg(dataURL);
    };
    img.src = imageSrc;
    // setAbsenImg(imageSrc);
    // setAbsenDatetime(datetime);
  }, [ref]);
  return (
    <>
      <Navbar />
      <Container>
        {!absenImg ? (
          <>
            <LiveDateTime />
            <Webcam
              audio={false}
              ref={ref}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              mirrored
              className="mt-1"
            />
            <CaptureButton
              variant="contained"
              color="primary"
              onClick={capture}>Capture</CaptureButton>
          </>
        ) : (
          <div className="d-flex flex-column gap-1">
            <img src={absenImg} alt="Captured" />
            <div className="d-flex justify-content-end gap-1">
              <Button variant="outlined" onClick={() => setAbsenImg(null)}>
                Ambil Ulang
              </Button>
              <Button variant="contained">Absen</Button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
