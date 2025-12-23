export const getQueryStringValue = (key: string): string | null => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);

    // Try exact (case-sensitive) match first to preserve current behavior
    const exact = params.get(key);
    if (exact !== null) return exact;

    // Fall back to case-insensitive key lookup
    const lowerKey = key.toLowerCase();
    let found: string | null = null;
    params.forEach((paramValue, paramName) => {
      if (found !== null) return; // already found
      if (paramName.toLowerCase() === lowerKey) {
        found = paramValue;
      }
    });

    return found;
  }
  return null;
};

const pad2 = (val: string | number) =>
  val.toString().length === 1 ? `0${val}` : val.toString();

export const formatDateToDDMMYYYY = (dateStr: string): string => {
  if (!dateStr) return "";

  let day: string, month: string, year: string;

  if (dateStr.indexOf("/") !== -1) {
    // Format: MM/DD/YYYY
    const parts = dateStr.split("/");
    if (parts.length !== 3) return dateStr;
    [month, day, year] = parts;
  } else if (dateStr.indexOf("-") !== -1) {
    // Format: YYYY-MM-DD
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    [year, month, day] = parts;
  } else {
    return dateStr;
  }

  const dateObj = new Date(`${year}-${month}-${day}`);

  if (
    !isNaN(dateObj.getTime()) &&
    dateObj.getDate() === Number(day) &&
    dateObj.getMonth() + 1 === Number(month) &&
    dateObj.getFullYear() === Number(year)
  ) {
    return `${pad2(day)}/${pad2(month)}/${year}`;
  }

  return dateStr;
};
