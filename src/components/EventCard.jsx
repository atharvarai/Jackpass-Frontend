import React from 'react';
import { format } from 'date-fns';

const EventCard = ({ event }) => {
    return (
        <div className="bg-gray rounded-lg shadow-sm overflow-hidden">
            {event.media && (
                <div className="aspect-[4/5]">
                    <img
                        src={event.media}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="p-4">
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p className="text-gray-600 text-sm">
                    {format(new Date(event.date), 'PPp')}
                </p>
                <p className="text-gray-600 text-sm mt-1">{event.location}</p>
            </div>
        </div>
    );
};

export default EventCard;
