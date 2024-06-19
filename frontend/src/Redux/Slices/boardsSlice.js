import { createSlice } from "@reduxjs/toolkit";
import Image01  from '../../Images/Image01.jpg'
import Image02  from '../../Images/Image02.jpg'
import Image03  from '../../Images/Image03.jpg'
import Image04  from '../../Images/Image04.jpg'
import Image05  from '../../Images/Image05.jpg'
import Image06  from '../../Images/Image06.jpg'
import Image07  from '../../Images/Image07.jpg'
import Image08  from '../../Images/Image08.jpg'
import Image09  from '../../Images/Image09.jpg'

const initialState = {
  boardsData: {},
  pending: true,
  backgroundImages: [
    Image01,
    Image02,
    Image03,
    Image04,
    Image05,
    Image06,
    Image07,
    Image08,
    Image09,
  ],
  smallPostfix:
    "?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjM2NjUzNDgz&ixlib=rb-1.2.1&q=80&w=400",
  creating: false,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    startFetchingBoards: (state) => {
      state.pending = true;
    },
    successFetchingBoards: (state, action) => {
      state.boardsData = action.payload.boards;
      state.pending = false;
    },
    failFetchingBoards: (state) => {
      state.pending = false;
    },
    startCreatingBoard: (state) => {
      state.creating = true;
    },
    successCreatingBoard: (state, action) => {
      state.boardsData.push(action.payload);
      state.creating = false;
    },
    failCreatingBoard: (state) => {
      state.creating = true;
    },
    reset:(state)=>{
      state=initialState;
    }
  },
});

export const {
  startFetchingBoards,
  successFetchingBoards,
  failFetchingBoards,
  startCreatingBoard,
  successCreatingBoard,
  failCreatingBoard,
  reset
} = boardsSlice.actions;
export default boardsSlice.reducer;
