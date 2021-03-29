const response = (title, description, date, country, city) => {
  const result = {};
  result["title"] = title;
  result["description"] = description;
  result["eventdate"] = date;
  result["country"] = country;
  result["city"] = city;
  return result;
};

export default response;
