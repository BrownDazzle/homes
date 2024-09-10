'use client';

import useFavorite from "@/app/hooks/useFavorite";
import { SafeListing, SafeUser } from "@/app/types";
import { cn } from "../lib/utils";
import { clsx } from "clsx";
import { TbBrandStackshare } from "react-icons/tb";
import useShareModal from "../hooks/useShareModal";
import { IListing } from "../lib/database/models/listing.model";

interface ShareButtonProps {
    listingId: string;
    data: SafeListing;
}

const ShareButton: React.FC<ShareButtonProps> = ({
    listingId,
    data
}) => {
    const shareModal = useShareModal();
    shareModal.data = data;

    const toggleShare = () => {
        shareModal.onOpen();
    }

    return (
        <div
            onClick={toggleShare}
            className="
    p-2 
    rounded-full 
    shadow-md 
    bg-blue-100 
        hover:bg-white
    transition-all 
    duration-200
    flex 
    items-center 
    justify-center
  "
        >
            <TbBrandStackshare />
        </div>
    );
}

export default ShareButton;
