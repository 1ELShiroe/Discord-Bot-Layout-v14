import { ButtonInteraction, EmbedBuilder } from "discord.js";
import BaseComponent from "../../Helpers/BaseComponent";

export default class extends BaseComponent {
    CustomId = "addRole";

    async Run(interaction: ButtonInteraction): Promise<void> {
        const guild = interaction.guild!!;

        var existRole = guild.roles.cache.get("Welcome");
        if (!existRole) existRole = await guild.roles.create({ name: "Welcome" });

        const member = guild.members.cache.get(interaction.user.id)!!;
        member.roles.add(existRole);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`New role added successfully`)
            ],
            ephemeral: true
        });
    }
}
