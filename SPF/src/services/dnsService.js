import axios from "axios";

export const fetchSPFRecords = async (domain) => {
    try {
        const res = await axios.get(
            `https://dns.google/resolve`,
            {
                params: {
                    name: domain,
                    type: "TXT",
                },
                timeout: 5000, // optional: 5 seconds timeout
            }
        );

        const data = res.data;

        if (!data.Answer) return null;

        const spf = data.Answer
            .map((r) => r.data.replace(/"/g, ""))
            .filter((txt) => txt.startsWith("v=spf1"));

        return spf.length ? spf : null;
    } catch (error) {
        console.error("DNS lookup failed:", error.message);
        throw new Error("Failed to fetch SPF records");
    }
};
