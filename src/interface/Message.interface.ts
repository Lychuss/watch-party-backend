import { UUID } from "crypto";

export default interface Message {
    rooms_id: UUID,
    senders_id: UUID,
    context: string,
}