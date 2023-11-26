import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import prisma from "../../db";
import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import { getDateSpanMilis } from "../../utils/random-generators";
import { PripominamStandup } from "@prisma/client";
import { pripominumStandupJobGroCronuNehe } from "../../helpers/standup/standup.helper";

dayjs.extend(utc.default);
dayjs.extend(timezone.default);

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
        const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
        if (!(regex).test(interaction.options.get('cas')?.value as unknown as string)) {
            console.error("[Error] V pici casy");
            return;
        }
        const dateString = (interaction.options.get('cas')?.value) as unknown as string;
        const utcTimeOfStandup3 = dayjs.tz(dateString, "Europe/Prague").toDate()

        const discordId = interaction.user.id;
        const description = interaction.options.get('popis') as unknown as string;
        const channelId = interaction.channelId;

        // if less than 30 dont save to db
        console.log(new Date(), utcTimeOfStandup3)
        if (getDateSpanMilis(new Date(), utcTimeOfStandup3) < 30 * 60 * 1000) {

            let hackyPickData: Pick<PripominamStandup, 'time' | 'channelId'> = { time: utcTimeOfStandup3, channelId };
            pripominumStandupJobGroCronuNehe([hackyPickData]);
            console.log(dayjs(utcTimeOfStandup3).locale("Europe/Prague").format('DD/MM/YYYY v HH:m'))
            interaction.editReply({ content: `Bando- stand up tedy ${dayjs.tz(utcTimeOfStandup3, "Europe/Prague").format('DD.MM.YYYY v HH:mm')}` });
            return;
        }

        try {
            let pripominamStandup = await prisma.pripominamStandup.create({
                data: {
                    discordId,
                    time: utcTimeOfStandup3,
                    description,
                    channelId,
                }
            });
            interaction.editReply({ content: `Bando- stand up tedy ${dayjs.tz(utcTimeOfStandup3, "Europe/Prague").format('DD.MM.YYYY v HH:mm')}` })
        } catch (e) {
            console.log(e)
        }


        // todo create user if not exist
    },
};
