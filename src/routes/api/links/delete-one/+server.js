import db from '$db/mongo';

export async function POST({ request }) {
  const { username, id } = await request.json();

  try {
    await db.collection('users').updateOne(
      { 'username': username },
      { $pull: { 'savedLogins': { 'id': id } } }
    );
    
    return new Response(JSON.stringify({ status: 202, message: 'Successfully deleted note' }));
  } catch (err) {
    return new Response(JSON.stringify({ 
      status: 500,
      message: err.message
    }));
  }

}