import { connect } from 'mongoose';


export default async function connectDB(): Promise<void> {
    const dbUri = process.env.MONGODB_URI! || 'URl';
    try {
        await connect(dbUri);
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
}
