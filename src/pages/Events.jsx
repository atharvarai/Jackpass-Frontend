import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import {
    getEvents,
    saveEvents,
    getCommunities,
    saveCommunities,
} from "../utils/storage";

function Events() {
    const [events, setEvents] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [showNewEventForm, setShowNewEventForm] = useState(false);

    useEffect(() => {
        setEvents(getEvents());
        // Load or initialize communities
        const existingCommunities = getCommunities();
        if (existingCommunities.length === 0) {
            // Initialize with default communities if none exist
            const defaultCommunities = [
                { id: 1, name: "Indiranagar Run Club" },
                { id: 2, name: "Koramangala Cycling Club" },
                { id: 3, name: "HSR Layout Fitness Group" },
            ];
            saveCommunities(defaultCommunities);
            setCommunities(defaultCommunities);
        } else {
            setCommunities(existingCommunities);
        }
        console.log(getEvents());
    }, []);

    const handleEventCreated = async (newEvent) => {
        try {
            const updatedEvents = [...events, newEvent];
            await saveEvents(updatedEvents);
            setEvents(updatedEvents);
            setShowNewEventForm(false);
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-8">
                <div className="mb-6 px-6">
                    <h1 className="text-7xl text-center text-white bg-blue-400 w-full p-3 font-bold">
                        Events
                        <span className="text-3xl block mt-2">
                            Create and manage events for your community
                        </span>
                    </h1>

                    <button
                        onClick={() => setShowNewEventForm(true)}
                        className="fixed bottom-8 right-8 bg-[#1E28FF] text-white text-2xl font-bold rounded-full h-14 w-14 flex items-center justify-center hover:bg-blue-400 transition-colors"
                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="30" viewBox="0 0 448 512" fill="white"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
                    </button>

                </div>
                <EventList events={events} />

                {/* Modal Overlay */}
                {showNewEventForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-center items-center p-4 border-b relative">
                                <h2 className="text-xl font-semibold">Create New Event</h2>
                                <button
                                    onClick={() => setShowNewEventForm(false)}
                                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <EventForm
                                    onEventCreated={handleEventCreated}
                                    communities={communities}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Events;
