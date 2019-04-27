const usersApiUrl = "https://obshab.firebaseio.com/";

export const getUserHabbits = (userId) =>{
  fetch(usersApiUrl + `/users/${userId}/habbits.json`)
    .then(response => response.json())
    .then(userHabbits =>
      Object.entries(userHabbits).map(x => x)
    );

}