export function getUserid(){
  const userString = localStorage.getItem("user");
  let userid: number = -1;
  if (userString) {
    const user = JSON.parse(userString);
    userid = user.id;
  }else{
    throw new Error("User not found");
  }
  return userid;
}