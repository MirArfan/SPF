export const parseSpf = (record) => {
  const parts = record.split(" ").filter(Boolean);
  return {
    version: parts[0],
    mechanisms: parts.slice(1),
  };
};
