export async function load({ locals }) {
  const loggedIn = locals.loggedIn;

  return { loggedIn }
}