import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  CssBaseline,
  Drawer,
} from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";
import AlertPopup from "../Components/AlertPopup";
import { ProductDetailsTabularL3 } from "../Components/ComponentForL3";
import DisplayValidationComponent from "../Components/DisplayValidationForL3";
import ImgShow from "../Components/ImgShow";
import LazyLoadindDataGrid from "../Components/LazyLoadindDataGrid";
import Loading from "../Components/Loading";
import Error from "../Components/Notification";
import ReportsAppBar from "../Components/ReportsAppBar";
import SideAppBar from "../Components/SideAppBar";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import StatusTabular from "../Components/StatusTabular";
import UpperHeader from "../Components/UpperHeader";
import HostManager from "../HostManager/HostManager";
import UrlManager from "../HostManager/UrlManager";
import useStyle from "../Style/ReportL3";

const ReportL3 = () => {
  const { storeCode, rsoName } = useParams();
  const [SizeState, setSizeState] = useState([]);
  const classes = useStyle();
  const [col, setCol] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [barOpener, setBarOpener] = useState(false);
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const [statusData, setStatusData] = useState();
  const [reportLabel, setReportLabel] = useState("Item_Wise_Report");
  const [dataRowInformation, setDataRowInformation] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [digit, setDigit] = useState(false);
  const [sizeOption, setSizeOption] = useState([]);
  const [modification, setModification] = useState(true);
  const [switchEnable, setSwitchEnable] = useState(false);
  const [setSelectState, setSetSelectState] = useState([]);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
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
  let seventhDigits;
  const [popupOpen, setPopupOpen] = useState(false);
  const [isConfirmed, setsConfirmed] = useState(false);
  const handelOpen = () => {
    setPopupOpen(true);
  };
  const handelClose = () => {
    setPopupOpen(false);
  };
  const handelYes = async () => {
    let confirmURL = `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3/npim/item/wise/rpt/edr/L3//${storeCode}`;
    try {
      const response = await axios.post(confirmURL, rows);
      if (response.status === 200) {
        setPopupOpen(false);
        setsConfirmed(true);
      }
    } catch (error) {
      console.log("error==>", error);
    }
  };
  useEffect(() => {
    setImmediate(() => {
      setLoading(true);
    });

    setTimeout(() => {
      let urlReport;
      switch (reportLabel) {
        case "Item_Wise_Report":
          urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
          break;
        case "NeedState":
          urlReport = `${UrlManager.SummaryReportL3}${storeCode}/NeedState`;
          break;
        case "Collection":
          urlReport = `${UrlManager.SummaryReportL3}${storeCode}/Collection`;
          break;
        case "ItGroup":
          urlReport = `${UrlManager.SummaryReportL3}${storeCode}/ItGroup`;
          break;
        case "Category":
          urlReport = `${UrlManager.SummaryReportL3}${storeCode}/Category`;
          break;
        case "Cancel_Item_List":
          urlReport = `${UrlManager.canceledItemReportL3}${storeCode}`;
          break;
        default:
          urlReport = urlReport = `${UrlManager.itemWiseReportL3}${storeCode}`;
          break;
      }

      axios.get(urlReport).then(
        (response) => {
          console.log("responseReport==>", response);
          setImmediate(() => {
            if (response.data.code === "1000") {
              setCol(response.data.coloum);
              setRows(response.data.value);
              setSwitchEnable(true);
            } else {
              setCol(response.data.coloum);
              setRows([]);
              setSwitchEnable(true);
            }
          });
        },
        (error) => {
          console.log("error==>", error);
        }
      );
      axios
        .get(`${HostManager.mainHostL3}/npim/get/status/L3/${storeCode}`)
        .then(
          (response) => {
            if (response.data.code === "1001") {
              console.log("response DATA==>", response.data.value);
            } else {
              setImmediate(() => {
                setStatusData(response.data);
              });
            }
          },
          (error) => {
            console.log("error==>", error);
          }
        );
    });

    setTimeout(() => {
      setImmediate(() => {
        setLoading(false);
      });
    });
  }, [statusCloserOpener, reportLabel, modification, popupOpen, storeCode]);

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

  const reportDropHandler = (input) => {
    setImmediate(() => {
      setLoading(true);
      setShowInfo(false);
    });

    DisplayValidationRunner();
    setImmediate(() => {
      setReportLabel(input);
    });

    setImmediate(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/Npim/getSize/502783VWQR1A02`
      )
      .then(
        (response) => {
          setImmediate(() => {
            setSizeOption(response.data.data);
          });
          console.log(sizeOption);
        },
        (error) => {
          console.log("error==>", error);
        }
      );
  }, [sizeOption]);

  function scrollTop() {
    window.scrollTo({ top: "0", behavior: "smooth" });
  }
  useEffect(() => {
    if (dataRowInformation.itemCode !== "") {
      try {
        const response = axios.get(
          `${HostManager.mainHostL3}/npim/size/dropdown/${dataRowInformation.itemCode}`
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
  }, [dataRowInformation.itemCode]);
  function NewDisplayValidation() {
    let digitt = dataRowInformation?.itemCode[6];
    if (
      digitt === "B" ||
      digitt === "C" ||
      digitt === "F" ||
      digitt === "R" ||
      digitt === "V" ||
      digitt === "Y"
    ) {
      let sizeUomQuantity, sizeQuantity;
      if (digitt === "V" && dataRowInformation?.category === "BANGLE") {
        sizeUomQuantity = true;
      } else if (
        (digitt === "V" ||
          digitt === "C" ||
          digitt === "Y" ||
          digitt === "B") &&
        stoneQualityCheck(dataRowInformation)
      ) {
        sizeQuantity = true;
      } else if (
        (digitt === "C" ||
          digitt === "F" ||
          digitt === "Y" ||
          digitt === "B") &&
        !stoneQualityCheck(dataRowInformation)
      ) {
        sizeQuantity = true;
      }
      return {
        sizeUomQuantityRes: sizeUomQuantity && SizeState[0] ? true : false,
        sizeQuantityRes: sizeQuantity && SizeState[0] ? true : false,
        stoneQualityRes: stoneQualityCheck(dataRowInformation) ? true : false,
      };
    } else if (
      digitt === "E" ||
      digitt === "N" ||
      digitt === "P" ||
      digitt === "2" ||
      digitt === "3" ||
      digitt === "0" ||
      digitt === "1" ||
      digitt === "3" ||
      digitt === "4" ||
      digitt === "5" ||
      digitt === "6" ||
      digitt === "7"
    ) {
      let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect;
      if (
        digitt === "0" ||
        digitt === "1" ||
        digitt === "2" ||
        digitt === "P" ||
        digitt === "E" ||
        digitt === "N"
      ) {
        //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DATA IN DROPDOWN
        createTegOfItems(dataRowInformation)
          ? (tegQuantity = true)
          : (Quantity = true);
      }
      if (
        (digitt === "N" || digitt === "E" || digitt === "2") &&
        !stoneQualityCheck(dataRowInformation)
      ) {
        TypeSet2 = true;
      }

      if (
        digitt === "3" ||
        digitt === "4" ||
        digitt === "5" ||
        digitt === "6" ||
        digitt === "7"
      ) {
        tegSelect = true;
        setSelect = true;
        Quantity = false;
        // stoneQuality = false;
      }

      return {
        tagSelect: tegSelect ? true : false,
        setSelect: setSelect && setSelectState[0] ? true : false,
        Quantity: Quantity ? true : false,
        tegQuantityRes: tegQuantity ? true : false,
        typeSet2Res: TypeSet2 ? true : false,
        // findingsRes:findings?true:false,
        stoneQuality: stoneQualityCheck(dataRowInformation) ? true : false,
      };
    } else {
      let findings, stoneQuality, Quantity;
      if (digitt === "D" || digitt === "J") {
        findings = true;
      }
      if (stoneQualityCheck(dataRowInformation)) {
        stoneQuality = true;
      }

      Quantity = true;
      return {
        quantityRes: Quantity ? true : false,
        findingsRes: findings ? true : false,
        stoneQualityRes: stoneQualityCheck(dataRowInformation) ? true : false,
      };
    }
  }
  const onClickSubmitBtnHandler = (event) => {
    let msg = {};
    // const data = NewDisplayValidation();
    // const result = Object.keys(data).filter(
    //   (eachKey) => data[eachKey] === true
    // );
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
    seventhDigits = dataRowInformation.itemCode[6];
    let displayData = { status: true };
    let stdUcpNotSeletData;

    if (!msg.status && Object.keys(msg).length > 0) {
      Error(msg.message);
    } else {
      stdUcpNotSeletData = `stdUcp-${displayData.data}`;

      DisplayValidationRunner();
      const inputData = {
        itemCode: dataRowInformation.itemCode,
        strCode: storeCode,
        saleable: "",
        reasons: "",
        childNodesE: dataRowInformation.childNodesE,
        childNodesN: dataRowInformation.childNodesN,
        childNodeF: dataRowInformation.childNodeF,
        childNodeH: dataRowInformation.childNodeH,
        childNodeK: dataRowInformation.childNodeK,
        childNodeV: dataRowInformation.childNodeV,
        childNodeO: dataRowInformation.childNodeO,
        findings: allDataFromValidation.findingsRes,
        indQty: allDataFromValidation.quantityRes,
        indCategory: dataRowInformation.category,
        submitStatus: "report",
        set2Type: allDataFromValidation.typeSet2Res,
        stoneQuality: allDataFromValidation.stoneQualityRes
          ? allDataFromValidation.stoneQualityRes
          : stdUcpNotSeletData,
        stoneQualityVal: dataRowInformation.stoneQualityVal,
        rsoName: rsoName,
        npimEventNo: dataRowInformation.npimEventNo,
        indentLevelType: "L3",
        collection: dataRowInformation.collection,
        consumerbase: dataRowInformation.consumerBase,
        itgroup: dataRowInformation.itGroup,
        category: dataRowInformation.category,
        exSize: dataRowInformation.size,
        exUOM: dataRowInformation.uom,
        exIndCategory: dataRowInformation.indCategory,
        exStonequality: dataRowInformation.stoneQuality,
        sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantitys: allDataFromValidation.sizeQuantityRes,
        tagQuantitys: allDataFromValidation.tegQuantityRes,
      };

      console.log("inputDataReports==>", inputData);
      setImmediate(() => {
        setLoading(true);
      });
      axios
        .post(
          `${HostManager.mainHostL3}/npim/update/responses/from/L3`,
          inputData
        )
        .then((response) => {
          setImmediate(() => {
            setShowInfo(false);
            setModification(!modification);
          });
          if (response.data.code === "1000") {
            alert("Updated Successfully");
          }
          setImmediate(() => {
            setLoading(false);
          });
        })
        .catch((error) => {
          console.log("error123==>", error);
        });
      reportDropHandler(reportLabel);
    }
    setImmediate(() => {
      setLoading(false);
    });
  };

  //CANCEL BUTTON
  const onClickCancelBtnHandler = (event) => {
    setImmediate(() => {
      setLoading(true);
    });
    DisplayValidationRunner();
    const inputData = {
      itemCode: dataRowInformation.itemCode,
      strCode: storeCode,
      saleable: "",
      size: "0",
      uom: "0",
      reasons: "",
      findings: allDataFromValidation.findingsRes,
      indQty: "0",
      indCategory: "0",
      submitStatus: "report",
      set2Type: allDataFromValidation.typeSet2Res,
      stoneQuality: "0",
      stoneQualityVal: "0",
      rsoName: rsoName,
      npimEventNo: dataRowInformation.npimEventNo,
      IndentLevelType: "L3",
      exSize: dataRowInformation.size,
      exUOM: dataRowInformation.uom,
      exIndCategory: dataRowInformation.indCategory,
      exStonequality: dataRowInformation.stoneQuality,
    };
    console.log("input==>", inputData);
    setTimeout(() => {
      axios
        .post(`${HostManager.mainHostL3}/npim/update/responses`, inputData)
        .then((response) => {
          alert(response.data.value);
          setImmediate(() => {
            setShowInfo(false);
            setModification(!modification);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      setImmediate(() => {
        setLoading(false);
      });
      reportDropHandler(reportLabel);
    });
    setImmediate(() => {
      setLoading(false);
    });
  };

  function closeHandler(params) {
    setImmediate(() => {
      setAlertPopupStatus({
        status: false,
        main: "",
        contain: "",
      });
    });
    setImmediate(() => {
      setLoading(false);
    });
  }
  const barHandler = () => {
    setImmediate(() => {
      setBarOpener(!barOpener);
    });
  };
  const statusOpener = () => {
    setImmediate(() => {
      setStatusCloserOpener(!statusCloserOpener);
    });
  };

  const rowDataHandler = (input) => {
    console.log("input==>", input);
    setImmediate(() => {
      setLoading(true);
      setDataRowInformation(input);
      setShowInfo(true);
      setSwitchEnable(false);
    });
    DisplayValidationRunner();
    scrollTop();
    setTimeout(() => {
      setImmediate(() => {
        setLoading(false);
      });
    }, 1500);
  };

  const DeleteRowData = (event) => {
    console.log("event==>", event);
    setImmediate(() => {
      setLoading(true);
    });
    DisplayValidationRunner();
    const inputFiled = {
      itemCode: event.itemCode,
      strCode: storeCode,
      saleable: "",
      size: "0",
      uom: "0",
      reasons: "",
      findings: "",
      indQty: "0",
      indCategory: "0",
      submitStatus: "report",
      set2Type: "",
      stoneQuality: "0",
      stoneQualityVal: "0",
      rsoName: rsoName,
      npimEventNo: "",
      IndentLevelType: "",
      exSize: event.size,
      exUOM: event.uom,
      exIndCategory: event.indCategory,
      exStonequality: event.stoneQuality,
    };
    console.log("inputFiled==>", inputFiled);
    axios
      .post(`${HostManager.mainHostL3}/npim/update/responses`, inputFiled)
      .then((response) => {
        alert(response.data.value);
        setImmediate(() => {
          setShowInfo(false);
          setModification(!modification);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    reportDropHandler(reportLabel);
    setImmediate(() => {
      setLoading(false);
    });
  };

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

  function createTegOfItems(inputObj) {
    let tegOfItems = ["Single_Tag", "Separate_Tag"];
    if (inputObj.childNodesE || inputObj.childNodesN) {
      if (inputObj.childNodesE)
        tegOfItems[1 + tegOfItems.length] = "Only_EAR_RING";

      if (inputObj.childNodesN)
        tegOfItems[1 + tegOfItems.length] = "Only_NECKWEAR_OR_PENDANT";
    } else {
      return false;
    }
    return tegOfItems;
  }

  function stoneOptionsData(inputObj) {
    let stoneOptionList = [];

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
    //tem added
    if (inputObj.stdUCP) {
      stoneOptionList[1 + stoneOptionList.length] = `stdUCP-${inputObj.stdUCP}`;
    }
    // setImmediate(() => { setStoneOption(stoneOptionList) });
    return stoneOptionList;
  }

  function sizeUomQuantityResHandler(sizeUomQuantityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: sizeUomQuantityData,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: allDataFromValidation.tegQuantityRes,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
    });
    // getAll("sizeUomQuantityRes", sizeUomQuantityData)
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
  }
  function tegQuantityResHandler(tegQuantityData) {
    setImmediate(() => {
      setAllDataFromValidation({
        sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
        sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
        stoneQualityRes: allDataFromValidation.stoneQualityRes,
        tegQuantityRes: tegQuantityData,
        typeSet2Res: allDataFromValidation.typeSet2Res,
        quantityRes: allDataFromValidation.quantityRes,
        findingsRes: allDataFromValidation.findingsRes,
      });
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
  }
  function quantityResHandler(quantityData) {
    console.log("quantityData==>", quantityData);
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
  }

  // const getAll = (name, value) => {
  //   allDataFromValidation[name] = value;
  //   setAllDataFromValidation();
  // };

  function tegSelectionResHandler(tegSelectionData) {
    if (tegSelectionData.target.value === "Separate") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/get/set/category/list/${dataRowInformation.itemCode}`
        )

        .then(
          (response) => {
            if (response.data.code === "1000") {
              setImmediate(() => {
                setSetSelectState(
                  response.data.value.map((element) => element.category)
                );
              });
            } else {
              console.log(response.data.value);
              alert(response.data.value);
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          }
        );
    } else if (tegSelectionData.target.value === "Set") {
      axios
        .get(
          `${HostManager.mailHostAdmin}/npim/item/set/category/code/${dataRowInformation.itemCode}`
        )
        .then(
          (response) => {
            if (response.data.code === "1000") {
              setImmediate(() => {
                setSetSelectState(response.data.value);
              });
            }
          },
          (error) => {
            console.log("error==>", error);
          }
        );
    } else {
    }
  }

  function displayPresentValidation(input) {
    if (
      seventhDigits === "B" ||
      seventhDigits === "C" ||
      seventhDigits === "F" ||
      seventhDigits === "R" ||
      seventhDigits === "V" ||
      seventhDigits === "W" ||
      seventhDigits === "Y"
    ) {
      let sizeUomQuantity, sizeQuantity, stoneQuality;
      sizeUomQuantity = allDataFromValidation.sizeUomQuantityRes;
      sizeQuantity = allDataFromValidation.sizeQuantityRes;
      stoneQuality = allDataFromValidation.stoneQualityRes;

      if (seventhDigits === "V" && !stoneQualityCheck(dataRowInformation)) {
        if (sizeUomQuantity.length > 0) {
          for (const element of sizeUomQuantity) {
            let condData =
              element.size &&
              (element.uom8 ||
                element.uom6 ||
                element.uom4 ||
                element.uom2 ||
                element.uom1)
                ? console.log("fine")
                : element.size;

            if (condData) {
              return {
                alert: "indent Quantity Required for size: " + condData,
                status: false,
              };
            }
          }

          let dataRes = {
            status: true,
            alert: "success",
            data: 0,
          };

          return dataRes;
        } else {
          return {
            alert: "indent Quantity Required ",
            status: false,
          };
        }
      } else if (
        (seventhDigits === "V" ||
          seventhDigits === "C" ||
          seventhDigits === "F" ||
          seventhDigits === "Y" ||
          seventhDigits === "B") &&
        stoneQualityCheck(dataRowInformation)
      ) {
        if (sizeQuantity.length > 0 && stoneQualityCheck(dataRowInformation)) {
          for (const element of sizeQuantity) {
            let condData =
              element.size && element.quantity
                ? console.log("fine")
                : element.size;

            if (condData) {
              return {
                alert: "indent Quantity Required for size: " + condData,
                status: false,
              };
            }
          }

          if (!stoneQuality) {
            let dataRes = {
              status: true,
              alert: "success",
              data: input,
            };
            return dataRes;
          }
        } else {
          return {
            alert: "indent Quantity Require",
            status: false,
          };
        }
      } else if (
        (digit === "C" || digit === "F" || digit === "Y" || digit === "B") &&
        !stoneQualityCheck(dataRowInformation)
      ) {
        if (sizeQuantity.length > 0 && !stoneQualityCheck(dataRowInformation)) {
          for (const element of sizeQuantity) {
            let condData =
              element.size && element.quantity
                ? console.log("fine")
                : element.size;

            if (condData) {
              return {
                alert: "indent Quantity Required for size: " + condData,
                status: false,
              };
            }
          }
        } else {
          return {
            alert: "indent Quantity Require",
            status: false,
          };
        }
      }
    } else if (
      seventhDigits === "E" ||
      seventhDigits === "N" ||
      seventhDigits === "P" ||
      seventhDigits === "2" ||
      seventhDigits === "3" ||
      seventhDigits === "0" ||
      seventhDigits === "1" ||
      seventhDigits === "4" ||
      seventhDigits === "5" ||
      seventhDigits === "6" ||
      seventhDigits === "7"
    ) {
      let tegQuantity, TypeSet2, Quantity, stoneQuality;
      tegQuantity = allDataFromValidation.tegQuantityRes;
      TypeSet2 = allDataFromValidation.typeSet2Res;
      Quantity = allDataFromValidation.quantityRes;
      stoneQuality = allDataFromValidation.stoneQualityRes;

      if (
        seventhDigits === "0" ||
        seventhDigits === "1" ||
        seventhDigits === "2" ||
        seventhDigits === "3" ||
        seventhDigits === "P" ||
        seventhDigits === "E" ||
        seventhDigits === "N" ||
        seventhDigits === "4" ||
        seventhDigits === "5" ||
        seventhDigits === "6" ||
        seventhDigits === "7"
      ) {
        //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DATA IN DROPDOWN

        if (tegQuantity.length > 0) {
          for (const element of tegQuantity) {
            let condData =
              element.tag && element.quantity
                ? console.log("fine")
                : element.tag;

            if (condData) {
              return {
                alert: "indent Quantity Required for teg: " + condData,
                status: false,
              };
            }
          }
        } else if (!Quantity) {
          return {
            alert: "indent Quantity Required",
            status: false,
          };
        }
        if (!stoneQuality) {
          let dataRes = {
            status: true,
            alert: "success",
            data: input,
          };

          return dataRes;
        }
      }

      if (
        (seventhDigits === "N" ||
          seventhDigits === "E" ||
          seventhDigits === "2") &&
        !stoneQualityCheck(dataRowInformation)
      ) {
        if (!TypeSet2) {
          return {
            alert: "indent TypeSet2 Required",
            status: false,
          };
        }
      }
    } else {
      let findings, stoneQuality, Quantity;
      findings = allDataFromValidation.findingsRes;
      stoneQuality = allDataFromValidation.stoneQualityRes;
      Quantity = allDataFromValidation.quantityRes;

      if (seventhDigits === "D" || seventhDigits === "J") {
        if (!findings) {
          return {
            alert: "indent Findings Required",
            status: false,
          };
        }
      }
      if (!Quantity) {
        return {
          alert: "indent Quantity Required",
          status: false,
        };
      }
      if (!stoneQuality) {
        let dataRes = {
          status: true,
          alert: "success",
          data: input,
        };
        return dataRes;
      }
    }

    return {
      alert: "success",
      status: true,
    };
  }

  function DisplayValidationRunner() {
    setImmediate(() => {
      setDigit(false);

      setAllDataFromValidation({
        sizeUomQuantityRes: [],
        sizeQuantityRes: [],
        stoneQualityRes: "",
        tegQuantityRes: [],
        typeSet2Res: "",
        quantityRes: "",
        findingsRes: "",
      });
    });

    setTimeout(() => {
      setImmediate(() => {
        setDigit(true);
      });
    }, 1500);
  }

  function showInformationHandler() {
    setImmediate(() => {
      setShowInfo(!showInfo);
    });
  }
  const reportOption = [
    "Item_Wise_Report",
    "NeedState",
    "Collection",
    "ItGroup",
    "Category",
    "Cancel_Item_List",
  ];
  return (
    <>
      <CssBaseline />
      <AlertPopup
        status={alertPopupStatus.status}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={closeHandler}
      />
      <Drawer
        anchor="left"
        open={barOpener}
        onClose={() => {
          setImmediate(() => {
            setBarOpener(false);
          });
        }}
      >
        <SideAppBar navBarList={navBarList} statusOpener={statusOpener} />
      </Drawer>
      <Drawer anchor="top" open={statusCloserOpener} onClose={statusOpener}>
        <StatusTabular statusData={statusData} />
      </Drawer>
      <Container className={classes.root} maxWidth="xl">
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <UpperHeader storeCode={storeCode} />
            <Loading flag={loading} />
            <ReportsAppBar
              reportDropHandler={reportDropHandler}
              reportOptions={reportOption}
              barHandler={barHandler}
              showInformationHandler={showInformationHandler}
              showInfo={showInfo}
              switchEnable={switchEnable}
            />
          </Grid>
          {dataRowInformation && showInfo ? (
            <Grid item xs={12}>
              <Grid item container spacing={3}>
                <Grid item xs={12} sm={5}>
                  <div className="mx-1">
                    <ImgShow
                      itemCode={dataRowInformation.itemCode}
                      imgLink="https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName="
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <div>
                    <Grid container item spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          className={classes.headingColor}
                          align="center"
                        >
                          {dataRowInformation.itemCode}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ProductDetailsTabularL3
                          information={dataRowInformation}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div>
                          <h5 className="text-center my-1">
                            <b>Indent Details</b>
                          </h5>
                          <Container>
                            <Grid item container>
                              {dataRowInformation.itemCode[6] && digit ? (
                                <DisplayValidationComponent
                                  digit={dataRowInformation.itemCode[6]}
                                  cond={stoneQualityCheck(dataRowInformation)}
                                  itemCode={dataRowInformation.itemCode}
                                  stoneOptionList={stoneOptionsData(
                                    dataRowInformation
                                  )}
                                  setType2option={["Chain", "Dori"]}
                                  findingsOption={[
                                    dataRowInformation.findings || "",
                                  ]}
                                  setSelectOptions={setSelectState}
                                  tegOfItemOption={createTegOfItems(
                                    dataRowInformation
                                  )}
                                  sizeUomQuantityResHandler={
                                    sizeUomQuantityResHandler
                                  }
                                  sizeQuantityResHandler={
                                    sizeQuantityResHandler
                                  }
                                  stoneQualityResHandler={
                                    stoneQualityResHandler
                                  }
                                  tegQuantityResHandler={tegQuantityResHandler}
                                  typeSet2ResHandler={typeSet2ResHandler}
                                  quantityResHandler={quantityResHandler}
                                  findingsResHandler={findingsResHandler}
                                  tegSelectionResHandler={
                                    tegSelectionResHandler
                                  }
                                  setSelectResHandler={tegQuantityResHandler}
                                  allDataFromValidation={allDataFromValidation}
                                  feedShowState={dataRowInformation}
                                />
                              ) : null}
                            </Grid>
                          </Container>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        {stoneQualityCheck(dataRowInformation) ? (
                          <Container>
                            <StaticTabularInformation
                              si2Gh={dataRowInformation.si2Gh}
                              vsGh={dataRowInformation.vsGh}
                              vvs1={dataRowInformation.vvs1}
                              i2Gh={dataRowInformation.i2Gh}
                              si2Ij={dataRowInformation.si2Ij}
                            />
                          </Container>
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Container>
                          <Grid container spacing={4}>
                            {reportLabel !== "Cancel_Item_List" ? (
                              <Grid item xs={12} sm={6}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  fullWidth
                                  onClick={onClickCancelBtnHandler}
                                >
                                  Cancel Indent
                                </Button>
                              </Grid>
                            ) : null}
                            <Grid
                              item
                              xs={12}
                              sm={reportLabel !== "Cancel_Item_List" ? 6 : 12}
                            >
                              <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                className={classes.btnSub}
                                onClick={onClickSubmitBtnHandler}
                              >
                                Submit
                              </Button>
                            </Grid>
                          </Grid>
                        </Container>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            {rows.length > 0 && col.length > 0 ? (
              <LazyLoadindDataGrid
                col={col}
                rows={rows}
                autoHeight={true}
                autoPageSize={true}
                reportLabel={reportLabel}
                rowDataHandler={rowDataHandler}
                handelOpen={handelOpen}
                handelClose={handelClose}
                handelYes={handelYes}
                popupOpen={popupOpen}
                isConfirmed={isConfirmed}
                dataRowInformation={dataRowInformation}
                allDataFromValidation={allDataFromValidation}
                DeleteRowData={DeleteRowData}
              />
            ) : (
              <Typography align="center" variant="h5" color="secondary">
                DATA NOT AVAILABLE
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ReportL3;
