import db from '$db/mongo';

export async function POST({ request }) {
  const { user, id, field, fieldValue } = await request.json();

  try {
    const queryField = `savedLogins.${field}`;
    const userCol = db.collection('users');
    const query = { "username": user, "savedLogins.id": id };
    const updateDocument = {
      $set: { [`savedLogins.$.${field}`]: fieldValue }
    };
    const result = await db.collection('users').updateOne(query, updateDocument);

  } catch (err) {
    return new Response(JSON.stringify({
      message: 'Something went wrong...',
      status: 500
    }));
  }

  return new Response(JSON.stringify({
    fields: {
      user, field, fieldValue
    },
    message: 'Success!',
    status: 204
  }));

}
