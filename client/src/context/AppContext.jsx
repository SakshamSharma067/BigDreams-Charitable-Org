import axios from 'axios';
import React, { createContext } from 'react'
import { useState, useEffect, useContext } from 'react';

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [campaign,setCampaign] = useState(null);
    const [volunteer,setVolunteer] = useState(null);
    const [donation,setDonation] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const fetchUser = async () => {
        try {
            const {data} = axios.get('/api/user/is-auth');
            if(data.success) {
                setUser(data.user);
            }else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        }
    }

    const fetchCampaign = async () => {
        try {
            const {data} = await axios.get('/api/campaigns');
            if(data.success) {
                setCampaign(data.campaigns);
            } else {
                setCampaign(null);
            }
        } catch (error) {
            setCampaign(null);
        }
    }

    const fetchVolunteer = async () => {
        try {
            const {data} = await axios.get('/api/volunteers');
            if(data.success) {
                setVolunteer(data.volunteers);
            } else {
                setVolunteer(null);
            }
        } catch (error) {
            setVolunteer(null);
        }
    }

    const fetchDonation = async () => {
        try {
            const {data} = await axios.get('/api/donations');
            if(data.success) {
                setDonation(data.donations);
            } else {
                setDonation(null);
            }
        } catch (error) {
            setDonation(null);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchCampaign();
        fetchVolunteer();
        fetchDonation();
    }, [])

    const updateCampaign = async (campaignId, updatedData) => {
        setIsLoading(true);
        try {
            const {data} = await axios.put(`/api/campaigns/${campaignId}`, updatedData);
            if(data.success) {
                setCampaign(prev => prev.map(c => c._id === campaignId ? data.campaign : c));
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
