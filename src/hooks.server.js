import { start_mongo } from "$db/mongo"
// import db from '$db/mongo';

start_mongo()
  .then(() => {
    console.log('Mongo started!')
  })

// export const handle = async ({ event, resolve }) => {
//   // get cookies from browser
//   const token = event.cookies.get('token');
//   const loggedIn = event.cookies.get('loggedIn');
  
//   if (token) {
//     const salon = await db.collection('credentials').findOne({ 'id': token })
//     if (salon) {
//       event.locals.token = salon?.salonId;
//     }
//   }

//   if (loggedIn) {
//     event.locals.loggedIn = loggedIn;
//   }
  
//   return await resolve(event);
// }