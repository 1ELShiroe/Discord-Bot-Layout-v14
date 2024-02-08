import { ApplicationCommandOptionData, ChatInputCommandInteraction } from "discord.js";
import SuperClient from "../SuperClient";

export default abstract class BaseCommand {
    abstract Name: string;
    abstract Description: string;
    abstract Options?: ApplicationCommandOptionData[];
    abstract Permission?: BigInt[] | BigInt;

    abstract Execute(Client: SuperClient, Interaction: ChatInputCommandInteraction): void;
}