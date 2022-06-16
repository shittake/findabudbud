import React from 'react';
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default async function addToMatch(firstID, secondID, firstName, secondName) {

if (secondID != null){
	const { data, error } = await supabase
	  .from('match')
	  .insert([
	    {id: firstID + secondID, firstuser: firstID, seconduser: secondID,
	    firstName: firstName, secondName: secondName, date: Date().toLocaleString()},
	  ], { upsert: true })
}

	return (
		<>
		"cool";
		</>
		);
}