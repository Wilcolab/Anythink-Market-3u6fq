//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require('mongoose')

require('../models/User')
require('../models/Item')
require('../models/Comment')

var User = mongoose.model('User')
var Item = mongoose.model('Item')
var Comment = mongoose.model('Comment')

// This helps to connect mongodb.
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    console.warn('Missing MONGODB_URI in the env.')
}

let user_id

let item_id

async function seedDatabase() {

    // For users
    const users = Array.from(Array(100)).map((_item, i) => ({
        username: `testUser${i}`,
        email: `testUser${i}@gmail.com`,
        bio: `test bio`,
        image: `https://images.unsplash.com/photo-1685032975515-6bd5815df416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1785&q=80`,
        role: 'user',
        favorites: [],
        following: [],
    }))

    for (let user of users) {
        const u = new User(user)


        const dbItem = await u.save()

        if (!user_id) {
            user_id = dbItem._id
        }
    }


    // For Items.
    const items = Array.from(Array(100)).map((_item, i) => ({
        slug: `testItems${i}`,
        title: `test title ${i}`,
        description: `test Description`,
        image: `https://images.unsplash.com/photo-1695576514502-cbc0a333f2d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80`,
        comments: [],
        tagList: ['test', 'tag'],
        seller: user_id
    }))

    for (item of items) {
        const it = new Item(item)

        const dbItem = await it.save()

        if (!item_id) {
            item_id = dbItem._id
        }
    }


    // For comments.
    const comments = Array.from(Array(100)).map((_item, i) => ({
        body: 'This is test coments.',
        seller: user_id,
        item: item_id

    }))

    for (comment of comments) {
        const c = new Comment(comment);

        await c.save()
    }

}


seedDatabase().then(() => {
    process.exit()
}).catch((err) => {
    console.error()

    process.exit()
})