import db from '$db/mongo';

export async function load({ params }) {
	const id = params.id;

	try {
		const link = await db.collection('links').findOne({ 'id': id });
		if (!link) return {
			notFound: true
		}

		delete link._id;
		
		return {
			link
		}
	} catch (error) {
		
	}

};