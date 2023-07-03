import db from '$db/mongo';

export async function POST({ request }) {
  const { username, password } = await request.json();
  // console.log(username, password);

  try {
    const user = await db.collection('users').findOne({ 'username': username, 'password': password })
  
    if (!user) {
      return new Response(JSON.stringify({
        status: 404,
        message: 'Username not found'
      }))
    }
  
    return new Response(JSON.stringify({ 
      status: 200,
      message: 'User found!',
      username, 
      password 
    }));
  } catch (err) {
    return new Response(JSON.stringify({ status: 500, message: err }))
  }
}