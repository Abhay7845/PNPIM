/*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/
import { Container, Grid, Typography, CssBaseline } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImgShow from "../component/ImgShow";
import LowerHeader from "../component/LowerHeader";
import ProductDetailsTabular from "../component/ProductDetailsTabular";
import UpperHeader from "../component/UpperHeader";
import { Button } from "@material-ui/core";
import StaticTabularInformation from "../component/StaticTabularInformation";
import NpimDataDisplay from "../component/NpimDataDisplay";
import { useParams } from "react-router-dom";
import Loading from "../component/Loading";
import axios from "axios";
import HostManager from "../HostManager/HostManager";
import DisplayValidationComponent from "../component/DisplayValidationForL3";
import AlertPopup from "../component/AlertPopup";
import { BlinkingComponent, SmallDataTable } from "../component/ComponentForL3";
import Error from "../component/Notification";
import { useStyles } from "../Style/IndentL3";

const IndentL3 = () => {
  const { storeCode, rsoName } = useParams();
  const classes = useStyles();
  const [feedShowState, setFeedShowState] = useState({
    ...NpimDataDisplay,
    strCode: storeCode,
  });

  const [loading, setLoading] = useState(false);
  const [resetDrop, SetResetDrop] = useState(true);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });

  const [allDataFromValidation, setAllDataFromValidation] = useState({
    sizeUomQuantityRes: [],
    sizeQuantityRes: [],
    stoneQualityRes: "",
    tegQuantityRes: [],
    typeSet2Res: "",
    quantityRes: "",
    findingsRes: "",
  });
  const [productDetails, setProductDetails] = useState({
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
    itemCode: "",
  });

  const [statusData, setStatusData] = useState({});
  const [digit, setDigit] = useState();
  const [setSelectState, setSetSelectState] = useState([]);
  const [SizeState, setSizeState] = useState([]);

  let seventhDigits;

  useEffect(async () => {
    setImmediate(() => {
      setLoading(true);
    });
    setDigit();

    if (productDetails.itemCode !== "") {
      await axios
        .post(
          `${HostManager.mainHost}/npim/get/product/details`,
          productDetails
        )
        .then((response) => {
          let mailSms = "";
          if (response.data.code === "1001") {
            document.getElementById("result").style.visibility = "hidden";
            mailSms = "ItemCode not in Master";
            setAlertPopupStatus({
              status: true,
              main: mailSms,
              contain: "",
              mode: true,
            });
          } else if (response.data.code === "1003") {
            document.getElementById("result").style.visibility = "hidden";
            setAlertPopupStatus({
              status: true,
              main: response.data.value,
              contain: "",
              mode: true,
            });
          } else {
            if (productDetails.itemCode === "") {
              document.getElementById("result").style.visibility = "hidden";
            }
            if (productDetails.itemCode !== "") {
              document.getElementById("result").style.visibility = "visible";
            }
            setFeedShowState(response.data.value);
            setDigit(response.data.value.itemCode[6]);
            seventhDigits = response.data.value.itemCode[6];
            // DisplayValidationRunner();
          }
        })
        .catch((error) => {
          console.log("error==>", error);
        });
    }
    await axios
      .get(`${HostManager.mainHostL3}/npim/get/status/L3/${storeCode}`)
      .then(
        (response) => {
          if (response.data.code === "1001") {
            alert(response.data.value);
          } else {
            setStatusData(response.data);
          }
        },
        (error) => {
          console.log("error==>", error);
        }
      );
    setImmediate(() => {
      setLoading(false);
    });
  }, [productDetails]);

  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/indentL3/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 3,
      name: "Report",
      link: `/reportL3/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
  ];
  const onSearchClick = (dropState) => {
    var doc = dropState.itemCode;
    setProductDetails({
      storeCode: storeCode,
      collection: "ALL",
      consumerBase: "ALL",
      group: "ALL",
      category: "ALL",
      itemCode: doc,
    });
  };

  const onBarClick = () => {};
  useEffect(async () => {
    if (feedShowState.itemCode !== "") {
      try {
        const response = await axios.get(
          `${HostManager.mainHostL3}/npim/size/dropdown/${feedShowState.itemCode}`
        );
        if (response.status === 200) {
          if (response.data.code !== "1001") {
            setSizeState(response.data.value);
          } else {
            setSizeState([]);
          }
        }
      } catch (err) {
        setSizeState([]);
      }
    } else {
      setSizeState([]);
    }
  }, [feedShowState.itemCode]);

  function NewDisplayValidation() {
    let data = {};
    if (digit === "F" || digit === "R" || digit === "V" || digit === "W") {
      let sizeUomQuantity, sizeQuantity, Quantity;
      if (digit === "V" && feedShowState.category === "BANGLE") {
        sizeUomQuantity = true;
      } else if (
        (digit === "V" || digit === "F") &&
        stoneQualityCheck(feedShowState)
      ) {
        sizeQuantity = true;
        Quantity = true;
      } else if (digit === "F" && !stoneQualityCheck(feedShowState)) {
        sizeQuantity = true;
        Quantity = true;
      }
      return (data = {
        sizeUomQuantityRes: sizeUomQuantity && SizeState[0] ? true : false,
        sizeQuantityRes: sizeQuantity && SizeState[0] ? true : false,
        stoneQualityRes: stoneQualityCheck(feedShowState) ? true : false,
      });
    } else if (
      digit === "0" ||
      digit === "1" ||
      digit === "2" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7" ||
      digit === "T"
    ) {
      let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect;
      if (
        digit === "0" ||
        digit === "1" ||
        digit === "3" ||
        digit === "2" ||
        digit === "4" ||
        digit === "5" ||
        digit === "6" ||
        digit === "7" ||
        digit === "T"
      ) {
        tegQuantity = true;
      }
      if (
        digit === "K" ||
        digit === "P" ||
        digit === "Y" ||
        digit === "B" ||
        digit === "C"
      ) {
        Quantity = true;
      }
      if (digit === "N" && !stoneQualityCheck(feedShowState)) {
        TypeSet2 = true;
      }
      return (data = {
        tagSelect: tegSelect ? true : false,
        setSelect: setSelect && setSelectState[0] ? true : false,
        Quantity: Quantity ? true : false,
        tegQuantityRes: tegQuantity ? true : false,
        typeSet2Res: TypeSet2 ? true : false,
        stoneQuality: stoneQualityCheck(feedShowState) ? true : false,
      });
    } else {
      let findings, stoneQuality, Quantity;
      if (stoneQualityCheck(feedShowState)) {
        stoneQuality = true;
      }
      if (
        digit === "K" ||
        digit === "P" ||
        digit === "Y" ||
        digit === "B" ||
        digit === "J" ||
        digit === "D" ||
        digit === "N" ||
        digit === "X" ||
        digit === "O" ||
        digit === "H" ||
        digit === "S" ||
        digit === "C"
      ) {
        Quantity = true;
      }
      return (data = {
        quantityRes: Quantity ? true : false,
        findingsRes: findings ? true : false,
        stoneQualityRes: stoneQualityCheck(feedShowState) ? true : false,
      });
    }
  }
  const onClickSubmitBtnHandler = (event) => {
    let msg = {};
    // const data = NewDisplayValidation();
    // console.log("data=>", data);
    // const result = Object.keys(data).filter(
    //   (eachKey) => data[eachKey] === true
    // );
    // console.log("result =>", result);
    // for (let key of result) {
    //   for (let resultKey of Object.keys(allDataFromValidation)) {
    //     if (
    //       key === resultKey &&
    //       allDataFromValidation[resultKey].length === 0
    //     ) {
    //       msg = {
    //         ...msg,
    //         status: false,
    //         message: `${result.join("/")} is required`,
    //       };
    //     }
    //   }
    // }
    let stdUcpNotSelectData;
    ////API HITTING START//
    if (!msg.status && Object.keys(msg).length > 0) {
      Error(msg.message);
    } else {
      stdUcpNotSelectData = `stdUcp-${0}`;
      console.log("loading1==>", loading);
      const inputData = {
        category: productDetails.category,
        childNodesE: feedShowState.childNodesE,
        childNodesN: feedShowState.childNodesN,
        karatageRange: feedShowState.karatageRange,
        childNodeF: feedShowState.childNodeF,
        childNodeO: feedShowState.childNodeO,
        childNodeV: feedShowState.childNodeV,
        childNodeK: feedShowState.childNodeK,
        childNodeH: feedShowState.childNodeH,
        collection: productDetails.collection,
        consumerbase: productDetails.consumerBase,
        findings: allDataFromValidation.findingsRes,
        indCategory: feedShowState.category,
        indQty: allDataFromValidation.quantityRes,
        indentLevelType: feedShowState.itemLevelType,
        itemCode: feedShowState.itemCode,
        itgroup: productDetails.group,
        npimEventNo: feedShowState.npimEventNo,
        reasons: "",
        rsoName: rsoName,
        saleable: "",
        set2Type: allDataFromValidation.typeSet2Res,
        sizeQuantitys: allDataFromValidation.sizeQuantityRes,
        sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
        stoneQuality: allDataFromValidation.stoneQualityRes
          ? allDataFromValidation.stoneQualityRes
          : stdUcpNotSelectData,
        stoneQualityVal: feedShowState.stoneQualityVal,
        strCode: storeCode,
        submitStatus: "indent",
        tagQuantitys: allDataFromValidation.tegQuantityRes,
      };
      console.log("inputData==>", inputData);
      DisplayValidationRunner();
      setTimeout(() => {
        setImmediate(() => {
          setLoading(true);
        });
        axios
          .post(
            `${HostManager.mainHostL3}/npim/insert/responses/from/L3`,
            inputData
          )
          .then((response) => {
            let mailSms = "";
            if (response.data.code === "1001") {
              if (
                productDetails.collection === "ALL" ||
                productDetails.consumerBase === "ALL" ||
                productDetails.group === "ALL" ||
                productDetails.category === "ALL"
              ) {
                mailSms = "Sorry! Data Not Saved";
              } else if (
                productDetails.collection !== "ALL" ||
                productDetails.consumerBase !== "ALL" ||
                productDetails.group !== "ALL" ||
                productDetails.category !== "ALL"
              ) {
                mailSms = "No more data available for the selected category.";
              } else {
                mailSms = response.data.value;
              }
              setAlertPopupStatus({
                status: true,
                main: mailSms,
                contain: "",
                mode: true,
              });
            } else {
              if (response.status === 200 && response.data.code === "1000") {
                document.getElementById("result").style.visibility = "hidden";
                setAlertPopupStatus({
                  status: true,
                  main: "Data has been saved Successfully",
                  contain: "",
                  mode: true,
                });
                setFeedShowState(response.data.value);
                setAllDataFromValidation({
                  sizeUomQuantityRes: [],
                  sizeQuantityRes: [],
                  stoneQualityRes: "",
                  tegQuantityRes: [],
                  typeSet2Res: "",
                  quantityRes: "",
                  findingsRes: "",
                });
                setLoading(false);
              }
              seventhDigits = response.data.value.itemCode[6];
            }
          })
          .catch((error) => {
            console.log("error==>", error);
          });
        console.log("loading3==>", loading);
        setLoading(false);
      }, 1000);
    }
  };

  function closeHandler() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });
    });
    setImmediate(() => {
      setLoading(false);
    });
  }

  function closeHandlerForRest() {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
        mode: false,
      });
      SetResetDrop(!resetDrop);
    });

    setImmediate(() => {
      setLoading(false);
      SetResetDrop(true);
    });
  }

  function stoneQualityCheck(inputObj) {
    if (inputObj.si2Gh) {
      return true;
    }
    if (inputObj.vsGh) {
      return true;
    }
    if (inputObj.vvs1) {
      return true;
    }
    if (inputObj.i2Gh) {
      return true;
    }
    if (inputObj.si2Ij) {
      return true;
    } else {
      return false;
    }
  }

  function DisplayValidationRunner() {
    setDigit(feedShowState.itemCode[6]);
  }

  function stoneOptionsData(inputObj) {
    let stoneOptionList = [];
    if (inputObj.stdUCP) {
      stoneOptionList[1 + stoneOptionList.length] = `stdUCP-${inputObj.stdUCP}`;
    }
    if (inputObj.si2Gh) {
      stoneOptionList[1 + stoneOptionList.length] = `si2Gh-${inputObj.si2Gh}`;
    }
    if (inputObj.vsGh) {
      stoneOptionList[1 + stoneOptionList.length] = `vsGh-${inputObj.vsGh}`;
    }
    if (inputObj.vvs1) {
      stoneOptionList[1 + stoneOptionList.length] = `vvs1-${inputObj.vvs1}`;
    }
    if (inputObj.i2Gh) {
      stoneOptionList[1 + stoneOptionList.length] = `i2Gh-${inputObj.i2Gh}`;
    }
    if (inputObj.si2Ij) {
      stoneOptionList[1 + stoneOptionList.length] = `si2Ij-${inputObj.si2Ij}`;
    }

    return stoneOptionList;
  }
  function createTegOfItems(inputObj) {
    let tegOfItems = ["Single_Tag", "Separate_Tag"];
    if (inputObj.childNodesE || inputObj.childNodesN) {
      if (inputObj.childNodesE)
        tegOfItems[1 + tegOfItems.length] = "Only_EARRING";
      if (inputObj.childNodesN)
        tegOfItems[1 + tegOfItems.length] = "Only_NECKWEAR_OR_PENDANT";
    } else {
      return false;
    }
    return tegOfItems;
  }

  function allDataChangeHandler(allValidationInput) {
    setImmediate(() => {
      setAllDataFromValidation(allValidationInput);
    });
  }

  function sizeUomQuantityResHandler(sizeUomQuantityData) {
    allDataChangeHandler();
    setImmediate(() => {
      setAllDataFromValidation({
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
        sizeUomQuantityRes: sizeUomQuantityData,
      });
    });
    // getAll("sizeUomQuantityRes", sizeUomQuantityData);
  }
  function sizeQuantityResHandler(sizeQuantityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: sizeQuantityData,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("sizeQuantityRes", sizeQuantityData)
  }
  function stoneQualityResHandler(stoneQualityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: stoneQualityData.target.value,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("stoneQualityRes", stoneQualityData.target.value)
  }
  function tegQuantityResHandler(tegQuantityData) {
    setAllDataFromValidation({
      sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
      sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
      stoneQualityRes: allDataFromValidation.stoneQualityRes,
      tegQuantityRes: tegQuantityData,
      typeSet2Res: allDataFromValidation.typeSet2Res,
      quantityRes: allDataFromValidation.quantityRes,
      findingsRes: allDataFromValidation.findingsRes,
    });
  }
  function typeSet2ResHandler(typeSet2Data) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: typeSet2Data.target.value,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("typeSet2Res", typeSet2Data.target.value)
  }

  function quantityResHandler(quantityData) {
    if (quantityData > 2) {
      confirm("Indent Quantity is greater than 2  Do you wish to Proceed?");
    }
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: quantityData,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
  }
  function findingsResHandler(findingsData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: findingsData.target.value,
      });
    });
    // getAll("findingsRes", findingsData.target.value)
  }

  function tegSelectionResHandler(tegSelectionData) {
    if (tegSelectionData.target.value === "Separate") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/get/set/category/list/${feedShowState.itemCode}`
        )
        .then(
          (response) => {
            if (response.data.code === 1000) {
              setImmediate(() => {
                setSetSelectState(
                  response.data.value.map((element) => element.category)
                );
              });
            } else {
              console.log("response==>", response.data.value);
            }
          },
          (error) => {
            console.log("error==>", error);
          }
        );
    } else if (tegSelectionData.target.value === "Set") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/item/set/category/code/${feedShowState.itemCode}`
        )

        .then(
          (response) => {
            if (response.data.code === 1000) {
              setImmediate(() => {
                setSetSelectState(response.data.value);
              });
            } else {
              console.log("response==>", response.data.value);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
    }
  }

  function setSelectResHandler(setSelectData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: setSelectData,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("tegQuantityRes", tegQuantityData)
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.root}>
        <AlertPopup
          status={alertPopupStatus.status}
          // status={true}
          mainLable={alertPopupStatus.main}
          containLable={alertPopupStatus.contain}
          procideHandler=""
          discardHandler=""
          closeHandler={() => {
            alertPopupStatus.mode ? closeHandlerForRest() : closeHandler();
          }}
        />
        <Grid container className={classes.main}>
          <Grid item xs={12}>
            <UpperHeader
              itemCode={feedShowState.itemCode}
              storeCode={storeCode}
            />
            <Loading flag={loading} />

            {resetDrop ? (
              <LowerHeader
                onBar={onBarClick}
                onSear={onSearchClick}
                navBarList={navBarList}
                statusData={statusData}
                setAllDataFromValidation={setAllDataFromValidation}
                L3={true}
              />
            ) : (
              "Loading...!"
            )}
          </Grid>
          <div
            id="result"
            style={{
              visibility: "hidden",
            }}
            className="w-100"
          >
            <Grid direction="row" container>
              {/*IMAGE GRID START*/}
              <Grid item xs={12} md={5} style={{ paddingTop: "0.4%" }}>
                {
                  <div className={classes.imgShow}>
                    {feedShowState.itemCode ? (
                      <ImgShow
                        itemCode={feedShowState.itemCode}
                        imgLink="https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName="
                        videoLink={feedShowState.videoLink || ""}
                      />
                    ) : null}
                  </div>
                }
              </Grid>
              {/*IMAGE GRID END */}
              <Grid item xs={12} md={7} style={{ paddingTop: "0.4%" }}>
                <div className={classes.productInfo}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        className={classes.headingColor}
                        align="center"
                      >
                        {feedShowState.itemCode}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h5 className="text-center my-1">
                        <b>Product Specification</b>
                      </h5>
                      {feedShowState.adVariant ? (
                        <BlinkingComponent
                          color="red"
                          text="AD-Variant"
                          fontSize={15}
                        />
                      ) : null}
                      <ProductDetailsTabular information={feedShowState} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div>
                        <h5 className="text-center my-1">
                          <b>Indent Details</b>
                        </h5>
                        {feedShowState.btqCount ? (
                          <BlinkingComponent
                            color="red"
                            text={` ${feedShowState.btqCount}  Btqs Indented `}
                            fontSize={15}
                          />
                        ) : null}
                        <br />
                        <Grid container spacing={1}>
                          {digit ? (
                            <DisplayValidationComponent
                              digit={feedShowState.itemCode[6]}
                              cond={stoneQualityCheck(feedShowState)}
                              itemCode={feedShowState.itemCode}
                              stoneOptionList={stoneOptionsData(feedShowState)}
                              setType2option={["Chain", "Dori"]}
                              findingsOption={[feedShowState?.findings || ""]}
                              setSelectOptions={setSelectState}
                              tegOfItemOption={createTegOfItems(feedShowState)}
                              allDataChangeHandler={allDataChangeHandler}
                              sizeUomQuantityResHandler={
                                sizeUomQuantityResHandler
                              }
                              sizeQuantityResHandler={sizeQuantityResHandler}
                              stoneQualityResHandler={stoneQualityResHandler}
                              tegQuantityResHandler={tegQuantityResHandler}
                              typeSet2ResHandler={typeSet2ResHandler}
                              quantityResHandler={quantityResHandler}
                              findingsResHandler={findingsResHandler}
                              tegSelectionResHandler={tegSelectionResHandler}
                              setSelectResHandler={tegQuantityResHandler}
                              allDataFromValidation={allDataFromValidation}
                              feedShowState={feedShowState}
                            />
                          ) : null}
                        </Grid>
                        {SmallDataTable(feedShowState)}
                      </div>
                      <div>
                        {feedShowState.consumerBase ===
                          "solitarie".toUpperCase() && (
                          <a
                            href="https://tanishqsolitaires.titanjew.in/SolitairePortal/Home/Login"
                            target="iframe_a"
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              className="mt-3"
                            >
                              Book Now
                            </Button>
                          </a>
                        )}
                      </div>
                    </Grid>

                    {stoneQualityCheck(feedShowState) ? (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        style={{ maxHeight: "10.5vh" }}
                      >
                        <StaticTabularInformation
                          si2Gh={feedShowState.si2Gh}
                          vsGh={feedShowState.vsGh}
                          vvs1={feedShowState.vvs1}
                          i2Gh={feedShowState.i2Gh}
                          si2Ij={feedShowState.si2Ij}
                        />
                      </Grid>
                    ) : (
                      ""
                    )}
                    {feedShowState.category === "COUPLE BAND" ? (
                      <table className="table table-bordered ml-0 mx-2">
                        <thead>
                          <tr>
                            <th>SIZE CODE</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">SIZE COMBINATION</th>
                            <td>M + R</td>
                            <td>M + S</td>
                            <td>M + T</td>
                            <td>L + R</td>
                            <td>L + S</td>
                            <td>L + T</td>
                            <td>N + R</td>
                            <td>N + S</td>
                            <td>N + T</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <div className="mx-2 my-5">
                    <Button
                      className={classes.btnSub}
                      onClick={onClickSubmitBtnHandler}
                      fullWidth
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <span>Submit</span>
                      )}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </>
  );
};
export default IndentL3;
