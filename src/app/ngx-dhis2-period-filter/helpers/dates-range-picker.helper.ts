export function formatDateToYYMMDD(dateValue) {
  return (
    dateValue.getFullYear() +
    '-' +
    formatMonthOrDate(dateValue.getMonth() + 1, 'm') +
    '-' +
    formatMonthOrDate(dateValue.getDate(), 'd')
  );
}

function formatMonthOrDate(value, type) {
  if (type == 'm' && value.toString().length == 1) {
    return '0' + value;
  } else if (type == 'm') {
    return value + 1;
  } else if (type == 'd' && value.toString().length == 1) {
    return '0' + value;
  } else {
    return value;
  }
}
