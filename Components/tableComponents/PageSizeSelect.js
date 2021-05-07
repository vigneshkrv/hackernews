import React from "react";
import Select, { components } from "react-select";

export default class PagesizeSelect extends React.Component {
  static defaultProps = {
    pageSizes: [
      { value: 10, label: "10" },
      { value: 25, label: "25" },
      { value: 50, label: "50" },
      { value: 100, label: "100" },
    ],
  };
  render() {
    const { pageSize, pageSizes, onSelect } = this.props;
    const DropdownIndicator = (props) => (
      <components.DropdownIndicator {...props}>
        <div
          style={{
            margin: "auto",
          }}
        >
          <span style={{ color: "#d6d6d6" }}>▾</span>
        </div>
      </components.DropdownIndicator>
    );
    return (
      <Select
        placeholder={pageSize}
        name="pageSize"
        className="select-pageSize"
        components={{ DropdownIndicator }}
        id="valShow"
        menuPlacement="auto"
        onChange={onSelect}
        options={pageSizes}
        value={pageSize}
      />
    );
  }
}
