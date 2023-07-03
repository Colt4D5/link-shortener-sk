import { redirect } from '@sveltejs/kit';
import db from '$db/mongo'

export const load = async ({ locals }) => {
  const username = locals.username;
  const loggedIn = locals.loggedIn;

  const user = await db.collection('users')
    .findOne({ 'username': username })

  if (!username || !loggedIn || !user) {
    throw redirect(302, '/login');
  }
  
  return {
    user: user.username
  };
}