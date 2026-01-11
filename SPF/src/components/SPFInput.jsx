import { Search, Loader2 } from "lucide-react";

const SPFInput = ({ domain, setDomain, onCheck, loading }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="example.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        disabled={loading}
      />

      <button onClick={onCheck} disabled={loading}>
        {loading ? (
          <>
            <Loader2 size={18} className="spin" />
            Checking
          </>
        ) : (
          <>
            <Search size={18} />
            Check SPF
          </>
        )}
      </button>
    </div>
  );
};

export default SPFInput;
