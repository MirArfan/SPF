import { ChevronDown, ChevronUp } from "lucide-react";

const SPFRecord = ({
  record,
  index,
  expandedIncludes,
  toggleInclude,
}) => {
  return (
    <div className="record">
      <h3>SPF Record</h3>

      <div className="raw-record">{record.raw}</div>

      <div>
        {record.parsed.mechanisms.map((mech) => {
          if (mech.startsWith("include:")) {
            const domain = mech.substring(8);
            const key = `${domain}-${index}`;

            return (
              <div key={mech}>
                <span
                  className="mechanism include"
                  onClick={() =>
                    toggleInclude(domain, index)
                  }
                >
                  include:{domain}
                  {expandedIncludes[key] ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </span>

                {expandedIncludes[key] && (
                  <div className="include-expanded">
                    {expandedIncludes[key]}
                  </div>
                )}
              </div>
            );
          }

          if (mech.startsWith("redirect=")) {
            return (
              <span
                key={mech}
                className="mechanism redirect"
              >
                {mech}
              </span>
            );
          }

          return (
            <span key={mech} className="mechanism">
              {mech}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SPFRecord;
