import { UUID } from "crypto";

export default interface MusicQueue {
    rooms_id: UUID,
    added_by: UUID,
    youtube_url: string,
    is_playing: boolean
}