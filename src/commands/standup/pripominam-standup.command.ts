import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import prisma from "../../db";
import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import { getDateSpanMilis } from "../../utils/random-generators";
import { PripominamStandup } from "@prisma/client";
import { pripominumStandupJobGroCronuNehe } from "../../helpers/standup/standup.helper";
import { client } from "../../implementation/client";

dayjs.extend(utc.default);
dayjs.extend(timezone.default);

export const command = {
    data: new SlashCommandBuilder()
        .setName("stand-up")
        .setDescription("Pripomenuti standupu v urcitou hodinu")
        .addStringOption(option =>
            option.setName("cas")
                .setDescription("Cas HH:MM v 24 hod formatu (jedna se o Prague Time takze ze zahranici to bude blbnou neheheh)")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("datum")
                .setDescription("Cas DD-MM-YYYY (priklad 11-09-2007)")
        )
        .addStringOption(option =>
            option.setName("popis")
                .setDescription("Popis syncu")
        ),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/

        let popis = <string>(interaction.options.get('popis')?.value)
        let cas = <string>(interaction.options.get('cas')?.value)
        let datum = <string>(interaction.options.get('datum')?.value);
        let dummyDate = dayjs(new Date()).tz("Europe/Prague");

        datum ||= `${dummyDate.date()}-${dummyDate.month() + 1}-${dummyDate.year()}`;
        let [day, month, year] = datum.split("-").map(num => num.padStart(2, '0'))
        let createdDate = `${year}-${month}-${day}T${cas}`;

        console.log(createdDate);

        if (!(regex).test(createdDate)) {
            console.error("[Error] V pici casy");
            interaction.editReply("Chlapi tady se něco nepovedlo, udělam na to excel sheet, nekde je chyba v datumu");
            return;
        }

        const utcTimeOfStandup3 = dayjs.tz(createdDate, "Europe/Prague").toDate()

        const discordId = interaction.user.id;
        const description = interaction.options.get('popis') as unknown as string;
        const channelId = interaction.channelId;
        const standupText = `Bando- stand up tedy ${dayjs.tz(utcTimeOfStandup3, "Europe/Prague").format('DD.MM.YYYY v HH:mm')}. ${popis ? 'Nezapomeňte se připravit, téma bude: ' + popis : ''}`

        // if less than 30 dont save to db
        console.log(new Date(), utcTimeOfStandup3)
        if (getDateSpanMilis(new Date(), utcTimeOfStandup3) < 0) {

            interaction.editReply({ content: `Bando- takoveto vtípky si nechte na jindy! Tady jedeme agilní vývoj.` });
            return;
        }
        
        if (getDateSpanMilis(new Date(), utcTimeOfStandup3) < 30 * 60 * 1000) {

            let hackyPickData: Pick<PripominamStandup, 'time' | 'channelId'> = { time: utcTimeOfStandup3, channelId };
            pripominumStandupJobGroCronuNehe([hackyPickData]);
            console.log(dayjs(utcTimeOfStandup3).locale("Europe/Prague").format('DD/MM/YYYY v HH:m'))
            interaction.editReply({ content: standupText });
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
            interaction
                .editReply(
                    {
                        content: standupText
                    })
        } catch (e) {
            interaction.editReply("Chlapi tady se něco nepovedlo, udělam na to excel sheet, asi tam chybi setTimeout()");
        }
    },
};
