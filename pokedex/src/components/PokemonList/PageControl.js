import { IconButton } from "@mui/material";

function PageControl(props) {
    const { icon, label, onClick, disabled } = props;

    return (
        <IconButton aria-label={label} onClick={onClick} disabled={disabled}>
            {icon}
        </IconButton>
    );
}

export default PageControl;