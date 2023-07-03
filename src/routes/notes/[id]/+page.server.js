import { redirect } from '@sveltejs/kit';
import db from '$db/mongo';

export async function load({ params, locals }) {
	const username = locals.username;
  const loggedIn = locals.loggedIn;
	
	if (!username || !loggedIn) {
		throw redirect(302, '/');
	}
	
	const id = params.id;

	try {
		const user = await db.collection('users').findOne({ 'username': username });
		if (!user) return {
			notFound: true
		}
		const link = user.savedLogins.find(savedLogin => savedLogin.id === id);

		return {
			link
		}
	} catch (error) {
		
	}

};