const { findOne } = require('../models/board.js');
const boardModel = require('../models/board.js');
const userModel = require('../models/user.js');

const create = async (req, callback) => {
	try {
		const { title, backgroundImageLink, members } = req.body;
		let newBoard = boardModel({ title, backgroundImageLink });
		await newBoard.save(); 

		const user = await userModel.findById(req.user.id);
		user.boards.unshift(newBoard.id);
		await user.save();

		let allMembers = [];
		allMembers.push({
			user: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			color: user.color,
			role: 'owner',
		});


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
					newBoard.activity.push({
						user: user.id,
						name: user.name,
						action: `added user '${newMember.name}' to this board`,
					});
				} catch (error) {
					console.error(`Error saving member: ${error.message}`);
					
				}
			})
		);

		
		newBoard.activity.unshift({ user: user._id, name: user.name, action: 'created this board', color: user.color });

	
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
		// console.log(userId)
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
		if (!board) {
			return callback({ message: 'Board not found' });
		}
		return callback(false, board);
	} catch (error) {
		return callback({ message: 'Error fetching board', details: error.message });
	}
};

const deleteBoard=async(id,callback)=>{
	try {
		const board = await boardModel.findByIdAndDelete(id);
        if (!board) {
            return callback({ message: 'Board not found' });
        }
        await userModel.updateMany(
            { boards: id },
            { $pull: { boards: id } } 
        );
        return callback(null, { message: 'Board deleted successfully' });
	
	} catch (error) {
		return callback({ message: 'Error fetching board', details: error.message });
	}
}

const getActivityById = async (id, callback) => {
	try {
		const board = await boardModel.findById(id);
		if(!board){
			return callback({ message: 'Board not found' });
		}
		return callback(false, board.activity);
	} catch (error) {
		return callback({ message: 'Error fetching board ', details: error.message });
	}
};

const updateBoardTitle = async (boardId, title, user, callback) => {
	try {
		const board = await boardModel.findById(boardId);
		if(!board){
			return callback({ message: 'Board not found' });
		}
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
		return callback({ message: 'Failed to update Board Title ', details: error.message });
	}
};

const updateBoardDescription = async (boardId, description, user, callback) => {
	try {
		const board = await boardModel.findById(boardId);
		if(!board){
			return callback({ message: 'Board not found' });
		}
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
		return callback({ message: 'Failed to update Board Description', details: error.message });
	}
};

const updateBackground = async (id, background, isImage, user, callback) => {
	try {
		const board = await boardModel.findById(id);

		if(!board){
			return callback({ message: 'Board not found' });
		}

		board.backgroundImageLink = background;
		board.isImage = isImage;

		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: 'update background of this board',
			color: user.color,
		});

		await board.save();

		return callback(false, board);
	} catch (error) {
		return callback({ message: 'Failed to update board background', details: error.message });
	}
};

const addMember = async (id, members, user, callback) => {
	try {
		const board = await boardModel.findById(id);

		if(!board){
			return callback({message:"board not found"});
		}
		// await Promise.all(
		// 	members.map(async (member) => {
		// 		const newMember = await userModel.findOne({ email: member.email });
		// 		console.log(newMember);
		// 		newMember.boards.push(board._id);
		// 		await newMember.save();
		// 		console.log(newMember);

		// 		board.members.push({
		// 			user: newMember._id,
		// 			name: newMember.name,
		// 			surname: newMember.surname,
		// 			email: newMember.email,
		// 			color: newMember.color,
		// 			role: 'member',
		// 		});

		// 		board.activity.push({
		// 			user: user.id,
		// 			name: user.name,
		// 			action: `added user '${newMember.name}' to this board`,
		// 			color: user.color,
		// 		});
		// 	})
		// );
		// await board.save();

		// return callback(false, board.members);

		members.forEach(member => {
			board.members.push({
				name: member.name,
				surname: member.surname,
				email: member.email,
				color: member.color,
				role: 'member',
			});

			board.activity.push({
				user: user.id,
				name: user.name,
				action: `added user '${member.name}' to this board`,
				color: user.color,
			});
		});

		await board.save();

		return callback(null, board.members);


	} catch (error) {
		return callback({ message: 'failed to add members', details: error.message });
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
	deleteBoard
};
