import { SlashCommandBuilder, CommandInteraction, User } from "discord.js";
import prisma from "../../db";
import { client } from "../../implementation/client";
import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import { getDateSpanMilis } from "../../utils/random-generators";
import { pripominumStandupJobGroCronuNehe } from "../../recurring-jobs/pripominam-standup-job";
import { PripominamStandup } from "@prisma/client";

dayjs.extend(utc.default);
dayjs.extend(timezone.default);


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
        const utcTimeOfStandup = dayjs.utc(dateString).toDate();
        // const utcTimeOfStandup = dayjs.utc(dateString).locale();
        // const utcTimeOfStandup2 = dayjs(dateString).locale();
        // const utcTimeOfStandup3 = dayjs(dateString).utc().locale();
        const utcTimeOfStandup2 = dayjs.tz(new Date(), "Europe/Prague") // '2013-11-18T11:55:20-05:00'
        const utcTimeOfStandup3 = dayjs.tz(new Date(), "Europe/Prague").toDate() // '2013-11-18T11:55:20-05:00'
        const utcTimeOfStandup4 = dayjs.tz(new Date(), "Europe/Prague").utc().toDate() // '2013-11-18T11:55:20-05:00'

        // Converting (from time zone 'Europe/Berlin'!)
        const utcTimeOfStandup5 =  dayjs(new Date()).tz("Europe/Prague")
        const utcTimeOfStandup6 =  dayjs(new Date()).tz("Europe/Prague").toDate()
        const utcTimeOfStandup7 =  dayjs(new Date()).tz("Europe/Prague").utc().toDate()


        const discordId = interaction.user.id;
        const description = interaction.options.get('popis') as unknown as string;
        const channelId = interaction.channelId;
        console.log(utcTimeOfStandup3, utcTimeOfStandup4, utcTimeOfStandup6, utcTimeOfStandup7);

        // if less than 30 dont save to db
        if (getDateSpanMilis(new Date(), dateOfStandup) < 30 * 60 * 1000) {
            // TODO maybe this will fuckup 

            let hackyPickData: Pick<PripominamStandup, 'time' | 'channelId'> = { time: dateOfStandup, channelId };
            pripominumStandupJobGroCronuNehe([hackyPickData]);
            interaction.editReply({ content: "Dej si! " });
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
            console.log("in db", pripominamStandup);


            interaction.editReply({ content: "Dej si! " })
        } catch (e) {

            console.log(e)
        }
        // todo create user if not exist
    },
};
