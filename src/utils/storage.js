const EVENTS_KEY = "events";
const COMMUNITIES_KEY = "communities";

// Helper to convert File/Blob to Base64
const fileToBase64 = async (file) => {
    // If it's already a Base64 string, return it
    if (typeof file === "string" && file.startsWith("data:")) {
        return file;
    }

    // If it's a File/Blob, convert it
    if (file instanceof Blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    return null;
};

// Helper to convert ISO strings back to Date objects in event objects
const parseEventDates = (event) => {
    return {
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        createdAt: new Date(event.createdAt),
    };
};

export const saveEvent = async (event) => {
    try {
        const events = getEvents();
        // Convert media file to Base64 if it exists
        const eventToSave = {
            ...event,
            id: Date.now(),
            media: event.media ? await fileToBase64(event.media) : null,
        };
        events.push(eventToSave);
        localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    } catch (error) {
        console.error("Error saving event:", error);
        throw new Error("Failed to save event");
    }
};

export const saveEvents = async (events) => {
    try {
        // Ensure all media is converted to Base64 before saving
        const eventsToSave = await Promise.all(
            events.map(async (event) => ({
                ...event,
                media: event.media ? await fileToBase64(event.media) : null,
            }))
        );
        localStorage.setItem(EVENTS_KEY, JSON.stringify(eventsToSave));
    } catch (error) {
        console.error("Error saving events:", error);
        throw new Error("Failed to save events");
    }
};

export const getEvents = () => {
    const events = localStorage.getItem(EVENTS_KEY);
    if (!events) return [];

    try {
        const parsedEvents = JSON.parse(events);
        // Convert date strings back to Date objects
        return parsedEvents.map(parseEventDates);
    } catch (error) {
        console.error("Error parsing events:", error);
        return [];
    }
};

export const saveCommunities = (communities) => {
    localStorage.setItem(COMMUNITIES_KEY, JSON.stringify(communities));
};

export const getCommunities = () => {
    const communities = localStorage.getItem(COMMUNITIES_KEY);
    try {
        return communities ? JSON.parse(communities) : [];
    } catch (error) {
        console.error("Error parsing communities:", error);
        return [];
    }
};