import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";


async function page() {

    const user = await currentUser() ;
    if(!user)   return null ;
    const userInfo  = await fetchUser(user.id) ;

    const userData = {
        id : user?.id ,
        objectId : userInfo?._id ,
        username : userInfo?.username || user?.username ,
        name : userInfo?.name ||  user?.firstName  ,
        bio : userInfo?.bio || "" ,
        image : userInfo?.image || user?.imageUrl,
    }


    return(
        <main className="px-10 py-20 mx-auto justify-start" >
            <h1 className="head-text" >
                Onboarding
            </h1>
            <p className="text-light-2 mt-3">
                Complete your profile to use threads
            </p>
        

            <section className="mt-10 bg-dark-2 p-10 rounded-lg  ">
                <AccountProfile 
                    user = {userData} btnTitle = "continue" 
                />
            </section>
        </main>
    )
}

export default page ;