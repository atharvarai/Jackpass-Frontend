import React, { useState } from "react";
import PropTypes from "prop-types";
import { MapPin } from "lucide-react";
import MediaUpload from "./MediaUpload";
import "../styles/EventForm.css";

const EventForm = ({ onEventCreated, communities }) => {
    // Helper function to format time for input
    const formatTimeForInput = (date) => {
        return date.toTimeString().slice(0, 5); // Returns HH:MM format
    };

    // Helper function to combine date and time
    const combineDateAndTime = (date, time) => {
        const [hours, minutes] = time.split(":");
        const newDate = new Date(date);
        newDate.setHours(parseInt(hours), parseInt(minutes), 0);
        return newDate;
    };

    const [formData, setFormData] = useState({
        community: communities[0]?.name || "",
        title: "",
        startDate: new Date(),
        startTime: formatTimeForInput(new Date()),
        endDate: new Date(),
        endTime: formatTimeForInput(new Date()),
        location: "",
        description: "",
        media: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.title.trim()) {
            alert("Please enter an event title");
            return;
        }
        if (!formData.location.trim()) {
            alert("Please enter a location");
            return;
        }
        if (!formData.description.trim()) {
            alert("Please enter an event description");
            return;
        }
        if (!formData.media) {
            alert("Please upload an image or video");
            return;
        }

        try {
            // Combine date and time before sending
            const eventData = {
                ...formData,
                id: Date.now(),
                createdAt: new Date(),
                startDate: combineDateAndTime(formData.startDate, formData.startTime),
                endDate: combineDateAndTime(formData.endDate, formData.endTime),
            };

            onEventCreated(eventData);

            // Reset form
            setFormData({
                community: communities[0]?.name || "",
                title: "",
                startDate: new Date(),
                startTime: formatTimeForInput(new Date()),
                endDate: new Date(),
                endTime: formatTimeForInput(new Date()),
                location: "",
                description: "",
                media: null,
            });
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Error creating event. Please try again.");
        }
    };

    return (
        <div className="bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Media Upload */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#EEF2F6] to-[#E3E8F0]">
                    <MediaUpload
                        onMediaSelect={(media) => setFormData({ ...formData, media })}
                        media={formData.media}
                    />
                </div>

                {/* Community Select */}
                <div>
                    <label className="block text-sm mb-2">Select Community</label>
                    <select
                        className="w-full p-4 rounded-full border border-gray-200 bg-white"
                        value={formData.community}
                        onChange={(e) =>
                            setFormData({ ...formData, community: e.target.value })
                        }
                    >
                        {communities.map((community) => (
                            <option key={community.id} value={community.name}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Event Title */}
                <div>
                    <label className="block text-sm mb-2">
                        Event Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full p-4 rounded-full border border-gray-200"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        required
                    />
                </div>

                {/* Date/Time Section */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm mb-2">Start Date & Time</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                className="flex-1 p-2 rounded-full border border-gray-200"
                                value={formData.startDate.toISOString().split("T")[0]}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        startDate: new Date(e.target.value),
                                    })
                                }
                            />
                            <input
                                type="time"
                                className="w-32 p-2 rounded-full border border-gray-200"
                                value={formData.startTime}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        startTime: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-2">End Date & Time</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                className="flex-1 p-2 rounded-full border border-gray-200"
                                value={formData.endDate.toISOString().split("T")[0]}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        endDate: new Date(e.target.value),
                                    })
                                }
                            />
                            <input
                                type="time"
                                className="w-32 p-2 rounded-full border border-gray-200"
                                value={formData.endTime}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        endTime: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Location Input */}
                <div>
                    <label className="block text-sm mb-2">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                            <MapPin className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full p-4 pl-12 rounded-full border border-gray-200"
                            placeholder="Enter location"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({ ...formData, location: e.target.value })
                            }
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="block text-sm mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="w-full p-4 rounded-2xl border border-gray-200 min-h-[100px] resize-none"
                        placeholder="Tell guests what to expect at your event"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#1E28FF] text-white py-4 rounded-full hover:bg-blue-400 transition-colors"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

EventForm.propTypes = {
    onEventCreated: PropTypes.func.isRequired,
    communities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        })
    ).isRequired,
};

export default EventForm;