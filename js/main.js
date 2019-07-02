async function sendRequest(data) {
  const res = await fetch(data.url, {
    method: data.method,
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data.body)
  })
  
  if(res) {
    if(res.ok) {
      return await res.json();
    }
    else {
      const error = await res.text();
      return Promise.reject({ message: error })
    }
  }
  else {
    return Promise.reject();
  }
}