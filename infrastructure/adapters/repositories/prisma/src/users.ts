export const getUsers = async (req, res, next, prisma) => {
    const allUsers = await prisma.user.findMany(
        {where: req.body}
    );
    res.status(200).json(allUsers);
};