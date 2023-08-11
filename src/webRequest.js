export const doGet = (url) => fetch(url)
  .then(async (response) => {
    let ansData = {};
    try {
      ansData = await response.json();
    } catch {
      if (response.status === 201) {
        ansData = {
          status: true,
        };
      } else {
        ansData = {
          status: false,
        };
      }
    }
    return ansData;
  });

export const doPost = (url, payload = null) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(async (response) => {
    let ansData = {};
    try {
      ansData = await response.json();
    } catch {
      if (response.status === 201) {
        ansData = {
          status: true,
        };
      } else {
        ansData = {
          status: false,
        };
      }
    }
    return ansData;
  });
