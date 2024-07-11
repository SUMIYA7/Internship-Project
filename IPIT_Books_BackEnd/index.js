//require
const express = require('express');
const cors = require('cors');
const { ObjectId, MongoClient, ServerApiVersion } = require('mongodb');
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)
require('dotenv').config();

// port
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())


//mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hnkiytr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {

        // DB Collection
        const userCollection = client.db('IPIT-Books').collection('users');
        const bookCollection = client.db('IPIT-Books').collection('books');
        const messageCollection = client.db('IPIT-Books').collection('message');
        const authorCollection = client.db('IPIT-Books').collection('author');
        const orderCollection = client.db('IPIT-Books').collection('order');


    

        // Other endpoints...

        // Stripe payment endpoint
        app.post('/create-payment-intent', async (req, res) => {
            const { totalPrice } = req.body; // Ensure totalPrice is passed correctly from frontend
            const amount = parseInt(totalPrice * 100); // Convert to cents

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: amount,
                    currency: 'usd',
                    payment_method_types: ['card']
                });

                res.send({
                    clientSecret: paymentIntent.client_secret
                });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });


        app.get('/orders', async (req, res) => {
            let a = {};
            const b = orderCollection.find(a);
            const c = await b.toArray();
            res.send(c);
        });
        app.post('/postOrder', async (req, res) => {
            const a = req.body;
            const b = await orderCollection.insertOne(a);
            res.send(b);
        });


        // Books-------------------------------------------
        app.get('/allAuthors', async (req, res) => {
            let a = {};
            const b = authorCollection.find(a);
            const c = await b.toArray();
            res.send(c);
        });

        app.delete('/deleteAuthor/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            try {
                const result = await authorCollection.deleteOne(query);
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Deleted Successfully' });
                } else {
                    res.status(404).json({ error: "Not Found" })
                }

            } catch (error) {
                console.error(error);
                res.status(500).send('Inter Server Error---------')
            }
        });
        
        app.post('/postAuthor', async (req, res) => {
            const a = req.body;
            const b = await authorCollection.insertOne(a);
            res.send(b);
        });


        // Message-------------------------------------------
        app.get('/message', async (req, res) => {
            let a = {};
            const b = messageCollection.find(a);
            const c = await b.toArray();
            res.send(c);
        });
        
        app.post('/message', async (req, res) => {
            const a = req.body;
            const b = await messageCollection.insertOne(a);
            res.send(b);
        });

        // Read(get)
        app.get('/users', async (req, res) => {
            let query = {};
            const cursor = userCollection.find(query);
            const a = await cursor.toArray();
            res.send(a);
        });
        // Create(post)
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUser = await userCollection.findOne(query);

            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }

            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.get('/email', async (req, res) => {
            let query = {};

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = userCollection.find(query);
            const a = await cursor.toArray();
            res.send(a);
        })

        // Books-------------------------------------------
        app.get('/allBooks', async (req, res) => {
            let a = {};
            const b = bookCollection.find(a);
            const c = await b.toArray();
            res.send(c);
        });
        app.get('/latestThreeBooks', async (req, res) => {
            try {
                // Find the latest three Books
                const latestThreeBooks = await bookCollection.find().sort({ _id: -1 }).limit(3).toArray();

                // Send the latest three Books as a response
                res.send(latestThreeBooks);
            } catch (error) {
                console.error("Error fetching latest three Books:", error);
                res.status(500).send("Internal Server Error");
            }
        });
        app.post('/postBook', async (req, res) => {
            const a = req.body;
            const b = await bookCollection.insertOne(a);
            res.send(b);
        });

        app.get('/allBooks/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const a = await bookCollection.findOne(query);
                if (a) {
                    res.status(200).send(a);
                } else {
                    res.status(404).send('Details not found')
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error-----------' + error.message);
            }
        });

        app.delete('/deleteBooks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            try {
                const result = await bookCollection.deleteOne(query);
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Deleted Successfully' });
                } else {
                    res.status(404).json({ error: "Book not Found" })
                }

            } catch (error) {
                console.error(error);
                res.status(500).send('Inter Server Error---------')
            }
        });


    } finally {

    }

}
run().catch(err => console.error(err));

// running
app.get('/', (req, res) => {
    res.send('IPIT-Book is Running')
})
app.listen(port, () => {
    console.log(`IPIT-Book is  Running in ${port}`);
})

