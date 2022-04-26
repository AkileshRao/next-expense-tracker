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

    if (method == "GET") {
        const itemList = await prisma.item.findMany({
            orderBy: [{
                date: 'desc'
            }],
            select: {
                date: true
            },
            distinct: ['date'],
            where: {
                date: {
                    gt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                }
            }
        })

        let items = await Promise.all(itemList.map(item => prisma.item.findMany({
            select: {
                description: true,
                amount: true,
                id: true,
                date: true,
                mode: true
            },
            where: {
                date: item.date
            }
        })))


        let expensesSum = await prisma.item.groupBy({
            by: ['mode'],
            _sum: {
                amount: true
            }
        })

        return {
            props: {
                items: JSON.parse(JSON.stringify(items)),
                total: {
                    income: expensesSum[0]._sum.amount,
                    expense: expensesSum[1]._sum.amount
                }
            }
        }

    }
}