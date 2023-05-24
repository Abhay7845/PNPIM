import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/MuliSelectDropdownField.css";
import { Multiselect } from "multiselect-react-dropdown";

const MuliSelectDropdownField = (props) => {
  const multiselectRef = useRef();

  const resetSelectField = () => {
    multiselectRef.current.resetSelectedValues();
  };

  const NoReasonOption = [
    "Not Relevant To Market",
    "Price is High",
    "Similar design exists",
    "Wearibility Issue",
    "Design Not Applicable",
  ];

  const data = NoReasonOption.map((element, index) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const onInternalSelectChange = (selectedList, selectedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelect(selectedData);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelect(selectedData);
  };

  return (
    <>
      <label>Choose Reasons for No</label>
      <div className="drop_multi">
        <Multiselect
          options={data}
          displayValue="lableValue"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          closeOnSelect={true}
          selectionLimit={3}
          placeholder="Choose Reasons for No"
          className="searchbox"
        />
      </div>
    </>
  );
};
export const MuliSelectDropdownFieldQualityFeedback = (props) => {
  const multiselectRef = useRef();

  const resetSelectField = () => {
    multiselectRef.current.resetSelectedValues();
  };

  const ratingReason = [
    "Antique Finish",
    "Enamel Finish",
    "Surface & Intricate Finish",
    "Wearability",
    "Sharp Edges",
    "Strength",
    "Findings/Lock Function",
    "Stone visibility",
    "Stone Setting issues",
  ];

  const dataQlty = ratingReason.map((element, index) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const onInternalSelectChange = (selectedList, selectedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelectQlty(selectedData);
  };
  const onInternalRemoveChange = (selectedList, removedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelectQlty(selectedData);
  };

  return (
    <>
      <div>
        <label>Choose Reasons</label>
        <div className="drop_multi">
          <Multiselect
            options={dataQlty}
            displayValue="lableValue"
            onSelect={onInternalSelectChange}
            onRemove={onInternalRemoveChange}
            showCheckbox={true}
            // selectedValues={[]}
            closeOnSelect={true}
            selectionLimit={3}
            placeholder="Reason for Low Quality Rating"
            className="searchbox"
            //hidePlaceholder={true}
          />
        </div>
      </div>
    </>
  );
};
export default MuliSelectDropdownField;
