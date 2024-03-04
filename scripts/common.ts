export const validateDate = (date: string) => {
  // ensure that the date format YYYY/MM/DD - else throw
  const [
    year,
    month,
    day,
  ] = date.split("/")

  // validate
  if (
    year.length !== 4 ||
    month.length !== 2 ||
    day.length !== 2 ||
    isNaN(Number(year)) ||
    isNaN(Number(month)) ||
    isNaN(Number(day))
  ) {
    throw new Error("Invalid date format")
  }
}
