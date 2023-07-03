import { start_mongo } from "$db/mongo"
import db from '$db/mongo';

start_mongo()
  .then(() => {
    console.log('Mongo started!')
  })

export const handle = async ({ event, resolve }) => {
  // get cookies from browser
  const username = event.cookies.get('Username');
  const loggedIn = event.cookies.get('loggedIn');
  
  if (username) {
    const user = await db.collection('users').findOne({ 'username': username })
    if (user) {
      event.locals.username = user.username;
    }
  }

  if (loggedIn) {
    event.locals.loggedIn = loggedIn;
  }
  
  return await resolve(event);
}