import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Header from "./Header";

const Account = ({ session }) => {
  return (
    <>
      <Header session={session} />
      <div> Welcome to findabud! </div>
    </>

    );
}

export default Account;