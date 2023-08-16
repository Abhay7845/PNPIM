import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import HostManager from "../HostManager/HostManager";
import { Multiselect } from "multiselect-react-dropdown";
import {
  DropDownMaterialUI,
  DynamicMultiSelectAndInput,
  InputFieldMaterialUI,
  MultiSelectAndInput,
  MultiselectUomAndSize,
} from "./ComponentForL3";
import useStyles from "../Style/ComponentForL3";

export default function DisplayValidationComponent(props) {
  const classes = useStyles();
  const [SizeState, setSizeState] = useState([]);
  const [ChildNodeV, setChildNodeV] = useState([]);
  const [ChildNodeF, setChildNodeF] = useState([]);
  const [ChildNodeN, setChildNodeN] = useState([]);
  const [CoupleGentsSize, setCoupleGentsSize] = useState([]);
  const [CoupleLadiesSize, setCoupleLadiesSize] = useState([]);
  const [sizeRow, setSizeRow] = useState();
  const [option, setOption] = useState([]);
  const [tagOption, setTagOption] = useState("");
  const [tagName, setTagName] = useState([]);
  const tagNameValue = tagName.map((tag) => {
    return {
      size: tag,
      quantity: "",
    };
  });

  const {
    digit,
    cond,
    itemCode,
    stoneOptionList,
    setType2option,
    tegOfItemOption,
    sizeUomQuantityResHandler,
    sizeQuantityResHandler,
    stoneQualityResHandler,
    tegQuantityResHandler,
    typeSet2ResHandler,
    quantityResHandler,
    allDataFromValidation,
    setSelectResHandler,
    setSelectOptions,
    feedShowState,
    findingsResHandler,
  } = props;

  const finger = !feedShowState.childNodeF ? "" : "Only_FINGERRING";
  const harm = !feedShowState.childNodeH ? "" : "Only_HARAM";
  const Tikka = !feedShowState.childNodeK ? "" : "Only_TIKKA";
  const other = !feedShowState.childNodeO ? "" : "Only_OTHER";
  const bangle = !feedShowState.childNodeV ? "" : "Only_BANGLE";
  const earing = !feedShowState.childNodesE ? "" : "Only_EARRING";
  const neckwear = !feedShowState.childNodesN ? "" : "Only_NECKWEAR";
  const chooseOption = ["Single_Tag", "Separate_Tag"];

  const optionForOtherAllSet = [
    "Single_Tag",
    "Separate_Tag",
    "Set2Tag",
    earing,
    neckwear,
    harm,
    Tikka,
    other,
    finger,
    bangle,
  ];
  const tagsOptions = optionForOtherAllSet.filter((item) => !item === false);
  const optionForSet0 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EARRING",
    "Only_CHAIN_WITH_PENDANT",
  ];
  const optionForSet1 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EARRING",
    "Only_NECKWEAR_OR_PENDANT",
  ];
  const tagsTCategory = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EARRING",
    "Only_MANGALSUTRA",
  ];
  useEffect(() => {
    if (digit === "0") {
      setOption(optionForSet0);
    }
    if (digit === "1") {
      setOption(optionForSet1);
    }
    if (digit === "T") {
      setOption(tagsTCategory);
    }
    if (
      digit === "2" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7"
    ) {
      setOption(tagsOptions);
    }
  }, []);

  useEffect(() => {
    tegQuantityResHandler(tagNameValue);
  }, [tagNameValue.length]);
  const options = option.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  useEffect(() => {
    axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${itemCode}`)
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setSizeState(result.data.value);
        }
        if (result.data.code === "1001") {
          console.log("data not found");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [itemCode]);

  //FETCH CHILD NODE ITEM CODE
  const childNodeV = feedShowState.childNodeV;
  const childNodeF = feedShowState.childNodeF;
  const childNodeN = feedShowState.childNodesN;

  useEffect(() => {
    axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${childNodeV}`)
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setChildNodeV(result.data.value);
        }
        if (result.data.code === "1001") {
          console.log("Size Not Available");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [ChildNodeV]);

  useEffect(() => {
    axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${childNodeF}`)
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setChildNodeF(result.data.value);
        }
        if (result.data.code === "1001") {
          console.log("Size Not Available");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [childNodeF]);
  useEffect(() => {
    axios
      .get(`${HostManager.mainHostL3}/npim/size/dropdown/${childNodeN}`)
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setChildNodeN(result.data.value);
        }
        if (result.data.code === "1001") {
          console.log("Size Not Available");
        }
      })
      .catch((error) => console.log("error==>", error));
  }, [childNodeN]);

  // THIS IS FOR GENTS SIZE FETCH API
  useEffect(() => {
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3/npim/L3/dropdown/couple/band/${itemCode}/COUPLE%20GENTS`
      )
      .then((res) => res)
      .then((result) => {
        setCoupleGentsSize(result.data.value);
      })
      .catch((error) => console.log("error==>", error));
  }, [itemCode]);

  // THIS IS FOR LADIES SIZE FETCH API
  useEffect(() => {
    axios
      .get(
        `https://tanishqdigitalnpim.titan.in:8443/PNPIM/NPIML3/npim/L3/dropdown/couple/band/${itemCode}/COUPLE%20LADIES`
      )
      .then((res) => res)
      .then((result) => {
        setCoupleLadiesSize(result.data.value);
      })
      .catch((error) => console.log("error==>", error));
  }, [itemCode]);

  if (digit === "B" || digit === "C" || digit === "R" || digit === "V") {
    let sizeUomQuantity, sizeQuantity;
    if (digit === "V" && !cond) {
      sizeUomQuantity = true;
    } else if (
      (digit === "C" || digit === "F" || digit === "Y" || digit === "B") &&
      cond
    ) {
      sizeQuantity = true;
    } else if (
      (digit === "C" || digit === "F" || digit === "Y" || digit === "B") &&
      !cond
    ) {
      sizeQuantity = true;
    }

    return (
      <>
        {digit === "V" && (
          <Grid item xs={12} sm={12}>
            <MultiselectUomAndSize
              labelName="Size/UOM/Quantity"
              optionsList={SizeState}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              CategoryData={feedShowState}
              tegQuantityResHandler={tegQuantityResHandler}
            />
          </Grid>
        )}

        {sizeQuantity && (
          <Grid item xs={12} sm={12}>
            <MultiSelectAndInput
              labelName="Size/Quantity"
              optionsList={SizeState}
              onChangeHandler={sizeQuantityResHandler}
              CategoryData={feedShowState}
              tagOption={tagOption}
            />
          </Grid>
        )}
        {cond && (
          <Grid item xs={12} sm={12} className="my-2">
            <DropDownMaterialUI
              labelName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
            />
          </Grid>
        )}
      </>
    );
  } else if (
    digit === "E" ||
    digit === "N" ||
    digit === "P" ||
    digit === "T" ||
    digit === "2" ||
    digit === "3" ||
    digit === "0" ||
    digit === "1" ||
    digit === "3" ||
    digit === "4" ||
    digit === "5" ||
    digit === "6" ||
    digit === "7"
  ) {
    let tegQuantity, TypeSet2, Quantity, tegSelect, setSelect;
    if (
      digit === "0" ||
      digit === "1" ||
      digit === "2" ||
      digit === "P" ||
      digit === "E" ||
      digit === "N"
    ) {
      //CHECK THE CONDITION AND CHILD CODE ABD ADD THE DATA IN DROPDOWN
      tegOfItemOption ? (tegQuantity = true) : (Quantity = true);
    }
    if ((digit === "N" || digit === "E" || digit === "2") && !cond) {
      TypeSet2 = true;
    }
    if (
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
      tegSelect = true;
      setSelect = true;
      Quantity = false;
    }

    const optionsOnlyE = ["Only_EARRING"];
    const optionE = optionsOnlyE.map((element) => {
      return {
        valueData: element,
        lableValue: element,
      };
    });

    const optionsOnlyN = ["Only_NECKWEAR"];
    const optionN = optionsOnlyN.map((element) => {
      return {
        valueData: element,
        lableValue: element,
      };
    });
    const optionsOnlyV = ["Only_BANGLE"];
    const optionV = optionsOnlyV.map((element) => {
      return {
        valueData: element,
        lableValue: element,
      };
    });
    const optionsOnlyF = ["Only_FINGERRING"];
    const optionF = optionsOnlyF.map((element) => {
      return {
        valueData: element,
        lableValue: element,
      };
    });
    const optionsOnlyM = ["Only_MANGALSUTRA"];
    const optionM = optionsOnlyM.map((element) => {
      return {
        valueData: element,
        lableValue: element,
      };
    });
    const findings = feedShowState.findings;
    const findingsOptions = !findings ? "" : findings.split(",");
    const enableRows = (name, value) => {
      setSizeRow((old) => {
        switch (name) {
          case "A":
            return {
              ...old,
              [name]: value,
            };
          case "B":
            return {
              ...old,
              [name]: value,
            };
          case "C":
            return {
              ...old,
              [name]: value,
            };
          case "D":
            return {
              ...old,
              [name]: value,
            };
          case "E":
            return {
              ...old,
              [name]: value,
            };
          case "F":
            return {
              ...old,
              [name]: value,
            };
          case "G":
            return {
              ...old,
              [name]: value,
            };
          case "H":
            return {
              ...old,
              [name]: value,
            };
          case "I":
            return {
              ...old,
              [name]: value,
            };
          case "J":
            return {
              ...old,
              [name]: value,
            };
          case "K":
            return {
              ...old,
              [name]: value,
            };
          case "L":
            return {
              ...old,
              [name]: value,
            };
          case "M":
            return {
              ...old,
              [name]: value,
            };
          case "N":
            return {
              ...old,
              [name]: value,
            };
          case "O":
            return {
              ...old,
              [name]: value,
            };
          case "P":
            return {
              ...old,
              [name]: value,
            };
          case "Q":
            return {
              ...old,
              [name]: value,
            };
          case "R":
            return {
              ...old,
              [name]: value,
            };
          case "S":
            return {
              ...old,
              [name]: value,
            };
          case "T":
            return {
              ...old,
              [name]: value,
            };
          case "U":
            return {
              ...old,
              [name]: value,
            };

          case "V":
            return {
              ...old,
              [name]: value,
            };
          case "W":
            return {
              ...old,
              [name]: value,
            };

          case "X":
            return {
              ...old,
              [name]: value,
            };
          case "Y":
            return {
              ...old,
              [name]: value,
            };
          case "Z":
            return {
              ...old,
              [name]: value,
            };
          case "Single_Tag":
            return {
              ...old,
              [name]: value,
            };
          case "Separate_Tag":
            return {
              ...old,
              [name]: value,
            };
          case "Set2Tag":
            return {
              ...old,
              [name]: value,
            };
          case "Only_EARRING":
            return {
              ...old,
              [name]: value,
            };
          case "Only_MANGALSUTRA":
            return {
              ...old,
              [name]: value,
            };
          case "Only_NECKWEAR_PENDANT":
            return {
              ...old,
              [name]: value,
            };
          case "Only_HARAM":
            return {
              ...old,
              [name]: value,
            };
          case "Only_TIKKA":
            return {
              ...old,
              [name]: value,
            };
          case "Only_OTHER":
            return {
              ...old,
              [name]: value,
            };
          case "Only_CHAIN_WITH_PENDANT":
            return {
              ...old,
              [name]: value,
            };
          case "Only_NECKWEAR_OR_PENDANT":
            return {
              ...old,
              [name]: value,
            };
          case "Only_NECKWEAR":
            return {
              ...old,
              [name]: value,
            };
          case "Only_BANGLE":
            return {
              ...old,
              [name]: value,
            };
          case "Only_FINGERRING":
            return {
              ...old,
              [name]: value,
            };
        }
      });
    };
    const onInternalSelectChange = (selectedList, selectedItem) => {
      console.log("lableValue1234==>", selectedItem.lableValue);
      setTagName([...tagName, selectedItem.lableValue]);
      enableRows(selectedItem.lableValue, true);
    };
    const onInternalRemoveChange = (selectedList, removedItem) => {
      console.log("removedItem.lableValue==>", removedItem.lableValue);
      enableRows(removedItem.lableValue, false);
    };

    const rowHandlerChange = (event) => {
      let getData = [];
      let count = 0;

      for (let rowName in sizeRow) {
        if (sizeRow[rowName]) {
          getData[count++] = {
            size: rowName,
            quantity: document.getElementById(`${rowName}sq`).value
              ? document.getElementById(`${rowName}sq`).value
              : "",
          };
        }
      }
      return tegQuantityResHandler(getData);
    };
    const enableRow = (lableValue) => {
      for (let rowName in sizeRow) {
        if (rowName === lableValue && sizeRow[rowName]) {
          return true;
        }
      }
      return false;
    };

    return (
      <div className="w-100">
        {tegSelect ? (
          <Grid item xs={12} sm={12}>
            <Typography align="center" color="primary" className="my-1">
              Tags/Quality
            </Typography>
            <Multiselect
              options={options}
              onSelect={onInternalSelectChange}
              onRemove={onInternalRemoveChange}
              showCheckbox={true}
              displayValue="lableValue"
              placeholder="Choose Tag"
            />
            <table className="w-100">
              <tbody className="d-flex">
                {options.map((row, index) => (
                  <tr
                    key={index}
                    onChange={rowHandlerChange}
                    id={row.lableValue}
                    className={
                      enableRow(row.lableValue) ? classes.show : classes.hide
                    }
                  >
                    <input
                      type="text"
                      maxlength="1"
                      id={`${row.lableValue}sq`}
                      name={`${row.lableValue}sq`}
                      className={
                        row.lableValue === "Only_FINGERRING" ||
                        row.lableValue === "Only_BANGLE" ||
                        row.lableValue === "Only_MANGALSUTRA"
                          ? classes.inputArea
                          : classes.inputField
                      }
                      placeholder={row.lableValue}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
        ) : null}
        <table style={{ width: "100%", margin: 0 }}>
          <tbody>
            {optionF.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue)
                    ? classes.showDropdown
                    : classes.hide
                }
              >
                <MultiSelectAndInput
                  optionsList={ChildNodeF}
                  onChangeHandler={sizeQuantityResHandler}
                  CategoryData={feedShowState}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <table style={{ width: "100%", margin: 0 }}>
          <tbody>
            {optionM.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue)
                    ? classes.showDropdown
                    : classes.hide
                }
              >
                <MultiSelectAndInput
                  optionsList={ChildNodeN}
                  onChangeHandler={sizeQuantityResHandler}
                  CategoryData={feedShowState}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <table style={{ width: "100%", margin: 0 }}>
          <tbody>
            {optionE.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue)
                    ? classes.showDropdown
                    : classes.hide
                }
              >
                <Grid item xs={12} sm={12} className="my-1">
                  {feedShowState.findings ? (
                    <DropDownMaterialUI
                      labelName="Findings"
                      onChangeHandler={findingsResHandler}
                      optionsList={findingsOptions}
                      feedShowState={feedShowState}
                      // valueData=""
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="w-100">
          <tbody>
            {optionN.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue)
                    ? classes.showDropdown
                    : classes.hide
                }
              >
                <DropDownMaterialUI
                  labelName="Type Set-2"
                  onChangeHandler={typeSet2ResHandler}
                  optionsList={setType2option}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <table style={{ width: "100%", margin: 0 }}>
          <tbody>
            {optionV.map((row, index) => (
              <tr
                key={index}
                onChange={rowHandlerChange}
                id={row.lableValue}
                className={
                  enableRow(row.lableValue)
                    ? classes.showDropdown
                    : classes.hide
                }
              >
                <MultiselectUomAndSize
                  labelName="Size/UOM/Quantity"
                  optionsList={ChildNodeV}
                  sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                  CategoryData={feedShowState}
                  tegQuantityResHandler={tegQuantityResHandler}
                />
              </tr>
            ))}
          </tbody>
        </table>
        {setSelect && setSelectOptions[0] ? (
          <Grid item xs={12} sm={12}>
            <DynamicMultiSelectAndInput
              labelName="Set Select"
              optionsList={setSelectOptions}
              onChangeHandler={setSelectResHandler}
              // put props
            />
          </Grid>
        ) : null}
        {Quantity ? (
          <Grid item xs={12} sm={12}>
            <InputFieldMaterialUI
              labelName="Quantity"
              typeName="number"
              onChangeHandler={quantityResHandler}
              allDataFromValidation={allDataFromValidation}
            />
          </Grid>
        ) : null}
        {cond ? (
          <Grid item xs={12} sm={12} className="my-3">
            <DropDownMaterialUI
              labelName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
            />
          </Grid>
        ) : null}
      </div>
    );
  } else {
    let findings, stoneQuality, Quantity;
    if (digit === "S" || digit === "D" || digit === "J" || digit === "T") {
      findings = true;
    }
    if (cond) {
      stoneQuality = true;
    }
    Quantity = true;
    const finding = feedShowState.findings;
    const findingsOptions = !finding ? "" : finding.split(",");

    return (
      <>
        {digit === "L" ||
        feedShowState.category
          .toUpperCase()
          .replace(/\s{2,}/g, " ")
          .trim() === "TOE RING" ? (
          <Grid item xs={12} sm={12} className="my-3">
            <MultiSelectAndInput
              optionsList={SizeState}
              onChangeHandler={sizeQuantityResHandler}
              CategoryData={feedShowState}
            />
          </Grid>
        ) : (
          ""
        )}
        {digit === "Y" ||
        feedShowState.category
          .toUpperCase()
          .replace(/\s{2,}/g, " ")
          .trim() === "FINGER RING" ? (
          <Grid item xs={12} sm={12} className="my-3">
            <MultiSelectAndInput
              optionsList={SizeState}
              onChangeHandler={sizeQuantityResHandler}
              CategoryData={feedShowState}
            />
            {feedShowState.findings ? (
              <Grid item xs={12} sm={12}>
                <DropDownMaterialUI
                  labelName="Findings"
                  onChangeHandler={findingsResHandler}
                  optionsList={findingsOptions}
                />
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        ) : (
          ""
        )}
        {feedShowState.category.toUpperCase().replace(/\s{2,}/g, " ") ===
        "COUPLE BAND" ? (
          <div className="my-2 w-100">
            <DropDownMaterialUI
              labelName="Choose Tag"
              onChangeHandler={(e) => setTagOption(e.target.value)}
              optionsList={chooseOption}
            />
          </div>
        ) : (
          ""
        )}

        {tagOption === "Single_Tag" ? (
          <MultiSelectAndInput
            optionsList={SizeState}
            onChangeHandler={sizeQuantityResHandler}
            CategoryData={feedShowState}
          />
        ) : (
          ""
        )}
        {tagOption === "Separate_Tag" ? (
          <>
            <MultiSelectAndInput
              optionsList={CoupleGentsSize}
              onChangeHandler={sizeQuantityResHandler}
              CategoryData={feedShowState}
              labelName="FOR GENTS"
            />
            <MultiSelectAndInput
              optionsList={CoupleLadiesSize}
              onChangeHandler={sizeQuantityResHandler}
              CategoryData={feedShowState}
              labelName="FOR LADIES"
            />
          </>
        ) : (
          ""
        )}

        {digit === "D" ||
        digit === "J" ||
        digit === "H" ||
        digit === "S" ||
        digit === "O" ||
        feedShowState.category.toUpperCase() === "OTHERS" ||
        digit === "G" ||
        digit === "W" ||
        digit === "K" ? (
          <Grid item xs={12} sm={12} className="my-3">
            <InputFieldMaterialUI
              onChangeHandler={quantityResHandler}
              allDataFromValidation={allDataFromValidation}
            />
            {feedShowState.findings && (
              <Grid item xs={12} sm={12}>
                <DropDownMaterialUI
                  labelName="Findings"
                  onChangeHandler={findingsResHandler}
                  optionsList={findingsOptions}
                />
              </Grid>
            )}
          </Grid>
        ) : (
          ""
        )}

        {cond ? (
          <Grid item xs={12} sm={12} className="my-3">
            <DropDownMaterialUI
              labelName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
            />
          </Grid>
        ) : null}
      </>
    );
  }
}
