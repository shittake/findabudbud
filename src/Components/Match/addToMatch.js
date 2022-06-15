import React from 'react';
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default async function addToMatch(b,c) {

if (c!=null){
	const { data, error } = await supabase
	  .from('match')
	  .insert([
	    {id: b+c, firstuser: b, seconduser: c },
	  ], { upsert: true })
}

	return (
		<>
		"cool";
		</>
		);
}