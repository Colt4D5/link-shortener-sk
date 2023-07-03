import db from '$db/mongo';
import shortid from 'shortid';

export async function POST({ request }) {
  const { user, title, url, username, password, passwordHint, comments } = await request.json();
  
  // console.table({
  //   title, website, username, password, passwordHint, comments
  // });
  
  try {
    const currentUser = await db.collection('users').findOne({ 'username': user });

    console.log(currentUser);

    if (!currentUser) {
      const response = new Response(JSON.stringify({ 
        error: 'User not found' ,
        status: 404,
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('whoopsie!');
      return response;
    }

    db.collection('users').updateOne({ 'username': user }, {
      $push: {
        'savedLogins': {
          id: shortid.generate(),
          title,
          url,
          username,
          password,
          passwordHint,
          comments
        }
      }
    });
    
    const response = { 
      message: 'Form data saved successfully' ,
      status: 201
    };
    console.log('success!');
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const response = new Response(JSON.stringify({ 
      error: 'Failed to save form data' ,
      status: 500,
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('whoopsie!');
    return response;
  }

}
