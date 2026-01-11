import { CheckCircle } from "lucide-react";
import SPFRecord from "./SPFRecord";

const SPFResult = ({
  result,
  expandedIncludes,
  toggleInclude,
}) => {
  return (
    <>
      <div className="success-box">
        <CheckCircle />
        <div>
          SPF record found for{" "}
          <strong>{result.domain}</strong>
        </div>
      </div>

      {result.records.map((rec, idx) => (
        <SPFRecord
          key={idx}
          record={rec}
          index={idx}
          expandedIncludes={expandedIncludes}
          toggleInclude={toggleInclude}
        />
      ))}
    </>
  );
};

export default SPFResult;
