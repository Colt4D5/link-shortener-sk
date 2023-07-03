import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const username = locals.username;
  const loggedIn = locals.loggedIn;

  if (username && loggedIn) {
    throw redirect(302, '/');
  }
}
