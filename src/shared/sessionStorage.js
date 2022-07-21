export const LoginCheck = () => {
  const token = sessionStorage.getItem("Authorization");
  console.log(token);
  return token ? true : false;
};
