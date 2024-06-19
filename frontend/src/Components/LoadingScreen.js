import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import styled from 'styled-components';
import loadingIcon from '../Images/loading.gif';
const Icon = styled.img`
	width: 5rem;
	height:5rem;
`;

export default function LoadingScreen() {
	const [open] = React.useState(true);
// 	const handleClose = () => {
//     setOpen(false);
//   }; 
	return (
		<div>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				// onClick={handleClose}
			>
				<Icon src={loadingIcon} />
			</Backdrop>
		</div>
	);
}
