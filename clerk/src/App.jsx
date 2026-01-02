import { SignedIn, SignedOut, SignInButton, UserButton,useClerk,useUser } from '@clerk/clerk-react';
import Dashboard from "./Dashboard";
import './App.css';

function App() {
   const {openSignIn} = useClerk();
   const {user} = useUser();
  return (
    <>
      {/* <header>
          <SignedOut>
            <SignInButton />
          </SignedOut> 

         <SignedIn>
          <UserButton />
        </SignedIn>
      </header> */}

      {/* Main Content */}
      <main>
        {/* <SignedOut>
          <p>Please sign in to access the dashboard.</p>
        </SignedOut>

        <SignedIn>
          <Dashboard />
        </SignedIn> */}
        
      </main>
                  {
                    user ?
   
                   <UserButton />
                   :
                   <button className='bg-blue-600 px-6 sm:px-8 text-white  py-2 rounded-full' onClick={e => openSignIn() }>Login</button>
                  }





      
    </>
  );
}

export default App;
