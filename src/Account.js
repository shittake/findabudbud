import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Header from "./Header";
import Footer from "./Footer";

const Account = ({ session }) => {
  return (
    <>
      <Header session={session} />
      <div>Welcome to findabud! </div>
      <Footer />
    </>

    );
}

export default Account;