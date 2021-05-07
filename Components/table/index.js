import React, { Component } from "react";
import { ColHeader, Tablepagination, PagesizeSelect } from "../tableComponents";
import { sortArray, searchArray } from "../tableComponents/helpers";
import "../../styles/component.module.css";
import Spinner from "react-bootstrap/Spinner";
import Selector from "../Selector";

const tableHeaders = [
  { colRef: "title", colLabel: "Title" },
  { colRef: "by", colLabel: "Author" },
  { colRef: "url", colLabel: "URL" },
  { colRef: "time", colLabel: "Created Time" },
  { colRef: "type", colLabel: "Type" },
];

const options = [
  { label: "Top", value: "topstories" },
  { label: "Ask", value: "askstories" },
  { label: "Show", value: "showstories" },
  { label: "Job", value: "jobstories" },
];

const AlertRow = ({ alert, key, headers }) => {
  return (
    <tr className="bg-table" key={key}>
      {tableHeaders.map((item) => {
        return <td>{alert[item.colRef]}</td>;
      })}
    </tr>
  );
};

export class Table extends Component {
  state = {
    tableData: [],
    isFetching: this.props,
    color: this.props,
    pageNumber: 0,
    pageSize: 10,
    sortBy: {},
  };
  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.setState({ tableData: this.props.tableData });
      this.setState({ isFetching: this.props.isFetching });
    }
  }
  constructor(props) {
    super(props);
    this.state.tableData = props.tableData;
    this.state.isFetching = props.isFetching;
  }

  onPageChange = (page) => {
    const { selected } = page;
    if (selected !== "NaN") {
      this.setState({
        pageNumber: selected,
      });
    }
  };

  onSelect = (event) => {
    const value = event.value;
    this.setState({
      pageNumber: 0,
      pageSize: +value,
    });
  };

  onSort = (colName) => {
    const { sortBy } = this.state;
    const colDir = sortBy && sortBy.colDir === "ASC" ? "DESC" : "ASC";
    this.setState({ sortBy: { colName: colName, colDir }, pageNumber: 0 });
  };

  doSearch = (e) => {
    e.preventDefault();
    this.setState({ pageNumber: 1 });
    return false;
  };
  render() {
    const { tableData, pageNumber, pageSize, sortBy, isFetching } = this.state;
    const Result = searchArray(tableData, this.state.searchValue) || [];
    const total = Result.length;
    const startItem = pageNumber * pageSize + 1;
    const alertData = sortArray(Result, sortBy.colName, sortBy.colDir).slice(
      startItem - 1,
      startItem + pageSize - 1
    );
    return (
      <div className="col-lg-12">
        <div className="card mr-2">
          <p
            className="txt-management border-bottom text-white"
            style={{ backgroundColor: this.props.color }}
          >
            <strong>{this.props.tableName || "Table Data"}</strong>
          </p>

          <div className="col-12 grid-margin mb-3 p-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-between box-select mr-0 mr-sm-3">
                <p className="box-select-name mb-0 text-muted">Show</p>
                <PagesizeSelect
                  pageSize={this.state.pageSize}
                  onSelect={this.onSelect}
                />
              </div>
              <div className="d-flex row">
                <div className="col-4">
                  <Selector
                    options={options}
                    type={this.props.type}
                    onChangeOption={this.props.onChangeOption}
                  />
                </div>
                <div className="col-8">
                  <form onSubmit={this.doSearch}>
                    <div className="form-group d-flex search-field mb-0 form-report">
                      <input
                        type="text"
                        className="form-control searchBar"
                        placeholder="Search title, user ..."
                        onChange={(e) =>
                          this.setState({ searchValue: e.target.value })
                        }
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="card col-md-12">
            <div className="card-body  grid-margin stretch-card">
              {isFetching && (
                <div className="text-center m-auto">
                  <Spinner
                    animation="grow"
                    style={{ color: this.props.color }}
                  />{" "}
                </div>
              )}
              {!isFetching && (
                <div className="table-sorter-wrapper table-responsive">
                  <table id="sortable-table-2" className="table">
                    <thead>
                      <tr>
                        {tableHeaders.map((item) => (
                          <ColHeader
                            onSort={this.onSort}
                            colRef={item.colRef}
                            colLabel={item.colLabel}
                            sortBy={this.state.sortBy}
                            key={item.colRef}
                          />
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {alertData.map((alert, index) => (
                        <AlertRow alert={alert} key={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <Tablepagination
                onPageChange={this.onPageChange}
                pageNumber={pageNumber}
                pageSize={pageSize}
                total={isFetching ? 0 : total}
                color={this.props.color}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Table;
