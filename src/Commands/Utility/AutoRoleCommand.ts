import { ChatInputCommandInteraction, CacheType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js";
import BaseCommand from "../../Helpers/BaseCommand";
import SuperClient from "../../SuperClient";

export default class AutoRoleCommand implements BaseCommand {
    Name = "roles";
    Description = "c";
    Permission = PermissionFlagsBits.ManageGuild;

    async Execute(Client: SuperClient, Interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const row = new ActionRowBuilder<ButtonBuilder>();

        row.addComponents(
            new ButtonBuilder()
                .setCustomId("remRole")
                .setLabel("remRole")
                .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
                .setCustomId("addRole")
                .setLabel("addRole")
                .setStyle(ButtonStyle.Success),
        )

        Interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("Adicionar e remover cargo")
                    .setColor("#f89903")
            ],
            components: [row],
        });
    }
}

