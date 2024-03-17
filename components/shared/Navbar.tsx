import Link from "next/link";
import Image from "next/image";

import { OrganizationSwitcher, SignedIn, SignOutButton , UserButton } from "@clerk/nextjs";

async function Navbar() {
    return (
        <nav className="topbar">
                <Link href='/' className="flex items-center gap-4">
                    <Image 
                        src = '/assets/logo.svg' alt="logo" width={28} height={28} />
                    <p className=" text-heading3-bold text-white max-xs:hidden " 
                    >Threads</p>
                </Link>

                <div className="flex items-center gap-1">
                    <div className="block md:hidden">
                        <SignedIn>
                            <SignOutButton>
                                <div className="flex cursor-pointer">
                                    <Image src= '/assets/logout.svg' alt = 'logout' width={24} height={24}
                                    />
                                </div>

                            </SignOutButton>
                        </SignedIn>
                    </div>
                    
                    <OrganizationSwitcher
                        appearance={{
                            elements: {
                                organizationSwitcherTrigger:
                                "py-2 px-2 text-light-1 "
                            }
                        }}
                    />

                </div>


        </nav>
    )
}

export default Navbar ;