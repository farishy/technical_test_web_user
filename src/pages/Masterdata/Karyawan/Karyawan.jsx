import { Table } from "react-bootstrap";
import Navbar from "../../../components/AppLayout/Navbar";
import DataTable from "@mostrans/web-components/components/advanced/DataTable";

const columns = [
  {
    header: "HS Code",
    selector: "hs_code",
    getCellKey: (v) => "hs_code_" + v.id,
  },
  {
    header: "Nama Barang",
    selector: "deskripsi",
    getCellKey: (v) => "deskripsi" + v.id,
  },
  {
    header: "Tipe Kemasan",
    selector: "tipe",
    getCellKey: (v) => "tipe" + v.id,
  },
  {
    header: "Jumlah",
    selector: "qty",
    getCellKey: (v) => "qty" + v.id,
  },
  {
    header: "Berat / Volume",
    selector: "berat",
    getCellKey: (v) => "bervol" + v.id,
    renderCell: (row) => `${row.berat}(Kg) / ${row.dimensi}(CBM)`,
  },
];

export default function Karyawan() {
  return (
    <>
      <Navbar />
      <div className="d-flex flex-column p-1 gap-1">
        <h1 className="text-center"
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}>
          Master Karyawan
        </h1>
        <DataTable noHoverAnimation columns={columns} />
      </div>
    </>
  );
}
