import { SlashCommandBuilder, CommandInteraction, User } from "discord.js";
import prisma from "../../db";
import { client } from "../../implementation/client";
import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import { getDateSpanMilis } from "../../utils/random-generators";
import { pripominumStandupJobGroCronuNehe } from "../../recurring-jobs/pripominam-standup-job";
import { PripominamStandup } from "@prisma/client";

dayjs.extend(utc.default)


// import prisma from '../../lib/prisma' 

export const command = {
    data: new SlashCommandBuilder()
        .setName("stand-up")
        .setDescription("Pripomenuti standupu v urcitou hodinu")
        .addStringOption(option =>
            option.setName("cas")
                .setDescription("Cas YYYY-MM-DDTHH:MM (priklad 2023-11-18T11:45)")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("popis")
                .setDescription("Popis syncu")
        ),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        console.log("casik", interaction.user.id)
        // const date
        const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
        if (!(regex).test(interaction.options.get('cas')?.value as unknown as string)) {
            console.error("[Error] V pici casy");
            console.log(interaction.options.get('cas'));
            return;
        }
        const dateString = (interaction.options.get('cas')?.value) as unknown as string;
        const dateOfStandup = new Date(dateString);
        const utcTimeOfStandup = dayjs.utc(dateOfStandup).format();

        const discordId = interaction.user.id;
        const description = interaction.options.get('popis') as unknown as string;
        const channelId = interaction.channelId;

        // if less than 30 dont save to db
        if( getDateSpanMilis(new Date(), dateOfStandup) < 30 * 60 * 1000) {
            // TODO maybe this will fuckup 
            let hackyPickData: Pick<PripominamStandup, 'time' | 'channelId'> = {time: dateOfStandup, channelId};
            pripominumStandupJobGroCronuNehe([hackyPickData]);
            interaction.editReply({content: "Dej si! "});
            return;
        }

        try {
            let pripominamStandup = await prisma.pripominamStandup.create({
                data: {
                    discordId,
                    time: utcTimeOfStandup,
                    description,
                    channelId,
                }
            });

            interaction.editReply({content: "Dej si! "})
        } catch ( e ) {
           
            console.log(e)
        }
        // todo create user if not exist
    },
};
