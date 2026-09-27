"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/user-api";

export function useAuth()
{
    const queryClient = useQueryClient();
    const hasToken = typeof window !== "undefined" && 
    Boolean(localStorage.getItem("access_token"));
    // queryKey == backend response saved
    const userQuery = useQuery({
        queryKey: ["auth", "user"],
        queryFn: getCurrentUser,
        enabled: hasToken,
        retry: false
    })

    function logout()
    {
        localStorage.removeItem("access_token");
        queryClient.removeQueries({queryKey: ["auth", "user"]});
        // queryClient.removeQueries({queryKey: ["cart"]})
    }

    return {
        user: userQuery.data ?? null,
        isAuthenticated: Boolean(userQuery.data),
        isLoading: userQuery.isLoading,
        logout
    }
}