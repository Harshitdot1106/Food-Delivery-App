import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./cuisines";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Restraunt } from "types";

const formSchema=z.object({
    restrauntName:z.string({
        required_error:"restraunt name is required"
    }),
    city:z.string({
        required_error:"city name is required"
    }),
    country:z.string({
        required_error:"country name is required"
    }),
    deliveryPrice:z.coerce.number({
        required_error:"price name is required",
        invalid_type_error:"must be a number"
    }),
    deliverytime:z.coerce.number({
        required_error:"time name is required",
        invalid_type_error:"must be a number"
    }),
    cuisine:z.array(z.string()).nonempty({
        message:"please select some items"
    }),
    menuItems:z.array(z.object({
        name:z.string().min(1,"enter the name"),
        price:z.coerce.number().min(1,"enter the price")
    })).nonempty({
        message:"please select some items"
    }),
    imageUrl:z.string().optional(),
    imageFile:z.instanceof(File,{message:"image is required"}),
}).refine((data)=>data.imageUrl||data.imageFile,{
    message:"Either image URL or image File must be provided",
    path:["imageFile"],
})
type RestrauntFormData=z.infer<typeof formSchema>
type Props={
    onSave:(restrauntFormData:FormData)=>void;
    isLoading:boolean;
    restraunt?:Restraunt;
};
const Restrauntform=({onSave,isLoading,restraunt}:Props)=>{
const form=useForm<RestrauntFormData>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        cuisine:[],
        menuItems:[{name:"",price:0}],
    }
})
useEffect(() => {
    if (!restraunt) {
      return;
    }

    // price lowest domination of 100 = 100pence == 1GBP
    const deliveryPriceFormatted = parseInt(
      (restraunt.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restraunt.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restraunt,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restraunt]);

const onSubmit=(formDataJSon:RestrauntFormData)=>{
const formData=new FormData();
formData.append("restrauntName",formDataJSon.restrauntName);
formData.append("city",formDataJSon.city);
formData.append("country",formDataJSon.country);
formData.append(
    "deliveryPrice",
    (formDataJSon.deliveryPrice * 100).toString()
  );
  formData.append(
    "estimatedDeliveryTime",
    formDataJSon.deliverytime.toString()
  );
  formDataJSon.cuisine.forEach((cuisine, index) => {
    formData.append(`cuisines[${index}]`, cuisine);
  });
  formDataJSon.menuItems.forEach((menuItems, index) => {
    formData.append(`menuItems[${index}][name]`, menuItems.name);
    formData.append(
      `menuItems[${index}][price]`,
      (menuItems.price * 100).toString()
    );
  });
  if (formDataJSon.imageFile) {
    formData.append(`imageFile`, formDataJSon.imageFile);
  }

  onSave(formData);

}
return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
        >
            <DetailsSection/>
            <Separator/>
            <CuisinesSection/>
            <Separator/>
            <MenuSection/>
            <Separator/>
            <ImageSection/>
            {isLoading?<LoadingButton/>:<Button type="submit">Submit</Button>}
        </form>

    </Form>
)
}
export default Restrauntform;