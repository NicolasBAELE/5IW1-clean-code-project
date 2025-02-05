export const createMoto = async (req, res, next, prisma) => {
    const {model, registrationNumber, mileage, ownerId} = req.body

    const existingMoto = await prisma.moto.findUnique({
        where: {
            registrationNumber: registrationNumber,
        }
    })

    if (existingMoto)
        return res.json({
            message: "Une moto existe avec cet identifiant"
        })

    const moto = await prisma.moto.create({
        data: {
            model: model,
            registrationNumber: registrationNumber,
            mileage: mileage,
            ownerId: ownerId,
        }
    });

    res.json(moto)
}
export const getAllMotos = async (req, res, next, prisma) => {
    try {
        const {motoId} = req.body;
        console.log("📌 Fetching moto(s) with ID:", motoId);

        let motos;

        if (motoId && typeof motoId === "string") {
            motos = await prisma.moto.findUnique({
                where: {id: motoId},
                include: {owner: true},
            });

            if (!motos) {
                return res.status(404).json({message: "Moto non trouvée"});
            }

            console.log(motos)
            return res.status(200).json([motos]);
        } else {
            motos = await prisma.moto.findMany({
                include: {owner: true},
            });
        }
        console.log(motos)

        res.status(200).json(motos);
    } catch (error) {
        console.error("❌ Erreur dans getAllMotos:", error);
        res.status(500).json({message: "Erreur serveur", error: error.message});
    }
};


