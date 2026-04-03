import { UUID } from "crypto";

export default interface MusicQueueInterface {
    rooms_id: UUID,
    added_by: UUID,
    youtube_url: string,
    is_playing: boolean
}