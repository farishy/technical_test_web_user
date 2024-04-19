import styled from "@emotion/styled";
import Navbar from "../../components/AppLayout/Navbar";
import { Button, IconButton, Input, Tab, Tabs, Tooltip } from "@mui/material";
import Carousel from "react-multi-carousel";
import AddIcon from "@mui/icons-material/Add";
import LoadingSpinner from "../../components/Base/LoadingSpinner";
import React, { Suspense, useEffect, useState } from "react";
import { BASE_URL_API } from "../../constant/constant";
import axios from "axios";
// import Tab from '@mui/material/Tab';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
  getAllProductByCategoryId,
  reset,
} from "../../services/product/productSlice";
import CardProduct from "./components/Card/CardProduct";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotFound from "../../components/NotFound/NotFound";

const Container = styled.div`
  .intro {
    background-image: url("https://arsitagx-master.s3.ap-southeast-1.amazonaws.com/img_medium/3196/3641/25675/photo-01edt-bank-muamalat-desain-arsitek-oleh-pt-garisprada.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 91vh;

    /* padding-left: 5rem; */

    .intro-text-container {
      min-height: 93vh;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 10rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media only screen and (max-width: 1024px) {
        padding: 5rem;
      }

      .description {
        color: white;
        max-width: 700px;
        font-size: larger;
      }
    }
  }

  .product-container {
    display: grid;
    /* padding: 1rem 1rem; */
    /* background-color: #097DC2; */
  }
`;

