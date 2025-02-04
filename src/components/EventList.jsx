import PropTypes from "prop-types";

const EventList = ({ events }) => {
    const formatDate = (date) => {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return (
        <div className="p-6">
            <div className="flex flex-wrap gap-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex-grow md:flex-grow-0 basis-[calc(50%-0.5rem)] md:basis-[calc(25%-0.75rem)] min-w-[250px] p-4 rounded-lg bg-white shadow-md"
                    >
                        {event.media && (
                            <div className="aspect-[4/3] mb-3 rounded-lg overflow-hidden">
                                {event.media && (
                                    <img
                                        src={event.media}
                                        alt={event.title}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                )}
                            </div>
                        )}
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full w-5 h-5 bg-purple-500 flex items-center justify-center p-2 text-white">
                                {" "}
                                {event.community.slice(0, 1)}
                            </div>
                            <p className="text-xs">{event.community}</p>
                        </div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            🕖 {formatDate(event.startDate)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
                    </div>
                ))}
            </div>
            {events.length === 0 && (
                <p className="text-center text-gray-500">No events yet</p>
            )}
        </div>
    );
};

EventList.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            startDate: PropTypes.instanceOf(Date).isRequired,
            location: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            media: PropTypes.string,
        })
    ).isRequired,
};

export default EventList;