'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import Search from "./Search";
import { IoChatbubblesOutline } from "react-icons/io5";
import { RiArrowDropDownFill } from "react-icons/ri";
import useChatModal from "@/app/hooks/useChatModal";
import Button from "../Button";

interface UserMenuProps {
  CurrentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  CurrentUser
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const chatModal = useChatModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!user) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, user]);

  const onChat = useCallback(() => {
    router.push("/conversations")
    //chatModal.onOpen();
  }, [router]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <Search />
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          List your property
        </div>
        {user ? (<div

          className="
p-4
md:py-1
md:px-2
border-[1px] 
border-neutral-200 
flex 
flex-row 
items-center 
gap-5 
rounded-full 
cursor-pointer 
hover:shadow-md 
transition
"
        >
          <IoChatbubblesOutline size={24} onClick={onChat} />
          <div onClick={toggleOpen} className="flex flex-row items-center">
            <Avatar src={user?.image as string} />
            <RiArrowDropDownFill />
          </div>
        </div>) : (<Button label="SignIn" small={true} onClick={() => signIn("google")} />)}

      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            z-50
          "
        >
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem
                  label="List your property"
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="chat"
                  onClick={loginModal.onOpen}
                />
                <MenuItem
                  label="Sign up"
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;