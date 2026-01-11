import { useState } from "react";
import { AlertCircle, Search } from "lucide-react";
import SPFInput from "./SPFInput";
import SPFResult from "./SPFResult";
import { fetchSPFRecords } from "../services/dnsService";
import { validateDomain } from "../utils/validateDomain";
import { parseSpf } from "../utils/parseSpf";
import "../styles/SPFChecker.css";

const SPFChecker = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [expandedIncludes, setExpandedIncludes] =
    useState({});

  const handleCheck = async () => {
    setError("");
    setResult(null);
    setExpandedIncludes({});

    if (!domain.trim())
      return setError("Enter a domain");

    if (!validateDomain(domain))
      return setError("Invalid domain name");

    setLoading(true);
    try {
      const records = await fetchSPFRecords(domain);
      if (!records) {
        setError("No SPF record found");
      } else {
        setResult({
          domain,
          records: records.map((r) => ({
            raw: r,
            parsed: parseSpf(r),
          })),
        });
      }
    } catch {
      setError("DNS lookup failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleInclude = async (include, index) => {
    const key = `${include}-${index}`;

    if (expandedIncludes[key]) {
      setExpandedIncludes((p) => ({
        ...p,
        [key]: null,
      }));
      return;
    }

    const spf = await fetchSPFRecords(include);
    setExpandedIncludes((p) => ({
      ...p,
      [key]: spf ? spf[0] : "No SPF record",
    }));
  };

  return (
    <div className="page">
      <div className="wrapper">
        <div className="card">
          <h1 className="header">SPF Checker</h1>

          <SPFInput
            domain={domain}
            setDomain={setDomain}
            onCheck={handleCheck}
            loading={loading}
          />

          {error && (
            <div className="error-box">
              <AlertCircle />
              {error}
            </div>
          )}

          {result && (
            <SPFResult
              result={result}
              expandedIncludes={expandedIncludes}
              toggleInclude={toggleInclude}
            />
          )}

          {!loading && !result && !error && (
            <div className="empty">
              <Search size={40} />
              <p>Enter a domain to check SPF</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SPFChecker;
