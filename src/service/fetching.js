const usersApiUrl = "https://obshab.firebaseio.com/"

export const getUserHabbits = userId =>
  fetch(usersApiUrl + `/users/${userId}/habbits.json`)
    .then(response => response.json())
    .then(userHabbits => Object.entries(userHabbits || {}).map(([id,value]) => ({
        id,
        ...value
    })))

export const addHabbit = (name, userId, id,isPositive) =>
  fetch(usersApiUrl + `users/${userId}/habbits/.json`, {
    method: "POST",
    body: JSON.stringify({
      name,
      isPositive
      
    }),
    
  })

export const deleteHabbit = (userId, habbitId) =>
  fetch(usersApiUrl + `users/${userId}/habbits/${habbitId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
