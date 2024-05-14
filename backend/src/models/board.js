// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
// const { schemaOptions } = require('./modelOptions')

// const boardSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     type:String,
//     ref: 'User',
//     required: true
//   },
//   icon: {
//     type: String,
//     default: '📃'
//   },
//   title: {
//     type: String,
//     default: 'Untitled'
//   },
//   description: {
//     type: String,
//     default: `Add description here
//     🟢 You can add multiline description
//     🟢 Let's start...`
//   },
//   position: {
//     type: Number
//   },
//   favourite: {
//     type: Boolean,
//     default: false
//   },
//   favouritePosition: {
//     type: Number,
//     default: 0
//   }
// }, schemaOptions)

// module.exports = mongoose.model('Board', boardSchema)

const mongoose = require('mongoose');

const boardSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		isImage: {
			type: Boolean,
			default: true,
		},
		backgroundImageLink: {
			type: String,
			// required: true,
			required: false,
		},
		activity: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user',
				},
				name: {
					type: String,
				},
				action: {
					type: String,
				},
				date: {
					type: Date,
					default: Date.now,
				},
				edited: {
					type: Boolean,
					default: false,
				},
				cardTitle: {
					type: String,
					default: '',
				},
				actionType: {
					type: String,
					default: 'action',
				},
				color: {
					type: String,
				},
			},
		],
		members: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'user',
				},
				name: {
					type: String,
				},
				surname: {
					type: String,
				},
				email: {
					type: String,
				},
				role: {
					type: String,
					default: 'member',
				},
				color: {
					type:String,
				}
			},
		],
		lists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'list',
			},
		],
		description: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('board', boardSchema);
