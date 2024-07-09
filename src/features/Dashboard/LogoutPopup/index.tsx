import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface ILogoutPopup {
    isOpen: boolean;
    close: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutPopup = ({ isOpen, close }: ILogoutPopup) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef?.current && !modalRef?.current?.contains(e.target as Node)) {
            close(false);
        };
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        router.push('/login');
    };

    return (
        <div className={`${isOpen ? 'fixed' : 'hidden'} top-0 left-0 right-0 bottom-0 bg-black/20 flex flex-col items-center justify-center z-[60]`}
            onClick={handleOutsideClick}
        >
            <div className="bg-white p-6 rounded-md shadow border w-2/12" ref={modalRef}>
                <Typography className="text-xl text-center mb-16">
                    Hesabdan çıxış <br /> etməyə əminsiniz?
                </Typography>

                <Box className="flex ">
                    <button className="w-6/12 text-center text-xl text-[#EF5648]"
                        onClick={handleLogout}
                    >Çıxış</button>
                    <button className="w-6/12 text-center text-xl"
                        onClick={() => close(false)}
                    >İmtina</button>
                </Box>
            </div>
        </div>
    )
}

export default LogoutPopup