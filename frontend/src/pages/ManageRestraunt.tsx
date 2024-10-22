
import {
    useCreateRestraunt,
    useGetMyRestraunt,
    useGetMyRestaurantOrders,
    UseupdateMyRestraunt,
  } from "@/api/MyRestrauntApi";
  import OrderItemCard from "@/components/OrderItemCard";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import ManageRestrauntForm from "../forms/restrauntform";
  
  const ManageRestrauntPage = () => {
    const { createRestraunt, isLoading: isCreateLoading } =
      useCreateRestraunt();
    const { restraunt } = useGetMyRestraunt();
    const { updaterestraunt, isLoading: isUpdateLoading } =
      UseupdateMyRestraunt();
  
    const { orders } = useGetMyRestaurantOrders();
  
    const isEditing = !!restraunt;
  
    return (
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restraunt">Manage Restraunt</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} />
          ))}
        </TabsContent>
        <TabsContent value="manage-restraunt">
          <ManageRestrauntForm
            restraunt={restraunt}
            onSave={isEditing ? updaterestraunt : createRestraunt}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </TabsContent>
      </Tabs>
    );
  };
  
  export default ManageRestrauntPage;

// const manageRestaunt=()=>{
//     const {createRestraunt,isLoading:isCreate}=useCreateRestraunt();
//     const {restraunt}=useGetMyRestraunt();
//     const {updaterestraunt,isLoading:isUpdate}=UseupdateMyRestraunt();
//     const isEditing=!!restraunt;
// return (
// <Restrauntform  restraunt={restraunt}
// onSave={isEditing?updaterestraunt:createRestraunt} 
// isLoading={isCreate||isUpdate} />
// )
// }
// export default manageRestaunt;