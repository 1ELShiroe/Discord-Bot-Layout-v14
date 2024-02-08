import { ButtonInteraction, EmbedBuilder } from "discord.js";
import BaseComponent from "../../Abstracts/BaseComponent";

export default class extends BaseComponent {
    CustomId = "remRole";

    async Run(interaction: ButtonInteraction): Promise<void> {
        const guild = interaction.guild!!;

        var existRole = guild.roles.cache.find(role => role.name === 'Welcome')!;

        const member = guild.members.cache.get(interaction.user.id)!;
        if (member.roles.cache.some(role => role.name === 'Welcome')) await member.roles.remove(existRole);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Role removed successfully!`)
            ],
            ephemeral: true
        });
    }
}
