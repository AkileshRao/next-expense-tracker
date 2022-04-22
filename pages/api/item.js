import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    const { method } = req;

    if (method == "POST") {
        const { body } = req;
        try {
            await prisma.item.create({
                data: {
                    amount: body.amount,
                    date: body.date,
                    description: body.description || "",
                    mode: body.mode
                }
            });
            return res.status(200).json({
                status: "Success",
                message: "Item has been added successfully!"
            });
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                status: "Error",
                message: e
            })
        }
    }
}