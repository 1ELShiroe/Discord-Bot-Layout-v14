export default abstract class BaseComponent {
    abstract CustomId: string;
    Find = (event: AnyComponentInteraction) => event.customId.startsWith(this.CustomId);
    abstract Run(interaction: AnyComponentInteraction): Promise<void>;
}