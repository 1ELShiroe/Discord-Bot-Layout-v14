export default abstract class BaseEvent {
    /**
     * Name of the event.
     */
    abstract Name: string;
    abstract Run: (...args: any[]) => void;
}