import db from '$db/mongo';
import shortid from 'shortid';

export async function POST({ request }) {
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

// async ({ request }) => {
//   const { title, website, username, password, passwordHint, comments } = await request.json();
  
//   // console.table({
//   //   title, website, username, password, passwordHint, comments
//   // });
  
//   try {
//     db.collection('links').insertOne({
//       id: shortid.generate(),
//       title,
//       website,
//       username,
//       password,
//       passwordHint,
//       comments
//     })
    
//     const response = { 
//       message: 'Form data saved successfully' ,
//       status: 201
//     };
//     return response;
//   } catch (error) {
//     const response = new Response(JSON.stringify({ 
//       error: 'Failed to save form data' ,
//       status: 500,
//     }), {
//       headers: { 'Content-Type': 'application/json' }
//     });
//     return response;
//   }
// }