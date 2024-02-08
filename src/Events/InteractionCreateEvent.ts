import { Interaction } from "discord.js";
import BaseEvent from "../Abstracts/BaseEvent";
import SuperClient from "../SuperClient";

export default class InteractionCreateEvent implements BaseEvent {
    Name = "interactionCreate";

    async Run(Client: SuperClient, interaction: Interaction): Promise<void> {
        if (interaction.isChatInputCommand()) return;


        if (interaction.isButton() || interaction.isStringSelectMenu()) {
            const component = Client.ComponentHandler.get(interaction.customId);

            if (component && component.Find(interaction)) {
                component.Run(interaction as AnyComponentInteraction);
            }
        }
    }
}