import { JWT } from 'google-auth-library';

const firebaseEmail = process.env.CLIENT_EMAIL;
const firebasePrivateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

export const dynamic = 'force-dynamic';

export async function GET() {
  const tokens = await new Promise(function (resolve, reject) {
    const jwtClient = new JWT({
      email: firebaseEmail,
      key: firebasePrivateKey,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });

  if (tokens) {
    return Response.json(
      {
        status: 'success',
        accessToken: tokens,
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      {
        status: 'error',
        message: 'Something went wrong! Please contact Admin',
      },
      { status: 500 }
    );
  }
}
