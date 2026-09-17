import "../../style/MessageSkeleton.css";

const MessageSkeleton = () => {
	return (
		<>
			<div className="skeleton-message incoming">
				<div className="skeleton-avatar"></div>

				<div className="skeleton-bubble">
					<div className="skeleton-line w-180"></div>
					<div className="skeleton-line w-120"></div>

					<div className="skeleton-meta"></div>
				</div>
			</div>

			<div className="skeleton-message outgoing">
				<div className="skeleton-bubble">
					<div className="skeleton-line w-160"></div>

					<div className="skeleton-meta"></div>
				</div>

				<div className="skeleton-avatar"></div>
			</div>
		</>
	);
};

export default MessageSkeleton;