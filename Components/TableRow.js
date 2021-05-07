import moment from "moment";
import parse from "html-react-parser";
import { openNewTab } from "./OpenTab";
import Link from "next/link";

const TableRow = ({ alert, key, headers }) => {
  return (
    <tr className="bg-table" key={key}>
      {headers.map((item) => {
        if (item.colRef === "time") {
          return (
            <td>{moment.unix(alert[item.colRef]).format("MMMM Do YYYY")}</td>
          );
        }
        if (item.colRef === "url") {
          return (
            <td onClick={() => openNewTab(alert[item.colRef])}>
              <a href="#">{alert[item.colRef]}</a>
            </td>
          );
        }
        if (item.colRef === "text") {
          return <td>{parse(alert[item.colRef] || " ")}</td>;
        }
        if (item.colRef === "by") {
          return (
            <td>
              <Link
                href={{
                  pathname: "/author",
                  query: { name: alert[item.colRef] },
                }}
              >
                {alert[item.colRef]}
              </Link>
            </td>
          );
        }
        return <td>{alert[item.colRef]}</td>;
      })}
    </tr>
  );
};

export default TableRow;
