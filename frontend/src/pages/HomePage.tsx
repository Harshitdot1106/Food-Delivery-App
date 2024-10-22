import LandingImage from 'C:/Users/DELL/Documents/Downloads/landing.png';
import AppDownLoad from 'C:/Users/DELL/Documents/Downloads/appDownload.png'
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
const HomePage=()=>{
    const navigate=useNavigate();
const HandleSubmit =(searchFromValues:SearchForm)=>{
    navigate({
         pathname:`/search/${searchFromValues.searchQuery}`,
    })
}
    return(
        <div className="flex flex-col gap-12">
<div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex-col gap 5 text-center -mt-16">
<h1 className="text-5x1 font-bold tracking-tiight text-orange-600">
Tuck into a takeaway today
</h1>
<span className="text-x1">Food is just a click away
<SearchBar
onSubmit={HandleSubmit}
placeHolder='Search by city or time'
/>

</span>
</div>
<div className="grid md:grid-cols-2 gap-5">
    <img src={LandingImage} />
    <div className="flex flex-col items-center justify-center gap-4 text-center">
<span className="font-bold text-3xl tracking-tighter">
Oder takeaway even faster
</span>
<span>
    Download the Swiggy app for faster ordering and personalised recommendations
</span>
<img src={AppDownLoad}/>
    </div>
</div>
        </div>
    )
}
export default HomePage;