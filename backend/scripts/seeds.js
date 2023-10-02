//TODO: seeds script should come here, so we'll be able to put some data in our local env
// seeds.js 

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

async function seedDatabase() {

    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db('anythink');

        // Generate 100 users
        const users = [];

        for (let i = 0; i < 100; i++) {
            users.push({
                name: `User ${i + 1}`,
                email: `user${i + 1}@example.com`
            });
        }

        await db.collection('users').insertMany(users);

        // Generate 100 products
        const products = [];

        for (let i = 0; i < 100; i++) {
            products.push({
                name: `Product ${i + 1}`,
                description: 'Lorem ipsum dolor sit amet'
            });
        }

        await db.collection('products').insertMany(products);

        // Generate 100 comments
        const comments = [];

        for (let i = 0; i < 100; i++) {
            comments.push({
                content: 'Lorem ipsum dolor sit amet',
                user_id: Math.ceil(Math.random() * 100),
                product_id: Math.ceil(Math.random() * 100)
            });
        }

        await db.collection('comments').insertMany(comments);

    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }

}

seedDatabase();