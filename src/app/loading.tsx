import { CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex w-full h-screen items-center justify-center bg-black bg-opacity-10 z-40">
            <CircularProgress size="4rem" />
        </div>
    );
};

export default Loading;
