import { GoogleAuth,OAuth2Client } from "google-auth-library";

//Verifica el Token con el server de google 
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//googleVerify es una promesa 
export async function googleVerify(token='') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
  });
  //const payload = ticket.getPayload();     //Trae toda la info del usuario

  const {name,picture,email}=ticket.getPayload()
  return {name,picture,email}
  
}
