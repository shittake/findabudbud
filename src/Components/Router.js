import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout";
import LeaderboardPage from "../Pages/LeaderboardPage";
import ChatPage from "../Pages/ChatPage";
import EventsPage from "../Pages/EventsPage";
import ProfilePage from "../Pages/ProfilePage";
import Account from "../Account";

{
  /* To link to to other pages using Router */
}

export default function Router({ session }) {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout session={session}/>}>
          <Route path="/" element={<Account key={session.user.id} session={session} />} />
          <Route path="profilepage" element={<ProfilePage session={session}/> } />
          <Route path="firstpage" element={<LeaderboardPage session={session} />} />
          <Route path="chatpage" element={<ChatPage session={session}/>} />
          <Route path="eventspage" element={<EventsPage session={session} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
