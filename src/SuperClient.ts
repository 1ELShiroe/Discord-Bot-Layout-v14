import { ChatInputCommandInteraction, Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import BaseComponent from "./Helpers/BaseComponent";
import BaseCommand from "./Helpers/BaseCommand";
import BaseEvent from "./Helpers/BaseEvent";
import { readdirSync } from "fs";
import { join } from "path";

export default class SuperClient extends Client {
    private static instance: SuperClient | undefined;
    private commands = new Collection<string, BaseCommand>();
    public ComponentHandler = new Collection<string, BaseComponent>();

    private dir = {
        Event: join(__dirname, "Events"),
        Command: join(__dirname, "Commands"),
        Component: join(__dirname, "Components"),
    };

    public initDate: number;

    private constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.MessageContent,
            ],
            partials: [
                Partials.Channel,
                Partials.Message],
        });

        if (!SuperClient.instance) {
            SuperClient.instance = this;
        }

        this.initDate = Date.now();
        this.run();


        this.on("interactionCreate", (interaction) => {
            if (!interaction.isCommand()) return;

            const command = this.commands.get(interaction.commandName);
            if (command) command.Execute(this, interaction as ChatInputCommandInteraction);
        });
    }

    static getInstance(): SuperClient | undefined {
        return SuperClient.instance;
    }

    async run() {
        try {
            await this.LoadComponents();
            await this.LoadEvents();

            this.on("ready", async () => {
                await this.application!.commands.set([]);
                this.LoadCommands()
            });

            await super.login(process.env.DISCORD_TOKEN);
        } catch (err) {
            console.error("Can't login as the bot.", err);
        }
    }

    private async LoadEvents() {
        const files = readdirSync(this.dir.Event);
        for (const file of files) {
            try {
                const eventModule = await import(join(this.dir.Event, file));
                const eventClass = eventModule.default as new () => BaseEvent;

                const event = new eventClass();

                if (event.Run) this.on(event.Name, (...args: any[]) => event.Run.bind(event)(this, ...args));
                else console.error(`Error loading event from file ${file}: Run method is not defined.`);

            } catch (error) {
                console.error(`Error loading event from file ${file}`, error);
            }
        }
    }


    private async LoadCommands(directory: string = "") {
        const files = readdirSync(join(this.dir.Command, directory), { withFileTypes: true });

        for (const file of files) {
            const fullPath = join(directory, file.name);

            if (file.isDirectory()) await this.LoadCommands(fullPath);
            else if (file.isFile() && fullPath.endsWith(".ts")) {
                try {
                    const commandModule = await import(join(this.dir.Command, directory, file.name));
                    const commandClass = commandModule.default as new () => BaseCommand;

                    const command = new commandClass();

                    this.commands.set(command.Name, command);

                    await this.application?.commands.create({
                        name: command.Name,
                        description: command.Description,
                        options: command.Options
                    });
                } catch (error) {
                    console.error(`Error loading command from file ${fullPath}`, error);
                }
            }
        }
    }

    private async LoadComponents(directory: string = "") {
        const files = readdirSync(join(this.dir.Component, directory), { withFileTypes: true });

        for (const file of files) {
            const fullPath = join(directory, file.name);

            if (file.isDirectory()) await this.LoadComponents(fullPath);
            else if (file.isFile() && fullPath.endsWith(".ts")) {
                try {
                    const componentModule = await import(join(this.dir.Component, directory, file.name));
                    const componentClass = componentModule.default as new () => BaseComponent;

                    const component = new componentClass();

                    this.ComponentHandler.set(component.CustomId, component);
                } catch (error) {
                    console.error(`Error loading component from file ${fullPath}`, error);
                }
            }
        }
    }
}
