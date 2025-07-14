import { Webhook } from 'svix';
import User from '../models/User.js';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export const handleClerkWebhook = async (req, res) => {
    if (!webhookSecret) {
        console.error('Missing CLERK_WEBHOOK_SECRET environment variable');
        return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    // Get the headers
    const headers = req.headers;
    const payload = JSON.stringify(req.body);

    // Get the svix headers for verification
    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({ error: 'Missing svix headers' });
    }

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(webhookSecret);

    let evt;

    // Verify the webhook
    try {
        evt = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return res.status(400).json({ error: 'Error verifying webhook' });
    }

    // Handle the webhook
    const { type, data } = evt;
    console.log(`Received webhook: ${type}`);

    try {
        switch (type) {
            case 'user.created':
                await handleUserCreated(data);
                break;
            case 'user.updated':
                await handleUserUpdated(data);
                break;
            case 'user.deleted':
                await handleUserDeleted(data);
                break;
            default:
                console.log(`Unhandled webhook type: ${type}`);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const handleUserCreated = async (data) => {
    console.log('Creating user:', data.id);

    const user = new User({
        clerkId: data.id,
        email: data.email_addresses[0]?.email_address || '',
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        username: data.username || null,
        avatar: data.image_url || '',
        isActive: true,
        lastLogin: new Date()
    });

    await user.save();
    console.log('User created successfully:', user._id);
};

const handleUserUpdated = async (data) => {
    console.log('Updating user:', data.id);

    const updateData = {
        email: data.email_addresses[0]?.email_address || '',
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        username: data.username || null,
        avatar: data.image_url || '',
        lastLogin: new Date()
    };

    const user = await User.findOneAndUpdate(
        { clerkId: data.id },
        updateData,
        { new: true }
    );

    if (user) {
        console.log('User updated successfully:', user._id);
    } else {
        console.log('User not found for update:', data.id);
    }
};

const handleUserDeleted = async (data) => {
    console.log('Deleting user:', data.id);

    const user = await User.findOneAndUpdate(
        { clerkId: data.id },
        { isActive: false },
        { new: true }
    );

    if (user) {
        console.log('User marked as inactive:', user._id);
    } else {
        console.log('User not found for deletion:', data.id);
    }
};
