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

export const actions = {
  default: async ({ request }) => {
    const { title, website, username, password, passwordHint, comments } = await request.json();
    
    // console.table({
    //   title, website, username, password, passwordHint, comments
    // });
    
    try {
      db.collection('links').insertOne({
        id: shortid.generate(),
        title,
        website,
        username,
        password,
        passwordHint,
        comments
      })
      
      const response = { 
        message: 'Form data saved successfully' ,
        status: 201
      };
      return response;
    } catch (error) {
      const response = new Response(JSON.stringify({ 
        error: 'Failed to save form data' ,
        status: 500,
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      return response;
    }
  }
};
