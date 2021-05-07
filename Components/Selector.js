import Select from "react-select";

export default function Selector(props) {
  return (
    <Select
      value={props.type}
      options={props.options}
      onChange={props.onChangeOption}
    />
  );
}
