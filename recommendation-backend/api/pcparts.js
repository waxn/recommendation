import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'data', 'laptops.json');
    if (req.method === 'GET') {
        // Return all laptops
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.status(200).json(data);
    } else if (req.method === 'POST') {
        // Add a new laptop (admin only, add auth in real use)
        const newLaptop = req.body;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.push(newLaptop);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(201).json({ message: 'Laptop added' });
    } else {
        res.status(405).end();
    }
}