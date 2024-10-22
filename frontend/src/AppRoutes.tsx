import { Navigate, Route ,Routes} from "react-router"
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
const AppRoutes=()=>{
    return <>
    <Routes>
<Route path="/" element={<Layout showHero={true}><HomePage/></Layout>} />
<Route path="/search/:city" element={ <Layout showHero={false}><SearchPage/></Layout>} /> 
<Route path="/auth-callback" element={<AuthCallBackPage/>}/>
<Route element={<ProtectedRoute/>}></Route>
<Route path="/detail/:restrauntId" element={ <Layout showHero={false}><DetailPage/></Layout>} /> 

<Route 
path="/userprofile" 
element={<Layout >
<UserProfilePage/>
</Layout>}/>
<Route 
path="/managerestruant" 
element={<Layout >
<UserProfilePage/>
</Layout>}/>
<Route path="*" element ={<Navigate to="/"/>}/>

    </Routes>
    
    </>

}
export default AppRoutes;