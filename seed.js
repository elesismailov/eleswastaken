
const initializeMongo = require('./mongoConfig');

const Post = require('./models/post');

const { faker } = require('@faker-js/faker');

initializeMongo();

for (let i = 0; i < 4; i++) {
	const post = new Post({
		title: faker.lorem.sentence(),
		body: faker.lorem.paragraphs(),
		date: faker.date.past(),
	});

	post.save( err => {
		if (err) {
			console.log(err)
			return
		}
		console.log('Saved post #' + i);
	});
}
