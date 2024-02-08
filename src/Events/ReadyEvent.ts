import BaseEvent from "../Abstracts/BaseEvent";
import SuperClient from "../SuperClient";

export default class ReadyEvent implements BaseEvent {
    Name = "ready";
    Once = true;

    async Run(Client: SuperClient) {
        const startupTime = ((Date.now() - Client.initDate) / 1000).toFixed(2);
        console.log(`The bot is ready in ${startupTime}s as ${Client.user?.username}.`);
    }
}
