declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string,
            DISCORD_GUILD_ID: string,
        }
    }
}

declare type AnyComponentInteraction =
    ButtonInteraction | StringSelectMenuInteraction | UserSelectMenuInteraction | ChannelSelectMenuInteraction | 
    RoleSelectMenuInteraction | MentionableSelectMenuInteraction | ModalSubmitInteraction;