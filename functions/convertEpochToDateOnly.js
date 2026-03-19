// converts timestamp to a more readable format eg. Wed March 15 2026

export const convertEpochToDateOnly = (timeInEpochSecondes) => {
  const dateObject = new Date(timeInEpochSecondes);
  const dateOnly = dateObject.toDateString();
  return dateOnly;
};
