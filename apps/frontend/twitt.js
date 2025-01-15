// const url = 'https://api.twitter.com/2/oauth2/token';

// const params = new URLSearchParams();
// params.append('grant_type', 'authorization_code');
// params.append('code', 'VmRyMnpCUEM4ZXBUOUVZR3NNSVljSFJuaTVqbVhWTmZtdndqeWI0bWxScUNaOjE3MzY4NzgxMTAwNTg6MTowOmFjOjE'); // Replace with actual authorization code
// params.append('client_id', 'M0xYRDBuZE9oeTlJUFEtMXJDNWg6MTpjaQ'); // Replace with your client ID
// params.append('redirect_uri', 'http://localhost:3000/api/auth/twitter/redirect'); // Replace with your callback URL
// params.append('code_verifier', 'challenge'); // Replace with your code verifier

// fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   body: params.toString(),
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Response:', data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// async function exchangeCodeForToken(authCode) {
//     const client_id = 'M0xYRDBuZE9oeTlJUFEtMXJDNWg6MTpjaQ'; // Your Twitter app's client ID
//     const client_secret = 'xCtKF3tYFlJgaA1RqHeliESlotkfVu1q8CjQ7G7yNnsx3nlWBf'; // Your Twitter app's client secret
//     const redirect_uri = 'http://localhost:3000/api/auth/twitter/redirect'; // The callback URL you used during the authorization step

//     // Base64 encode the client ID and client secret
//     const credentials = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

//     const data = new URLSearchParams();
//     data.append('grant_type', 'authorization_code');
//     data.append('code', authCode);
//     data.append('redirect_uri', redirect_uri);
//     data.append('code_verifier', 'challenge'); // The code_verifier you used during authorization

//     try {
//         const response = await axios.post('https://api.twitter.com/2/oauth2/token', data.toString(), {
//             headers: {
//                 'Authorization': `Basic ${credentials}`,
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });

//         console.log('Access Token Response:', response.data);
//     } catch (error) {
//         console.error('Error exchanging code for token:', error.response.data);
//     }
// }


const url = 'https://api.twitter.com/2/oauth2/token';

const params = new URLSearchParams();
params.append('grant_type', 'authorization_code');
params.append('code', 'VmRyMnpCUEM4ZXBUOUVZR3NNSVljSFJuaTVqbVhWTmZtdndqeWI0bWxScUNaOjE3MzY4NzgxMTAwNTg6MTowOmFjOjE'); // Replace with actual authorization code
params.append('client_id', 'M0xYRDBuZE9oeTlJUFEtMXJDNWg6MTpjaQ'); // Replace with your client ID
params.append('redirect_uri', 'http://localhost:3000/api/auth/twitter/redirect'); // Replace with your callback URL
params.append('code_verifier', 'challenge'); // Replace with your code verifier

const client_id = 'M0xYRDBuZE9oeTlJUFEtMXJDNWg6MTpjaQ'; // Replace with your actual client ID
const client_secret = 'xCtKF3tYFlJgaA1RqHeliESlotkfVu1q8CjQ7G7yNnsx3nlWBf'; // Replace with your actual client secret
const basicAuth = btoa(`${client_id}:${client_secret}`);

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${basicAuth}`,
  },
  body: params.toString(),
})
  .then(response => response.json())
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


