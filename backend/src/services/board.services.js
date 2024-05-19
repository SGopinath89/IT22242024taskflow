const { findOne } = require('../models/board.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');

// const create = async (req, callback) => {
// 	try {
// 		const { title, backgroundImageLink, members } = req.body;
// 		// Create and save new board
// 		let newBoard = boardModel({ title, backgroundImageLink });
// 		newBoard.save();

// 		// Add this board to owner's boards
// 		const user = await userModel.findById(req.user._id);
// 		user.boards.unshift(newBoard.id);
// 		await user.save();

// 		// Add user to members of this board
// 		let allMembers = [];
// 		allMembers.push({
// 			user: user.id,
// 			name: user.name,
// 			surname: user.surname,
// 			email: user.email,
// 			color: user.color,
// 			role: 'owner',
// 		});

// 		// Save newBoard's id to boards of members and,
// 		// Add ids of members to newBoard
// 		await Promise.all(
// 			members.map(async (member) => {
// 				const newMember = await userModel.findOne({ email: member.email });
// 				newMember.boards.push(newBoard._id);
// 				await newMember.save();
// 				allMembers.push({
// 					user: newMember._id,
// 					name: newMember.name,
// 					surname: newMember.surname,
// 					email: newMember.email,
// 					color: newMember.color,
// 					role: 'member',
// 				});
// 				//Add to board activity
// 				newBoard.activity.push({
// 					user: user.id,
// 					name: user.name,
// 					action: `added user '${newMember.name}' to this board`,
// 				});
// 			})
// 		);

// 		// Add created activity to activities of this board
// 		newBoard.activity.unshift({ user: user._id, name: user.name, action: 'created this board', color: user.color });

// 		// Save new board
// 		newBoard.members = allMembers;
// 		await newBoard.save();

// 		return callback(false, newBoard);
// 	} catch (error) {
// 		return callback({
// 			errMessage: 'Something went wrong',
// 			details: error.message,
// 		});
// 	}
// };

const create = async (req, callback) => {
	try {
		const { title, backgroundImageLink, members } = req.body;
		// Create and save new board
		let newBoard = boardModel({ title, backgroundImageLink });
		await newBoard.save(); // Added await

		// Add this board to owner's boards
		const user = await userModel.findById(req.user.id);
		user.boards.unshift(newBoard.id);
		await user.save();

		// Add user to members of this board
		let allMembers = [];
		allMembers.push({
			user: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			color: user.color,
			role: 'owner',
		});

		// Save newBoard's id to boards of members and,
		// Add ids of members to newBoard
		await Promise.all(
			members.map(async (member) => {
				try {
					const newMember = await userModel.findOne({ email: member.email });
					if (!newMember) {
						throw new Error(`User with email ${member.email} not found.`);
					}
					newMember.boards.push(newBoard._id);
					await newMember.save();
					allMembers.push({
						user: newMember._id,
						name: newMember.name,
						surname: newMember.surname,
						email: newMember.email,
						color: newMember.color,
						role: 'member',
					});
					// Add to board activity
					newBoard.activity.push({
						user: user.id,
						name: user.name,
						action: `added user '${newMember.name}' to this board`,
					});
				} catch (error) {
					console.error(`Error saving member: ${error.message}`);
					// Handle error for individual member
					// You can choose to log, ignore, or handle the error as appropriate
				}
			})
		);

		// Add created activity to activities of this board
		newBoard.activity.unshift({ user: user._id, name: user.name, action: 'created this board', color: user.color });

		// Save new board
		newBoard.members = allMembers;
		await newBoard.save();

		return callback(false, newBoard);
	} catch (error) {
		return callback({
			errMessage: 'Something went wrong',
			details: error.message,
		});
	}
};


const getAll = async (userId, callback) => {
	try {
		const user = await userModel.findById(userId);
		if(!user){
			return callback({ message: 'User not found' });
		}
		console.log(userId)
		const boardIds = user.boards;

		const boards = await boardModel.find({ _id: { $in: boardIds } });
		boards.forEach((board) => {
			board.activity = undefined;
			board.lists = undefined;
		});

		return callback(false, boards);
	} catch (error) {
		return callback({ msg: 'Error fetching boards', details: error.message });
	}
};

const getById = async (id, callback) => {
	try {
		const board = await boardModel.findById(id);
		return callback(false, board);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const getActivityById = async (id, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(id);
		return callback(false, board.activity);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const updateBoardTitle = async (boardId, title, user, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(boardId);
		board.title = title;
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: 'update title of this board',
			color: user.color,
		});
		await board.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const updateBoardDescription = async (boardId, description, user, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(boardId);
		board.description = description;
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: 'update description of this board',
			color: user.color,
		});
		await board.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const updateBackground = async (id, background, isImage, user, callback) => {
	try {
		const board = await boardModel.findById(id);

		board.backgroundImageLink = background;
		board.isImage = isImage;

		// Log the activity
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: 'update background of this board',
			color: user.color,
		});

		// Save changes
		await board.save();

		return callback(false, board);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const addMember = async (id, members, user, callback) => {
	try {
		const board = await boardModel.findById(id);

		await Promise.all(
			members.map(async (member) => {
				const newMember = await userModel.findOne({ email: member.email });
				newMember.boards.push(board._id);
				await newMember.save();
				board.members.push({
					user: newMember._id,
					name: newMember.name,
					surname: newMember.surname,
					email: newMember.email,
					color: newMember.color,
					role: 'member',
				});

				board.activity.push({
					user: user.id,
					name: user.name,
					action: `added user '${newMember.name}' to this board`,
					color: user.color,
				});
			})
		);
		await board.save();

		return callback(false, board.members);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

module.exports = {
	create,
	getAll,
	getById,
	getActivityById,
	updateBoardTitle,
	updateBoardDescription,
	updateBackground,
	addMember,
};
