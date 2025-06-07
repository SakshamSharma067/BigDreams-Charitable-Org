import axios from 'axios';
import React, { createContext } from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Set default axios configurations
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [campaigns, setCampaigns] = useState(null);
    const [volunteer, setVolunteer] = useState(null);
    const [donation, setDonation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success) {
                setUser(data.user);
                return true;
            } else {
                setUser(null);
                return false;
            }
        } catch (error) {
            setUser(null);
            return false;
        }
    }

    const fetchCampaign = async () => {
        try {
            const {data} = await axios.get('/api/campaign/get-all');
            if(data.success) {
                setCampaigns(data.campaigns);
            } else {
                setCampaigns(null);
            }
        } catch (error) {
            setCampaigns(null);
        }
    }

    const fetchVolunteer = async () => {
        try {
            const {data} = await axios.get('/api/volunteer/get-all');
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
            const {data} = await axios.get('/api/donation/get-all');
            if(data.success) {
                setDonation(data.donations);
            } else {
                setDonation(null);
            }
        } catch (error) {
            setDonation(null);
        }
    }

    // Authentication functions
    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const {data} = await axios.post('/api/user/login', credentials);
            if(data.success) {
                setUser(data.user);
                // Fetch updated data after login
                await Promise.all([
                    fetchCampaign(),
                    fetchVolunteer(),
                    fetchDonation()
                ]);
                toast.success('Successfully logged in!');
                return { success: true };
            }
            toast.error(data.message || 'Login failed');
            return { success: false, message: data.message };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    }

    const register = async (userData) => {
        setIsLoading(true);
        try {
            const {data} = await axios.post('/api/user/register', userData);
            if(data.success) {
                setUser(data.user);
                toast.success('Successfully registered!');
                return { success: true };
            }
            toast.error(data.message || 'Registration failed');
            return { success: false, message: data.message };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.get('/api/user/logout');
            setUser(null);
            // Clear all data
            setCampaigns(null);
            setVolunteer(null);
            setDonation(null);
            navigate('/', { replace: true });
            toast.success('Successfully logged out!');
            return { success: true };
        } catch (error) {
            toast.error('Logout failed');
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    }

    const createCampaign = async (campaignData) => {
        setIsLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            };
            
            const {data} = await axios.post('/api/campaign/create', campaignData, config);
            if(data.success) {
                setCampaigns(prev => prev ? [...prev, data.campaign] : [data.campaign]);
                toast.success('Campaign created successfully!');
                return { success: true, campaign: data.campaign };
            } else {
                setError(data.message);
                toast.error(data.message || 'Failed to create campaign');
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Campaign creation error:', error);
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            toast.error(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }

    const updateCampaign = async (campaignId, updatedData) => {
        setIsLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            };
            
            const {data} = await axios.put(`/api/campaign/${campaignId}`, updatedData, config);
            if(data.success) {
                setCampaigns(prev => prev.map(c => c._id === campaignId ? data.campaign : c));
                toast.success('Campaign updated successfully!');
                return { success: true };
            } else {
                setError(data.message);
                toast.error(data.message || 'Failed to update campaign');
                return { success: false, message: data.message };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            toast.error(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }

    const deleteCampaign = async (campaignId) => {
        setIsLoading(true);
        try {
            const {data} = await axios.delete(`/api/campaign/delete/${campaignId}`, { withCredentials: true });
            if(data.success) {
                setCampaigns(prev => prev.filter(c => c._id !== campaignId));
                toast.success('Campaign deleted successfully!');
                return { success: true };
            } else {
                setError(data.message);
                toast.error(data.message || 'Failed to delete campaign');
                return { success: false, message: data.message };
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message || 'Failed to delete campaign');
            return { success: false, message: error.message };
        } finally {
            setIsLoading(false);
        }
    }

    const getCampaignById = async (campaignId) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`/api/campaign/${campaignId}`);
            if (data.success) {
                // Update the campaigns list if this campaign isn't in it
                setCampaigns(prev => {
                    if (!prev) return [data.campaign];
                    const exists = prev.some(c => c._id === data.campaign._id);
                    if (!exists) {
                        return [...prev, data.campaign];
                    }
                    return prev.map(c => c._id === data.campaign._id ? data.campaign : c);
                });
                return data;
            }
            toast.error(data.message || 'Failed to fetch campaign');
            return { success: false, message: data.message || 'Failed to fetch campaign' };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch campaign';
            setError(message);
            toast.error(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    }

    // Helper functions
    const isVolunteer = () => {
        return user?.role === 'volunteer';
    }

    const isAuthenticated = () => {
        return !!user;
    }

    useEffect(() => {
        const initializeApp = async () => {
            setIsLoading(true);
            try {
                const isAuthenticated = await fetchUser();
                if (isAuthenticated) {
                    await Promise.all([
                        fetchCampaign(),
                        fetchVolunteer(),
                        fetchDonation()
                    ]);
                } else {
                    // Even if not authenticated, still fetch public data
                    await fetchCampaign();
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        initializeApp();
    }, []);

    const value = {
        user,
        campaigns,
        volunteer,
        donation,
        isLoading,
        error,
        login,
        register,
        logout,
        isVolunteer,
        isAuthenticated,
        updateCampaign,
        fetchCampaign,
        fetchVolunteer,
        fetchDonation,
        deleteCampaign,
        createCampaign,
        getCampaignById
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}
