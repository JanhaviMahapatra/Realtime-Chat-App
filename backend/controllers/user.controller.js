import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
		}).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const searchUsers = async (req, res) => {
	try {
		const { query } = req.query;
		const loggedInUserId = req.user._id;

		if (!query || !query.trim()) {
			return res.status(400).json({
				error: "Search query is required",
			});
		}

		const users = await User.find({
			_id: { $ne: loggedInUserId },
			$or: [
				{
					fullName: {
						$regex: query.trim(),
						$options: "i",
					},
				},
				{
					username: {
						$regex: query.trim(),
						$options: "i",
					},
				},
			],
		})
			.select("-password")
			.limit(10);

		res.status(200).json(users);
	} catch (error) {
		console.error("Error in searchUsers: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};