import { CircularProgress } from "@mui/material";

interface ILoader {
    loader: boolean;
};

const Loader = ({ loader }: ILoader) => {
    return (
        <div className={`${loader ? 'fixed' : 'hidden'} top-0 bottom-0 left-0 right-0 flex w-full h-screen items-center justify-center bg-black bg-opacity-10 z-40`}>
            <CircularProgress size="4rem" />
        </div>
    )
}

export default Loader;