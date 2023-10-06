const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://kallurinaveenkumar:naveensrmap@kalluri1.brq3int.mongodb.net/Naveendb?retryWrites=true&w=majority';
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const foodCollection = mongoose.connection.db.collection('food_items');
    const categoryCollection = mongoose.connection.db.collection('Categories');

    const [foodData, foodCategory] = await Promise.all([
      foodCollection.find({}).toArray(),
      categoryCollection.find({}).toArray(),
    ]);

    return { foodData, foodCategory };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
};

module.exports = connectToMongoDB;
