import Profile from "instagram-public-api";
const user = new Profile("selenagomez");
user.getData().then((data: any) => {
  console.log(data);
});
