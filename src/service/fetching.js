const usersApiUrl = "https://obshab.firebaseio.com/"

export const getUserHabbits = userId =>
  fetch(usersApiUrl + `/users/${userId}/habbits.json`)
    .then(response => response.json())
    .then(userHabbits => Object.entries(userHabbits || {}).map(([id,value]) => ({
        id,
        ...value
    })))

export const addHabbit = (name, userId, id,side) =>
  fetch(usersApiUrl + `users/${userId}/habbits/.json`, {
    method: "POST",
    body: JSON.stringify({
      name,
      side
      
    }),
    
  })

export const deleteHabbit = (userId, habbitId) =>
  fetch(usersApiUrl + `users/${userId}/habbits/${habbitId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
