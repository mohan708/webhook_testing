import { useUser } from "@clerk/clerk-react";

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <p>Loading...</p>;
  if (!isSignedIn) return <p>Not signed in</p>;

  return (
    <div>
      <h2>Welcome</h2>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
      <p>Name: {user.fullName}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
}

export default Dashboard;
