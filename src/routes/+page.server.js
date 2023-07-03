import db from '$db/mongo'
import shortid from 'shortid';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const username = locals.username;
  const loggedIn = locals.loggedIn;

  const user = await db.collection('users')
    .findOne({ 'username': username })
    
  if (!username || !loggedIn || !user) {
    throw redirect(302, '/login');
  }

  return {
    notes: user.savedLogins
  };
}
