import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order, Restraunt } from "types";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
export const useCreateRestraunt=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const createMyRestraunt=async (restrauntformData:FormData ): Promise<Restraunt>=>{
        const AccessToken=await getAccessTokenSilently();
        const response=await fetch(`${API_BASE_URL}/api/my/restraunt`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${AccessToken}`,

            },
            body:restrauntformData,
        })
        if(response.ok){
            throw new Error("Failed to create restraunt");
        }
        return response.json();
    }
    const {mutate:createRestraunt,isLoading,isError,isSuccess}=useMutation(createMyRestraunt);
    if(isSuccess){
        toast.success("Restraunt Createed");
    }
    if(isError){
        toast.error("Unable to Update User")
    }
    return { createRestraunt, isLoading };
}
export const useGetMyRestraunt=()=>{
    const {getAccessTokenSilently}= useAuth0();
    const GetMyRestraunt=async():Promise<Restraunt>=>{
        const accessToken=getAccessTokenSilently();
        const response=await fetch(`${API_BASE_URL}/api/my/restraunt`,{
         method:"GET",
         headers:{
            Authorization: `Bearer ${accessToken}`
         }

        })
        if(!response.ok){
            throw new Error("Failed  to get restraunt")
        }
        return response.json();
    };
    const {data:restraunt,isLoading}=useQuery(
        "fetchmyRestrauntData",
        GetMyRestraunt
    )
return {restraunt,isLoading};
};
export const UseupdateMyRestraunt=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const updateRestaurant=async(restrauntformData:FormData):Promise<Restraunt>=>{
        const accessToken=await getAccessTokenSilently();
        const response=await fetch(`${API_BASE_URL}/api/my/restraunt`,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
            body:restrauntformData,
        });
        if (!response) {
            throw new Error("Failed to update restaurant");
          }
      
          return response.json();
    };
    const {
        mutate: updaterestraunt,
        isLoading,
        error,
        isSuccess,
      } = useMutation(updateRestaurant);
      if (isSuccess) {
        toast.success("Restaurant Updated");
      }
    
      if (error) {
        toast.error("Unable to update restaurant");
      }
    
      return { updaterestraunt, isLoading };
    };

    export const useGetMyRestaurantOrders = () => {
        const { getAccessTokenSilently } = useAuth0();
      
        const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
          const accessToken = await getAccessTokenSilently();
      
          const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
      
          return response.json();
        };
      
        const { data: orders, isLoading } = useQuery(
          "fetchMyRestaurantOrders",
          getMyRestaurantOrdersRequest
        );
      
        return { orders, isLoading };
      };
      
      type UpdateOrderStatusRequest = {
        orderId: string;
        status: string;
      };
      
      export const useUpdateMyRestaurantOrder = () => {
        const { getAccessTokenSilently } = useAuth0();
      
        const updateMyRestaurantOrder = async (request: UpdateOrderStatusRequest): Promise<Order> => {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(request),
            });
        
            if (!response.ok) {
              throw new Error("Failed to update order");
            }
        
            return response.json();
          };
      
        const {
          mutateAsync: updateRestaurantStatus,
          isLoading,
          isError,
          isSuccess,
          reset,
        } = useMutation(updateMyRestaurantOrder);
      
        if (isSuccess) {
          toast.success("Order updated");
        }
      
        if (isError) {
          toast.error("Unable to update order");
          reset();
        }
      
        return { updateRestaurantStatus, isLoading };
      }