export const convertEpochToDateOnly = (timeInEpochSecondes) => {
  const dateObject = new Date(timeInEpochSecondes);
  const dateOnly = dateObject.toDateString();
  return dateOnly;
};
