import React from 'react';
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default async function addToMatch(a,b,c) {

const { data, error } = await supabase
  .from('match')
  .insert([
    { id: a, firstuser: b, seconduser: c },
  ], { upsert: true })

	return (
		<>
		"cool";
		</>
		);
}