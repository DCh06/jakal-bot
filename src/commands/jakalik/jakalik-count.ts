import { SlashCommandBuilder, CommandInteraction, User } from "discord.js";
import prisma from "../../db";
import { client } from "../../implementation/client";
// import prisma from '../../lib/prisma' 

export const command = {
    data: new SlashCommandBuilder()
        .setName("jakaliky")
        .setDescription("Dozvíš se kolik máš jakalíků! \n Jakalíky slouží k trackovaní tvého agilního scóre."),
    async execute(interaction: CommandInteraction) {
        interaction.user.id
        console.log(interaction.user.id)
        let user = await prisma.user.findFirst({
            where: {
                discordId: {
                    equals: interaction.user.id
                }
            }
        });
        console.log(user);

        if (!user) {
            console.log("creating user");
            user = await createUserIfNotExist(interaction)
        }

        console.log(user?.jakalikBalance);

        const jakalEmoji = client.emojis.cache.find(emoji => emoji.name === 'jakal2')
        await interaction.reply({content:`Máš ${user?.jakalikBalance} jakaliků ${jakalEmoji}`});
    },
};

const createUserIfNotExist =  async (interaction: CommandInteraction) => {
    return await prisma.user.create({
        data: {
            discordId: interaction.user.id,
            name: interaction.user.username, 
            jakalikBalance: 0,
        }
    })
}