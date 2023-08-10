export const doGet = (url) => fetch(url)
  .then((response) => {
    try {
      return response.json();
    } catch (e) {
      console.log('post error: ' + e);

      let ansData = {};
      if (response.status === 201) {
        ansData = {
          status: true
        }
      } else {
        ansData = {
          status: false
        }
      }
      return ansData;
    }
  });
  // .then((response) => response.json())
  // .then((json) => json);

export const doPost = (url, payload = null) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => {
    try {
      return response.json();
    } catch (e) {
      console.log('post error: ' + e);
    } finally {
      let ansData = {};
      if (response.status === 201) {
        ansData = {
          status: true
        }
      } else {
        ansData = {
          status: false
        }
      }
      return ansData;
    }
  });
  // .then((response) => response.json())
  // .then((json) => json);