fetch("https://api.surveymonkey.com/v3/collectors/9P62Z5Y/responses", {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Authorization": "Bearer {access-token}"
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
  