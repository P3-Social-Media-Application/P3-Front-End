export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://ec2-52-55-151-95.compute-1.amazonaws.com:8081",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "http://localhost:4200",
  },
};
