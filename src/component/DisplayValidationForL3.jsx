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
  const [sizeRow, setSizeRow] = useState();
  const [option, setOption] = useState([]);
  // const [selectedValue, setSelectedValue] = useState("");

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

  // const chainWidthPendent = digit === "0" ? "Only_CHAIN_WITH_PENDANT" : "";
  // const earingForSet0 = digit === "0" ? "Only_EARRING" : "";
  // const onlyNeckWearOrPendent = digit === "1" ? "Only_Mangalsutra" : "";
  // const earingForSet1 = digit === "1" ? "Only_EARRING" : "";
  // const SetTOption = digit === "T" ? "Only_Neckwear_or_Pendant" : "";
  const finger = !feedShowState.childNodeF ? "" : "Only_Finger_Ring";
  const harm = !feedShowState.childNodeH ? "" : "Only_HARAM";
  const Tikka = !feedShowState.childNodeK ? "" : "Only_TIKKA";
  const other = !feedShowState.childNodeO ? "" : "Only_OTHER";
  const bangle = !feedShowState.childNodeV ? "" : "Only_BANGLE";
  const earing = !feedShowState.childNodesE ? "" : "Only_EARRING";
  const neckwear = !feedShowState.childNodesN ? "" : "Only_NECKWEAR";
  const optionForOtherAllSet = [
    "Single_Tag",
    "Separate_Tag",
    finger,
    earing,
    neckwear,
    bangle,
    harm,
    Tikka,
    other,
  ];
  console.log("optionForOtherAllSet==>", optionForOtherAllSet);
  console.log("feedShowState==>", feedShowState);
  const tagsOptions = optionForOtherAllSet.filter((item) => !item === false);

  useEffect(() => {
    setOption(tagsOptions);
  }, []);

  const options = option.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  console.log("options==>", options);

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
  }, []);

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
  }, [childNodeV]);

  const ChildNodeFOptions = ChildNodeF.map((element) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  if (
    digit === "B" ||
    digit === "C" ||
    digit === "F" ||
    digit === "R" ||
    digit === "V" ||
    digit === "Y"
  ) {
    let sizeUomQuantity, sizeQuantity;

    if (digit === "V" && !cond) {
      sizeUomQuantity = true;
    } else if (
      (digit === "V" ||
        digit === "C" ||
        digit === "F" ||
        digit === "Y" ||
        digit === "B") &&
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
        {feedShowState.category === "BANGLE" ? (
          <Grid item xs={12} sm={12}>
            <MultiselectUomAndSize
              labelName="Size/UOM/Quantity"
              optionsList={SizeState}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              CategoryData={feedShowState}
            />
          </Grid>
        ) : (
          ""
        )}

        {sizeQuantity && SizeState[0] ? (
          <Grid item xs={12} sm={12}>
            <MultiSelectAndInput
              labelName="Size/Quantity"
              optionsList={SizeState}
              onChangeHandler={sizeQuantityResHandler}
              CategoryData={feedShowState}
            />
          </Grid>
        ) : null}
        {cond ? (
          <Grid item xs={12} sm={12}>
            <DropDownMaterialUI
              labelName="Stone Quality"
              onChangeHandler={stoneQualityResHandler}
              optionsList={stoneOptionList}
            />
          </Grid>
        ) : null}
      </>
    );
  } else if (
    digit === "E" ||
    digit === "N" ||
    digit === "P" ||
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
      digit === "7"
    ) {
      tegSelect = true;
      setSelect = true;
      Quantity = false;
      // stoneQuality = false;
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
    const optionsOnlyF = ["Only_Finger_Ring"];
    const optionF = optionsOnlyF.map((element) => {
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
          case "Only_EARRING":
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
          case "Only_Neckwear_or_Pendant":
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
          case "Only_Finger_Ring":
            return {
              ...old,
              [name]: value,
            };
        }
      });
    };
    const onInternalSelectChange = (selectedList, selectedItem) => {
      console.log("lableValue1234==>", selectedItem.lableValue);
      enableRows(selectedItem.lableValue, true);
      // setSelectedValue(selectedItem.lableValue);
    };
    const onInternalRemoveChange = (selectedList, removedItem) => {
      console.log("removedItem.lableValue==>", removedItem.lableValue);
      enableRows(removedItem.lableValue, false);
    };

    //FINGER SIZE
    const selectFingerSize = (selectedList, selectedItem) => {
      console.log("selectFingerSize==>", selectedItem.lableValue);
      enableRows(selectedItem.lableValue, true);
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
      console.log("tegQuantityResHandler==>", getData);
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
      <>
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
            <table style={{ width: "100%", padding: 1, margin: 0 }}>
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
                      className={classes.inputField}
                      placeholder={row.lableValue}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
        ) : null}
        <table style={{ width: "100%", padding: 1, margin: 0 }}>
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
                <Grid item xs={12} sm={12}>
                  <DropDownMaterialUI
                    labelName="Type Set-2"
                    onChangeHandler={typeSet2ResHandler}
                    optionsList={setType2option}
                  />
                </Grid>
              </tr>
            ))}
          </tbody>
        </table>
        {childNodeV ? (
          <table style={{ width: "100%", padding: 1, margin: 0 }}>
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
                  <Grid item xs={12} sm={12} className="my-1">
                    <MultiselectUomAndSize
                      labelName="Size/UOM/Quantity"
                      optionsList={ChildNodeV}
                      sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                      CategoryData={feedShowState}
                    />
                  </Grid>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}

        {childNodeF ? (
          <table style={{ width: "100%", padding: 1, margin: 0 }}>
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
                  <Grid item xs={12} sm={12} className="my-1">
                    <Multiselect
                      options={ChildNodeFOptions}
                      displayValue="lableValue"
                      onSelect={selectFingerSize}
                      onRemove={onInternalRemoveChange}
                      showCheckbox={true}
                      closeOnSelect={true}
                      placeholder="Choose Size"
                      disablePreSelectedValues={true}
                    />
                    <table style={{ width: "100%", margin: 5 }}>
                      <tbody className="d-flex">
                        {ChildNodeFOptions.map((row, index) => (
                          <tr
                            key={index}
                            onChange={rowHandlerChange}
                            id={row.lableValue}
                            className={
                              enableRow(row.lableValue)
                                ? classes.show
                                : classes.hide
                            }
                          >
                            <b style={{ fontSize: "12px" }}>Quantity</b>
                            <input
                              type="text"
                              maxlength="1"
                              id={`${row.lableValue}sq`}
                              name={`${row.lableValue}sq`}
                              className={classes.inputField}
                              placeholder={row.lableValue}
                            />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
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
        {tegQuantity ? (
          <Grid item xs={12}>
            <MultiSelectAndInput
              labelName="Tags/Quantity"
              optionsList={tegOfItemOption}
              onChangeHandler={tegQuantityResHandler}
              CategoryData={feedShowState}
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
      </>
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
        {feedShowState.category === "T Category" ? (
          <Grid sx={12} sm={12} className="w-100">
            <MultiselectUomAndSize
              optionsList={option}
              sizeUomQuantityResHandler={sizeUomQuantityResHandler}
              CategoryData={feedShowState}
              onChangeHandler={quantityResHandler}
              allDataFromValidation={allDataFromValidation}
              tegQuantityRes={tegQuantityResHandler}
              findingsResHandler={findingsResHandler}
            />
          </Grid>
        ) : (
          ""
        )}

        {digit === "D" ||
        digit === "J" ||
        digit === "H" ||
        digit === "S" ||
        digit === "O" ||
        digit === "X" ||
        digit === "G" ||
        digit === "W" ||
        digit === "K" ? (
          <Grid item xs={12} sm={12} className="my-3">
            <InputFieldMaterialUI
              onChangeHandler={quantityResHandler}
              allDataFromValidation={allDataFromValidation}
            />
            {feedShowState.findings ? (
              <Grid item xs={12} sm={12}>
                <DropDownMaterialUI
                  labelName="Findings"
                  onChangeHandler={findingsResHandler}
                  optionsList={findingsOptions}
                  // valueData=""
                />
              </Grid>
            ) : (
              ""
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
              // valueData=""
            />
          </Grid>
        ) : null}
        {feedShowState.category === "T Category" ? (
          <table class="table table-bordered ml-0">
            <thead>
              <tr>
                <th scope="col">CATEGORY</th>
                <th scope="col">StdWt</th>
                <th scope="col">UCP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MANGALSUTRA</td>
                <td>{feedShowState.stdWtN}</td>
                <td>{feedShowState.stdUcpN}</td>
              </tr>
              <tr>
                <td>EARRING</td>
                <td>{feedShowState.stdWtE}</td>
                <td>{feedShowState.stdUcpE}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          ""
        )}
      </>
    );
  }
}
