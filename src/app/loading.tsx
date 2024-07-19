import { CircularProgress } from "@mui/material"

const Loading = () => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex w-full flex-col items-center justify-center bg-black/10 z-40 scroll-auto">
            <CircularProgress size="4rem" />
        </div>
    )
}

export default Loading