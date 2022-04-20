// ios formated date
export const formatDate = (date, htmlDate) => {
  const iosFormatedDate = date.split(/[- :]/);
  const formatedDate = new Date(
    iosFormatedDate[0],
    iosFormatedDate[1] - 1, // back returns date in iso format
    iosFormatedDate[2],
    iosFormatedDate[3],
    iosFormatedDate[4],
    iosFormatedDate[5],
  );

  const year = `${new Date(formatedDate).getFullYear()}`;

  const month = `${new Date(formatedDate).getMonth() + 1}`;
  const formatedMonth = month < 10 ? `0${month}` : month;

  const day = `${new Date(formatedDate).getDate()}`;
  const formatedDay = day < 10 ? `0${day}` : day;

  const hour = `${new Date(formatedDate).getHours()}`;
  const formatedHours = hour < 10 ? `0${hour}` : hour;

  const minutes = `${new Date(formatedDate).getMinutes()}`;
  const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  if (htmlDate === true) {
    return `<span class="date">${formatedDay}.${formatedMonth}.${year} </span><span class="time">${formatedHours}:${formatedMinutes}</span>`;
  }

  return `${formatedDay}.${formatedMonth}.${year} ${formatedHours}:${formatedMinutes}`;
};