const CaraoselContainer = styled.div`
  width: 95vw;
  @media only screen and (max-width: 1024px) {
    width: 92vw;
  }
  @media only screen and (max-width: 480px) {
    width: 90vw;
  }
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1025 },
    items: 4,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 481 },
    items: 2,
    paritialVisibilityGutter: 100,
  },
  mobile: {
    breakpoint: { max: 480, min: 320 },
    items: 1,
    paritialVisibilityGutter: 0,
  },
};

const ModalAddProduct = React.lazy(() =>
  import("./components/Modal/ModalAddProduct")
);

const defaultFallback = <LoadingSpinner />;

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);
  const [categories, setCategories] = useState([]);
  //   const [products, setProducts] = useState([]);
  const [tabIndex, setTabIndex] = useState("0");
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [dataUpdate, setDataUpdate] = useState({});

  // const handleChangeTab = (event, newTabIndex) => {
  //   setTabIndex(newTabIndex);
  // };

  // const fetchCategories = async () => {
  //   const result = await axios.get(BASE_URL_API + "/category/all");
  //   setCategories(
  //     [
  //       { id: 0, deskripsi: "Semua kategori paket", namaKategori: "Semua" },
  //     ].concat(result?.data?.data)
  //   );
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   if (tabIndex === "0") {
  //     dispatch(getAllProduct());
  //   } else {
  //     dispatch(getAllProductByCategoryId(tabIndex));
  //   }
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [isError, message, dispatch, tabIndex]);

  useEffect(() => {
    console.log("currentUser", currentUser);
    if (currentUser) {
      //   setIsLogin(true);
      if (currentUser.role === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, [currentUser, setIsAdmin]);

  // const handleDelete = (productId) => {
  //   Swal.fire({
  //     title: "Yakin?",
  //     text: "Apakah anda yakin ingin menghapus produk?",
  //     icon: "question",
  //     showConfirmButton: true,
  //     showCancelButton: true,
  //     confirmButtonColor: "#097dc2",
  //     customClass: {
  //       container: "my-swal",
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         dispatch(deleteProduct(productId)).then((res) => {
  //           console.log("res", res);
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "Produk berhasil dihapus",
  //             showConfirmButton: true,
  //             customClass: {
  //               container: "my-swal",
  //             },
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               navigate("/");
  //               // window.location.reload();
  //             }
  //           });
  //         });
  //       } catch (err) {
  //         Swal.fire({
  //           position: "center",
  //           icon: "error",
  //           title: err.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //           customClass: {
  //             container: "my-swal",
  //           },
  //         });
  //       }
  //     }
  //   });
  // };

  // const handleUpdate = (data) => {
  //   setDataUpdate(data);
  //   setIsOpenModalAddProduct(true);
  // };

  // const handleCloseModal = () => {
  //   setDataUpdate({});
  //   setIsOpenModalAddProduct(false);
  // };

  return (
    <>
      {/* {isOpenModalAddProduct ? (
        <Suspense fallback={defaultFallback}>
          <ModalAddProduct
            onClose={handleCloseModal}
            kategoriOptions={categories}
            dataExist={dataUpdate}
            isEdit={Object.keys(dataUpdate).length !== 0}
          />
        </Suspense>
      ) : null} */}
      <Container>
        <Navbar />
        <div className="intro">
          <div className="intro-text-container">
            <div className="d-flex">
              <h1
                style={{
                  color: "#6a0069",
                  fontWeight: "bolder",
                  fontStyle: "italic",
                  fontSize: "3rem",
                }}>
                Bank Muamalat
              </h1>
            </div>
            <br></br>
            <p className="description">
              Bank Muamalat Indonesia (BMI) is a commercial bank in Indonesia
              operating on the principles of Islamic banking. The bank was
              founded in 1 November 1991, based on the initiative of the
              Indonesian Council of Ulamas (MUI) and under the auspices of the
              Government of Indonesia.[1] The bank's operations began in 1 May
              1992[1] with foreign exchange service began in 1994. Funding
              products apply the principles of wadiah (deposit) and mudarabah
              (profit-sharing). Financing products apply the principles of bai’
              (buy and sell), musharakah (equity sharing), mudarabah, and ijarah
              (rent). Bank Muamalat serves nearly 3,000,000 customers throughout
              Indonesia and Malaysia.
            </p>
          </div>
        </div>
        {/* <div
          className="d-flex flex-column py-4 text-white"
          style={{ backgroundColor: "#F1A123" }}>
          <h3 className="mx-auto">Produk Kami</h3>
          <p className="text-center">
            Wujud komitmen Jasindo untuk memberikan perlindungan tak tertandingi
            bagi Anda
          </p>
          <Input
            startAdornment={<SearchIcon sx={{ color: "white" }} />}
            placeholder="Cari produk..."
            className="w-50 mx-auto"
            sx={{ color: "white" }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="product-container">
          {isAdmin ? (
            <Button
              startIcon={<AddIcon />}
              onClick={() => setIsOpenModalAddProduct(true)}>
              Tambah Produk
            </Button>
          ) : null}
          <div className="mt-3"></div>
          <TabContext value={tabIndex}>
            <TabList onChange={handleChangeTab} centered>
              {categories.map((item) => (
                <Tab
                  key={item.id}
                  label={
                    <span className="d-flex gap-2 align-items-center">
                      {item.namaKategori}{" "}
                      <Tooltip title={item.deskripsi}>
                        <InfoIcon fontSize="small" />
                      </Tooltip>
                    </span>
                  }
                  value={String(item.id)}
                />
              ))}
            </TabList>
            <TabPanel value={tabIndex}>
              {products.length != 0 ? (
                <CaraoselContainer>
                  <Carousel responsive={responsive}>
                    {products.filter((product) =>
                      product.namaPaket
                        .toLowerCase()
                        .match(search.toLowerCase())
                    ).length === 0 ? (
                      <div
                        className="d-flex justify-content-center"
                        style={{ width: "93.5vw" }}>
                        <NotFound />
                      </div>
                    ) : (
                      products
                        .filter((product) =>
                          product.namaPaket
                            .toLowerCase()
                            .match(search.toLowerCase())
                        )
                        .map((product, idx) => (
                          <CardProduct
                            dataValue={String(idx + 1)}
                            nama={product.namaPaket}
                            deskripsi={product.deskripsi}
                            image={product.urlImage}
                            isAdmin={isAdmin}
                            onClickDelete={() => handleDelete(product.id)}
                            onClickUpdate={() => handleUpdate(product)}
                          />
                        ))
                    )}
                  </Carousel>
                </CaraoselContainer>
              ) : isLoading ? (
                <LoadingSpinner />
              ) : (
                <NotFound />
              )}
            </TabPanel>
          </TabContext>
        </div> */}
      </Container>
    </>
  );
}
