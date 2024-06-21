import axios from 'axios';
import { openAlert } from '../Redux/Slices/alertSlice';
import { setLoading, successCreatingCard,deleteCard } from '../Redux/Slices/listSlice';

const backendUrl= process.env.REACT_APP_BACKEND_URL;
const cardRoute = `${backendUrl}/api/card`;

export const createCard = async (title, listId, boardId, dispatch) => {
	dispatch(setLoading(true));
	try {
		const updatedList = await axios.post(cardRoute + '/create', { title: title, listId: listId, boardId: boardId });
		dispatch(successCreatingCard({ listId: listId, updatedList: updatedList.data }));
		dispatch(setLoading(false));
	} catch (error) {
		dispatch(setLoading(false));
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}
};

export const cardDelete = async(listId,boardId,cardId,dispatch)=>{
	try {
		await dispatch(deleteCard({listId,cardId}));
		await axios.delete(cardRoute + "/"+boardId+"/"+listId + "/" + cardId+ "/delete-card");
	} catch (error) {
		dispatch(
			openAlert({
				message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
				severity: 'error',
			})
		);
	}
}
